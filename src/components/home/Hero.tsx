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
}: {
  slides: typeof heroSlides;
  active: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div
      className="inline-flex items-center justify-center gap-2.5 bg-transparent"
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
            className="hero-dots-btn relative flex h-2.5 min-w-[8px] items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#333]/40"
          >
            <motion.span
              aria-hidden
              className="block h-2.5 rounded-full"
              initial={false}
              animate={{
                width: isActive ? 32 : 8,
                backgroundColor: isActive ? "#1a1a1a" : "#d4d4d4",
                boxShadow: isActive
                  ? "0 2px 8px rgba(0,0,0,0.18)"
                  : "0 0 0 rgba(0,0,0,0)",
              }}
              whileHover={!isActive ? { backgroundColor: "#b8b8b8", scale: 1.08 } : undefined}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            />
          </button>
        );
      })}
    </div>
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
  const slideMotion = getSlideMotion(interactionSource);

  return (
    <section className="bg-flat-bg w-full min-w-0">
      {/* Mobile */}
      <div className="md:hidden w-full">
        <div
          className="relative w-full overflow-hidden touch-pan-y h-[56vh] min-h-[280px] max-h-[520px] bg-flat-bg"
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
            <AnimatePresence initial={false}>
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
                    className="object-cover object-center pointer-events-none select-none"
                    style={{ filter: slide.imageFilter }}
                    draggable={false}
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        </div>

        {slides.length > 1 ? (
          <div className="flex min-h-[44px] items-center justify-center bg-white px-4 py-2">
            <HeroDots slides={slides} active={active} onSelect={goToDot} />
          </div>
        ) : null}
      </div>

      {/* Desktop */}
      <div className="hidden md:block w-full">
        <div className="relative w-full overflow-hidden bg-flat-bg h-[min(65vh,720px)] min-h-[420px]">
          <div className="absolute inset-0">
            <AnimatePresence initial={false}>
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
                  sizes="100vw"
                  className="object-cover object-center"
                  style={{ filter: slide.imageFilter }}
                />
              </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>

        {slides.length > 1 ? (
          <div className="flex min-h-[48px] items-center justify-center bg-white px-6 py-2.5">
            <HeroDots slides={slides} active={active} onSelect={goToDot} />
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default Hero;
