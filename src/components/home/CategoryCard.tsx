import Image from "next/image";
import Link from "next/link";
import type { HomeImageCardItem } from "./HomeImageCard";

export function CategoryCard({
  item,
  className,
}: {
  item: HomeImageCardItem;
  className?: string;
}) {
  return (
    <Link
      href={item.href}
      className={["block h-full", className].filter(Boolean).join(" ")}
      aria-label={item.tagline ? `${item.label} — ${item.tagline}` : item.label}
    >
      <article className="flex flex-col h-full overflow-hidden rounded-2xl border border-flat-border bg-white shadow-[0_2px_14px_rgba(0,0,0,0.05)]">
        <div className="relative w-full aspect-square bg-flat-layer">
          <Image
            src={item.image}
            alt=""
            fill
            sizes="(max-width: 1024px) 50vw, 25vw"
            className="object-cover object-center"
          />
        </div>

        <div className="px-4 py-4 sm:py-4.5 text-center border-t border-flat-border bg-flat-layer">
          <h3 className="font-serif text-[1.125rem] sm:text-[1.2rem] md:text-[1.25rem] font-medium text-flat-text leading-tight tracking-[-0.02em]">
            {item.label}
          </h3>
          {item.tagline ? (
            <p className="mt-1.5 font-sans text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.14em] text-flat-muted leading-snug">
              {item.tagline}
            </p>
          ) : null}
        </div>
      </article>
    </Link>
  );
}
