"use client";

import { motion } from "framer-motion";

const TITLE = "Coming Soon";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

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
          className="max-w-md text-[15px] leading-relaxed text-flat-muted md:text-base"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.15, ease: EASE }}
        >
          We&apos;re crafting something special for you. Our new collection arrives shortly.
        </motion.p>

        <motion.div
          className="mt-10 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
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
