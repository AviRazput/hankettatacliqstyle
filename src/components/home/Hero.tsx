"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { heroSlides } from "../../data/heroSlides";

const AUTO_SLIDE_MS = 6000;
const TRANSITION_S = 3;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

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

  // Preload next slides so Netlify doesn't "load late" on transition.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!slides.length) return;

    const order = [
      (active + 1) % slides.length,
      (active + 2) % slides.length,
      (active + 3) % slides.length,
    ];

    for (const idx of order) {
      const src = slides[idx]?.imageSrc;
      if (!src) continue;
      const img = new window.Image();
      img.decoding = "async";
      img.loading = "eager";
      img.src = src;
    }
  }, [active, slides]);

  const slide = slides[active];

  return (
    <section className="bg-flat-bg">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-8">
        <div className="relative w-full aspect-[16/5] max-h-[480px] overflow-hidden bg-flat-bg mt-3 sm:mt-4">
          <AnimatePresence initial={false} mode="popLayout">
            {slide ? (
              <motion.div
                key={slide.id}
                className="absolute inset-0"
                initial={{ x: "100%" }}
                animate={{ x: "0%" }}
                exit={{ x: "-100%" }}
                transition={{ duration: TRANSITION_S, ease: EASE }}
              >
                <Image
                  src={slide.imageSrc}
                  alt={slide.imageAlt}
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 1536px) 100vw, 1500px"
                  className="object-cover object-center"
                  style={{ filter: slide.imageFilter }}
                />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="py-5 flex justify-center gap-2">
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