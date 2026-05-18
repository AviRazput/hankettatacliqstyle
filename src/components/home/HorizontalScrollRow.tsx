"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

function IconChevronLeft() {
  return (
    <svg className="w-[18px] h-[18px] stroke-current fill-none stroke-[2.5]" viewBox="0 0 24 24" aria-hidden>
      <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconChevronRight() {
  return (
    <svg className="w-[18px] h-[18px] stroke-current fill-none stroke-[2.5]" viewBox="0 0 24 24" aria-hidden>
      <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const arrowClass =
  "hidden md:flex absolute z-10 w-10 h-10 items-center justify-center rounded-full bg-white text-[#222] shadow-[0_2px_12px_rgba(0,0,0,0.12)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.16)] transition-shadow disabled:opacity-0 disabled:pointer-events-none top-[var(--carousel-arrow-top,42%)] -translate-y-1/2";

export function HorizontalScrollRow({
  children,
  arrowTop = "42%",
  scrollClassName = "flex gap-2 sm:gap-4 md:gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-1",
}: {
  children: ReactNode;
  arrowTop?: string;
  scrollClassName?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [mounted, updateScrollState]);

  const scrollByStep = (direction: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const step = first?.offsetWidth ?? 160;
    el.scrollBy({ left: direction * (step + 12), behavior: "smooth" });
  };

  return (
    <div className="relative" style={{ ["--carousel-arrow-top" as string]: arrowTop }}>
      <div
        ref={scrollRef}
        className={scrollClassName}
      >
        {children}
      </div>

      {mounted ? (
        <>
          <button
            type="button"
            onClick={() => scrollByStep(-1)}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className={`${arrowClass} left-0 -translate-x-1/2`}
          >
            <IconChevronLeft />
          </button>
          <button
            type="button"
            onClick={() => scrollByStep(1)}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className={`${arrowClass} right-0 translate-x-1/2`}
          >
            <IconChevronRight />
          </button>
        </>
      ) : null}
    </div>
  );
}
