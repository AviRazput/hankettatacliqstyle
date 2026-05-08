"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { heroSlides } from "../../data/heroSlides";

const AUTO_SLIDE_MS = 6000;
const TRANSITION_S = 3;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const PRELOAD_AHEAD = 5;
const PRELOAD_LINKS_MAX = 6;

export function Hero() {
  const slides = heroSlides;

  const [active, setActive] = useState(0);

  const timerRef = useRef<number | null>(null);
  const lastUserActionRef = useRef(0);

  const goTo = useCallback(
    (nextIndex: number) => {
      if (slides.length === 0) return;
      setActive(nextIndex);
    },
    [slides.length],
  );

  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      const recentlyClicked = Date.now() - lastUserActionRef.current < 1200;
      if (recentlyClicked) return;

      const nextIndex = (active + 1) % slides.length;
      goTo(nextIndex);
    }, AUTO_SLIDE_MS);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [active, slides.length, goTo]);

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

  const slideMotion = {
    initial: { x: "100%" },
    animate: { x: "0%" },
    exit: { x: "-100%" },
    transition: { duration: TRANSITION_S, ease: EASE },
  };

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

        {/* Mobile dots overlaid to avoid extra blank space */}
        <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2 px-4">
          {slides.map((s, idx) => (
            <button
              key={`${s.id}-dot-m`}
              type="button"
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => {
                lastUserActionRef.current = Date.now();
                goTo(idx);
              }}
              className={[
                "h-2.5 w-2.5 rounded-full border border-white/60 transition-all",
                idx === active ? "bg-white w-6" : "bg-white/20 hover:bg-white/40",
              ].join(" ")}
            />
          ))}
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 w-full min-w-0">

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
                  sizes="(max-width: 1536px) 100vw, 1500px"
                  className="object-cover object-center"
                  style={{ filter: slide.imageFilter }}
                />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="hidden md:flex py-3 md:py-5 justify-center gap-2">
          {slides.map((s, idx) => (
            <button
              key={`${s.id}-dot`}
              type="button"
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => {
                lastUserActionRef.current = Date.now();
                goTo(idx);
              }}
              className={[
                "h-2.5 w-2.5 rounded-full border border-flat-text/30 transition-all",
                idx === active
                  ? "bg-flat-text w-6"
                  : "bg-transparent hover:bg-flat-text/20",
              ].join(" ")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
