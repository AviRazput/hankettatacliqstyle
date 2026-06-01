"use client";

import { instagramPosts } from "@/data/homepage";
import { useCallback, useEffect, useRef, useState } from "react";
import { InstagramPostCard } from "./InstagramPostCard";

function IconChevronLeft() {
  return (
    <svg className="h-4 w-4 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24" aria-hidden>
      <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconChevronRight() {
  return (
    <svg className="h-4 w-4 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24" aria-hidden>
      <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const navBtnClass =
  "flex h-9 w-9 items-center justify-center rounded-full border border-[#1a1a1a]/20 bg-white text-[#1a1a1a] transition-colors hover:border-[#1a1a1a]/40 disabled:opacity-30 disabled:pointer-events-none sm:h-10 sm:w-10";

export function InstagramSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollByStep = (direction: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-insta-card]");
    const step = card?.offsetWidth ?? el.clientWidth * 0.5;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <section className="w-full bg-white pt-6 pb-0 md:pt-10">
      <div className="relative mb-6 px-12 sm:mb-8 md:mb-10 md:px-16">
        <h2 className="text-center flex flex-col items-center">
          <span className="block font-sans text-[1.75rem] font-black leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-[#1a1a1a] via-[#333] to-flat-pink sm:text-[2.25rem] md:text-[2.75rem] lg:text-[3.25rem]">
            hanket.in
          </span>
          <span className="mt-2 block font-sans text-[0.7rem] font-bold uppercase tracking-[0.4em] text-[#1a1a1a] sm:mt-3 sm:text-[0.75rem]">
            on Instagram
          </span>
        </h2>

        <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2 sm:right-5 md:right-8">
          <button
            type="button"
            onClick={() => scrollByStep(-1)}
            disabled={!canScrollLeft}
            aria-label="Scroll Instagram posts left"
            className={navBtnClass}
          >
            <IconChevronLeft />
          </button>
          <button
            type="button"
            onClick={() => scrollByStep(1)}
            disabled={!canScrollRight}
            aria-label="Scroll Instagram posts right"
            className={navBtnClass}
          >
            <IconChevronRight />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="grid w-full grid-cols-2 gap-0 md:grid-cols-4 md:grid-rows-2"
      >
        {instagramPosts.map((post) => (
          <div key={post.slug} data-insta-card className="min-w-0">
            <InstagramPostCard post={post} />
          </div>
        ))}
      </div>
    </section>
  );
}
