"use client";

import { motion } from "framer-motion";

const TITLE = "Coming Soon";
const TAGLINE = ["click", "shop", "smile"] as const;
const INSTAGRAM_URL = "https://www.instagram.com/hanket.in/";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function IconInstagram() {
  return (
    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

export function ComingSoon() {
  return (
    <section className="relative w-full overflow-hidden border-t border-flat-border bg-flat-bg">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <div className="absolute left-1/2 top-1/2 h-[min(420px,70vw)] w-[min(420px,70vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-flat-pink/[0.04] blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-flat-layer/60 via-flat-bg to-flat-bg" />
      </motion.div>

      <div className="relative mx-auto flex max-w-[1500px] flex-col items-center justify-center px-6 py-20 text-center md:py-28 lg:py-32">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.35em" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mb-8 text-[11px] font-bold uppercase text-flat-muted"
        >
          Hanket
        </motion.p>

        <h2
          className="coming-soon-title font-serif font-medium leading-[1.02] tracking-tight"
          aria-label={TITLE}
        >
          {TITLE.split("").map((char, i) => (
            <motion.span
              key={`${char}-${i}`}
              className={char === " " ? "inline-block w-[0.3em]" : "coming-soon-letter inline-block"}
              style={char === " " ? undefined : ({ "--letter-i": i } as React.CSSProperties)}
              initial={{ opacity: 0, y: 48, rotateX: -70, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.75,
                delay: 0.2 + i * 0.055,
                ease: EASE,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h2>

        <motion.div
          className="my-8 h-px w-28 origin-center bg-gradient-to-r from-transparent via-flat-pink to-transparent md:my-10 md:w-36"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.85, delay: 0.95, ease: EASE }}
        />

        <motion.p
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[clamp(0.95rem,2.5vw,1.125rem)] font-medium lowercase tracking-[0.22em] text-flat-text md:gap-x-4 md:tracking-[0.28em]"
          aria-label="click, shop, smile"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.05 }}
        >
          {TAGLINE.map((word, i) => (
            <span key={word} className="inline-flex items-center gap-x-3 md:gap-x-4">
              {i > 0 ? (
                <motion.span
                  className="text-flat-pink/80 select-none"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, delay: 1.12 + i * 0.12, ease: EASE }}
                  aria-hidden
                >
                  —
                </motion.span>
              ) : null}
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.55, delay: 1.08 + i * 0.14, ease: EASE }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </motion.p>

        <motion.a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-8 inline-flex items-center gap-3 rounded-full border border-flat-border bg-white py-2 pl-2 pr-5 text-flat-text shadow-[0_2px_14px_rgba(0,0,0,0.07)] transition-colors hover:border-flat-pink"
          aria-label="Follow @hanket.in on Instagram"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.38, ease: EASE }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-flat-layer transition-colors group-hover:bg-flat-pink/10 group-hover:text-flat-pink">
            <IconInstagram />
          </span>
          <span className="font-serif text-[1.35rem] font-medium tracking-wide transition-colors group-hover:text-flat-pink">
            hanket.in
          </span>
        </motion.a>

        <motion.p
          className="mt-5 max-w-md text-[14px] leading-relaxed text-flat-muted md:text-[15px]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5, ease: EASE }}
        >
          We&apos;re crafting something special for you. Our new collection arrives shortly.
        </motion.p>

        <motion.div
          className="mt-8 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.55 }}
          aria-hidden
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-flat-pink"
              animate={{ opacity: [0.25, 1, 0.25], scale: [0.85, 1.15, 0.85] }}
              transition={{
                duration: 1.4,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
