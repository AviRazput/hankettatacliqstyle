"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useReducer, useRef } from "react";
import { heroSlides } from "../../data/heroSlides";

const AUTO_SLIDE_MS = 6000;
/** Skip auto-advance for this long after any manual navigation (arrows/dots). */
const MANUAL_PAUSE_MS = 7500;
const TRANSITION_AUTO_S = 1.05;
const TRANSITION_MANUAL_S = 0.42;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_SNAP: [number, number, number, number] = [0.33, 1, 0.68, 1];

type InteractionSource = "auto" | "manual-next" | "manual-prev";

type CarouselState = { active: number; interactionSource: InteractionSource };

type CarouselAction =
  | { type: "auto_next" }
  | { type: "manual_prev" }
  | { type: "manual_next" }
  | { type: "go_to"; index: number };

function carouselReducer(
  state: CarouselState,
  action: CarouselAction,
  slideCount: number,
): CarouselState {
  if (slideCount === 0) return state;

  switch (action.type) {
    case "auto_next": {
      return {
        active: (state.active + 1) % slideCount,
        interactionSource: "auto",
      };
    }
    case "manual_prev": {
      return {
        active: (state.active - 1 + slideCount) % slideCount,
        interactionSource: "manual-prev",
      };
    }
    case "manual_next": {
      return {
        active: (state.active + 1) % slideCount,
        interactionSource: "manual-next",
      };
    }
    case "go_to": {
      if (action.index === state.active) return state;
      const forward = (action.index - state.active + slideCount) % slideCount;
      const backward = (state.active - action.index + slideCount) % slideCount;
      const towardNext = forward <= backward;
      return {
        active: action.index,
        interactionSource: towardNext ? "manual-next" : "manual-prev",
      };
    }
  }
}
const PRELOAD_AHEAD = 5;
const PRELOAD_LINKS_MAX = 6;

function IconChevronLeft({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        d="m15 18-6-6 6-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconChevronRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        d="m9 18 6-6-6-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function getSlideMotion(interactionSource: InteractionSource) {
  if (interactionSource === "auto") {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1, x: "0%" },
      exit: { opacity: 0 },
      transition: { duration: TRANSITION_AUTO_S, ease: EASE },
    };
  }
  if (interactionSource === "manual-next") {
    return {
      initial: { opacity: 1, x: "100%" },
      animate: { opacity: 1, x: "0%" },
      exit: { opacity: 1, x: "-100%" },
      transition: { duration: TRANSITION_MANUAL_S, ease: EASE_SNAP },
    };
  }
  return {
    initial: { opacity: 1, x: "-100%" },
    animate: { opacity: 1, x: "0%" },
    exit: { opacity: 1, x: "100%" },
    transition: { duration: TRANSITION_MANUAL_S, ease: EASE_SNAP },
  };
}

export function Hero() {
  const slides = heroSlides;
  const slideCount = slides.length;

  const [{ active, interactionSource }, dispatch] = useReducer(
    (s: CarouselState, a: CarouselAction) => carouselReducer(s, a, slideCount),
    { active: 0, interactionSource: "auto" },
  );

  const lastUserActionRef = useRef(0);

  const goPrev = useCallback(() => {
    if (slideCount === 0) return;
    lastUserActionRef.current = Date.now();
    requestAnimationFrame(() => {
      dispatch({ type: "manual_prev" });
    });
  }, [slideCount]);

  const goNext = useCallback(() => {
    if (slideCount === 0) return;
    lastUserActionRef.current = Date.now();
    requestAnimationFrame(() => {
      dispatch({ type: "manual_next" });
    });
  }, [slideCount]);

  const goToDot = useCallback((index: number) => {
    if (slideCount === 0) return;
    lastUserActionRef.current = Date.now();
    requestAnimationFrame(() => {
      dispatch({ type: "go_to", index });
    });
  }, [slideCount]);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (Date.now() - lastUserActionRef.current < MANUAL_PAUSE_MS) return;
      dispatch({ type: "auto_next" });
    }, AUTO_SLIDE_MS);

    return () => window.clearInterval(id);
  }, [active, slideCount]);

  // Preload active + next slides (desktop + mobile assets)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!slides.length) return;

    const indices = Array.from({ length: Math.min(PRELOAD_AHEAD + 1, slides.length) }, (_, i) => {
      return (active + i) % slides.length;
    });

    const srcs = new Set<string>();
    for (const idx of indices) {
      const s = slides[idx];
      if (!s) continue;
      srcs.add(s.imageSrc);
      srcs.add(s.mobileImageSrc ?? s.imageSrc);
    }

    for (const src of srcs) {
      const img = new window.Image();
      img.decoding = "async";
      img.loading = "eager";
      img.src = src;
    }
  }, [active, slides]);

  // Add DOM preload hints for current + next (helps browser prioritize on prod/CDN)
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (!slides.length) return;

    const indices = [
      active,
      (active + 1) % slides.length,
    ];

    const desired = new Set<string>();
    for (const idx of indices) {
      const s = slides[idx];
      if (!s) continue;
      desired.add(s.imageSrc);
      desired.add(s.mobileImageSrc ?? s.imageSrc);
    }

    const list = Array.from(desired).slice(0, PRELOAD_LINKS_MAX);
    const created: HTMLLinkElement[] = [];

    for (let i = 0; i < list.length; i++) {
      const href = list[i];
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = href;
      link.setAttribute("data-hero-preload", "true");
      if (i === 0) link.setAttribute("fetchpriority", "high");
      document.head.appendChild(link);
      created.push(link);
    }

    return () => {
      for (const link of created) link.remove();
    };
  }, [active, slides]);

  const slide = slides[active];
  const desktopSrc = slide?.imageSrc ?? null;
  const mobileSrc = slide?.mobileImageSrc ?? slide?.imageSrc ?? null;
  const isInitial = active === 0;

  const slideMotion = getSlideMotion(interactionSource);

  return (
    <section className="bg-flat-bg w-full min-w-0 overflow-hidden">
      {/* Mobile: full-bleed banner (hidden from md) */}
      <div
        className={[
          "md:hidden relative mt-4 overflow-hidden",
          // Full-bleed: ignore the global max-width container on mobile
          "w-screen left-1/2 -translate-x-1/2",
          // Premium full look: tall + edge-to-edge, no blank bands
          "h-[62vh] min-h-[260px] max-h-[560px]",
          "bg-flat-bg",
        ].join(" ")}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {slide && mobileSrc ? (
            <motion.div
              key={`m-${slide.id}`}
              className="absolute inset-0"
              initial={slideMotion.initial}
              animate={slideMotion.animate}
              exit={slideMotion.exit}
              transition={slideMotion.transition}
            >
              <Image
                src={mobileSrc}
                alt={slide.imageAlt}
                fill
                priority={isInitial}
                fetchPriority={isInitial ? "high" : "auto"}
                unoptimized
                sizes="100vw"
                className="object-cover object-center"
                style={{ filter: slide.imageFilter }}
              />
              {/* subtle overlay helps text-like banners pop while staying “full” */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/10" />
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Mobile dots + prev/next (overlaid; arrows match light dot treatment on imagery) */}
        <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4">
          {slides.length > 1 ? (
            <button
              type="button"
              aria-label="Previous slide"
              onClick={goPrev}
              className="min-h-11 min-w-11 inline-flex shrink-0 items-center justify-center rounded-sm text-white/70 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80"
            >
              <IconChevronLeft className="h-5 w-5" />
            </button>
          ) : null}
          <div className="flex max-w-[min(100%,220px)] flex-wrap items-center justify-center gap-2 sm:max-w-none">
            {slides.map((s, idx) => (
              <button
                key={`${s.id}-dot-m`}
                type="button"
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => {
                  goToDot(idx);
                }}
                className={[
                  "h-2.5 w-2.5 shrink-0 rounded-full border border-white/60 transition-all",
                  idx === active ? "bg-white w-6" : "bg-white/20 hover:bg-white/40",
                ].join(" ")}
              />
            ))}
          </div>
          {slides.length > 1 ? (
            <button
              type="button"
              aria-label="Next slide"
              onClick={goNext}
              className="min-h-11 min-w-11 inline-flex shrink-0 items-center justify-center rounded-sm text-white/70 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80"
            >
              <IconChevronRight className="h-5 w-5" />
            </button>
          ) : null}
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-7 w-full min-w-0">

        {/* Desktop (md+): wide banner only — hidden below md */}
        <div className="relative mt-6 md:mt-7 hidden md:block w-full overflow-hidden bg-flat-bg aspect-[16/5] max-h-[620px] min-h-[220px]">
          <AnimatePresence initial={false} mode="popLayout">
            {slide && desktopSrc ? (
              <motion.div
                key={`d-${slide.id}`}
                className="absolute inset-0"
                initial={slideMotion.initial}
                animate={slideMotion.animate}
                exit={slideMotion.exit}
                transition={slideMotion.transition}
              >
                <Image
                  src={desktopSrc}
                  alt={slide.imageAlt}
                  fill
                  priority={isInitial}
                  fetchPriority={isInitial ? "high" : "auto"}
                  unoptimized
                  sizes="(max-width: 1536px) 100vw, 1600px"
                  className="object-cover object-center"
                  style={{ filter: slide.imageFilter }}
                />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="hidden md:flex items-center justify-center gap-2 py-3 md:gap-3 md:py-5">
          {slides.length > 1 ? (
            <button
              type="button"
              aria-label="Previous slide"
              onClick={goPrev}
              className="text-flat-muted hover:text-flat-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flat-text/30 min-h-11 min-w-11 inline-flex shrink-0 items-center justify-center rounded-sm transition-colors hover:bg-flat-text/5"
            >
              <IconChevronLeft className="h-5 w-5" />
            </button>
          ) : null}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {slides.map((s, idx) => (
              <button
                key={`${s.id}-dot`}
                type="button"
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => {
                  goToDot(idx);
                }}
                className={[
                  "h-2.5 w-2.5 shrink-0 rounded-full border border-flat-text/30 transition-all",
                  idx === active
                    ? "bg-flat-text w-6"
                    : "bg-transparent hover:bg-flat-text/20",
                ].join(" ")}
              />
            ))}
          </div>
          {slides.length > 1 ? (
            <button
              type="button"
              aria-label="Next slide"
              onClick={goNext}
              className="text-flat-muted hover:text-flat-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flat-text/30 min-h-11 min-w-11 inline-flex shrink-0 items-center justify-center rounded-sm transition-colors hover:bg-flat-text/5"
            >
              <IconChevronRight className="h-5 w-5" />
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default Hero;
