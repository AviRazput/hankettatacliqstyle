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

/** Mobile swipe: min horizontal travel (px) after horizontal vs vertical dominance checks. */
const SWIPE_OFFSET_PX = 48;
/** Fast horizontal flick (px/s) can change slide with less offset. */
const SWIPE_VELOCITY_PX_S = 450;
/** Require horizontal movement to clearly dominate vertical (avoids fighting page scroll). */
const SWIPE_DOMINANCE = 1.25;

function HeroDots({
  slides,
  active,
  onSelect,
  invert = false,
}: {
  slides: typeof heroSlides;
  active: number;
  onSelect: (index: number) => void;
  invert?: boolean;
}) {
  return (
    <div
      className="inline-flex items-center justify-center gap-1.5 bg-transparent"
      role="tablist"
      aria-label="Hero slides"
    >
      {slides.map((s, idx) => {
        const isActive = idx === active;
        return (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => onSelect(idx)}
            className="hero-dots-btn relative flex h-2 min-w-[8px] items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#333]/40"
          >
            <motion.span
              aria-hidden
              className="block h-2 rounded-full"
              initial={false}
              animate={{
                width: isActive ? 24 : 8,
                backgroundColor: isActive
                  ? invert ? "#ffffff" : "#1a1a1a"
                  : invert ? "rgba(255,255,255,0.5)" : "#d4d4d4",
                boxShadow: isActive
                  ? "0 2px 8px rgba(0,0,0,0.18)"
                  : "0 0 0 rgba(0,0,0,0)",
              }}
              whileHover={!isActive ? { backgroundColor: invert ? "#ffffff" : "#b8b8b8", scale: 1.08 } : undefined}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            />
          </button>
        );
      })}
    </div>
  );
}

const slideVariants = {
  initial: (source: InteractionSource) => {
    if (source === "auto") return { opacity: 0, x: "0%" };
    return { opacity: 1, x: source === "manual-next" ? "100%" : "-100%" };
  },
  animate: {
    opacity: 1,
    x: "0%",
  },
  exit: (source: InteractionSource) => {
    if (source === "auto") return { opacity: 0, x: "0%" };
    return { opacity: 1, x: source === "manual-next" ? "-100%" : "100%" };
  },
};

function getTransition(source: InteractionSource) {
  if (source === "auto") {
    return { duration: TRANSITION_AUTO_S, ease: EASE };
  }
  return { duration: TRANSITION_MANUAL_S, ease: EASE_SNAP };
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

  const onMobileSwipeEnd = useCallback(
    (
      _event: MouseEvent | TouchEvent | PointerEvent,
      info: { offset: { x: number; y: number }; velocity: { x: number; y: number } },
    ) => {
      if (slideCount <= 1) return;

      const { offset, velocity } = info;
      const absX = Math.abs(offset.x);
      const absY = Math.abs(offset.y);
      const absVx = Math.abs(velocity.x);
      const absVy = Math.abs(velocity.y);

      const offsetHorizontal = absX >= absY * SWIPE_DOMINANCE;
      const velocityFlick =
        absVx >= SWIPE_VELOCITY_PX_S && absVx >= absVy * SWIPE_DOMINANCE;
      if (!offsetHorizontal && !velocityFlick) return;

      const wantNext =
        offset.x < -SWIPE_OFFSET_PX || velocity.x < -SWIPE_VELOCITY_PX_S;
      const wantPrev =
        offset.x > SWIPE_OFFSET_PX || velocity.x > SWIPE_VELOCITY_PX_S;

      if (wantNext && wantPrev) {
        if (Math.abs(offset.x) >= SWIPE_OFFSET_PX) {
          if (offset.x < 0) goNext();
          else goPrev();
        }
        return;
      }
      if (wantNext) goNext();
      else if (wantPrev) goPrev();
    },
    [goNext, goPrev, slideCount],
  );

  useEffect(() => {
    const id = window.setInterval(() => {
      if (Date.now() - lastUserActionRef.current < MANUAL_PAUSE_MS) return;
      dispatch({ type: "auto_next" });
    }, AUTO_SLIDE_MS);

    return () => window.clearInterval(id);
  }, [active, slideCount]);

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

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (!slides.length) return;

    const indices = [active, (active + 1) % slides.length];

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

  return (
    <section className="bg-flat-bg w-full min-w-0">
      {/* Mobile */}
      <div className="md:hidden w-full px-4 mt-3">
        <div
          className="relative w-full overflow-hidden rounded-xl touch-pan-y h-[56vh] min-h-[280px] max-h-[520px] bg-flat-bg"
          style={{ touchAction: "pan-y" }}
        >
          <motion.div
            className="absolute inset-0 touch-pan-y"
            style={{ touchAction: "pan-y" }}
            drag={slideCount > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            dragSnapToOrigin
            onDragEnd={onMobileSwipeEnd}
          >
            <AnimatePresence initial={false} custom={interactionSource}>
              {slide && mobileSrc ? (
                <motion.div
                  key={`m-${slide.id}`}
                  className="absolute inset-0 rounded-xl overflow-hidden"
                  custom={interactionSource}
                  variants={slideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={getTransition(interactionSource)}
                >
                  <Image
                    src={mobileSrc}
                    alt={slide.imageAlt}
                    fill
                    priority={isInitial}
                    fetchPriority={isInitial ? "high" : "auto"}
                    unoptimized
                    sizes="100vw"
                    className="object-cover object-center pointer-events-none select-none rounded-xl"
                    style={{ filter: slide.imageFilter }}
                    draggable={false}
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        </div>

        {slides.length > 1 ? (
          <div className="flex min-h-[44px] items-center justify-center bg-transparent px-4 py-2">
            <HeroDots slides={slides} active={active} onSelect={goToDot} />
          </div>
        ) : null}
      </div>

      {/* Desktop */}
      <div className="hidden md:block w-full max-w-[1500px] mx-auto px-4 sm:px-5 md:px-6 lg:px-8 mt-8 lg:mt-10 mb-6 lg:mb-8">
        <div className="relative group w-full overflow-hidden rounded-xl bg-flat-bg h-[280px] md:h-[320px] lg:h-[360px] xl:h-[400px]">
          <div className="absolute inset-0 rounded-xl overflow-hidden">
            <AnimatePresence initial={false} custom={interactionSource}>
              {slide && desktopSrc ? (
              <motion.div
                key={`d-${slide.id}`}
                className="absolute inset-0 rounded-xl overflow-hidden"
                custom={interactionSource}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={getTransition(interactionSource)}
              >
                <Image
                  src={desktopSrc}
                  alt={slide.imageAlt}
                  fill
                  priority={isInitial}
                  fetchPriority={isInitial ? "high" : "auto"}
                  unoptimized
                  sizes="100vw"
                  className="object-cover object-center rounded-xl"
                  style={{ filter: slide.imageFilter }}
                />
              </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
          {slides.length > 1 && (
            <>
              <button
                onClick={goPrev}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-[0_2px_10px_rgba(0,0,0,0.1)] opacity-100 transition-transform hover:scale-110"
                aria-label="Previous slide"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              </button>
              <button
                onClick={goNext}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-[0_2px_10px_rgba(0,0,0,0.1)] opacity-100 transition-transform hover:scale-110"
                aria-label="Next slide"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
              
              <div className="absolute bottom-5 right-6 z-10 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-full px-3 py-2">
                <HeroDots slides={slides} active={active} onSelect={goToDot} invert />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default Hero;
