import Image from "next/image";
import Link from "next/link";

export type HomeImageCardItem = {
  slug: string;
  label: string;
  tagline?: string;
  href: string;
  image: string;
};

type ImageAspect = "square" | "portrait";

export function HomeImageCard({
  item,
  className,
  aspect = "square",
}: {
  item: HomeImageCardItem;
  className?: string;
  aspect?: ImageAspect;
}) {
  const aspectClass = aspect === "portrait" ? "aspect-[3/4]" : "aspect-square";

  return (
    <Link
      href={item.href}
      className={["block", className].filter(Boolean).join(" ")}
      aria-label={item.tagline ? `${item.label} — ${item.tagline}` : item.label}
    >
      <article className="flex flex-col h-full">
        <div className={`relative w-full overflow-hidden rounded-xl bg-flat-layer ${aspectClass}`}>
          <Image
            src={item.image}
            alt=""
            fill
            sizes="(max-width: 640px) 45vw, 280px"
            className="object-cover object-center"
          />
        </div>

        <div className="pt-3 text-center sm:text-left">
          <h3 className="font-serif text-[1.05rem] sm:text-[1.125rem] font-medium text-flat-text leading-tight tracking-[-0.01em]">
            {item.label}
          </h3>
          {item.tagline ? (
            <p className="mt-1 font-sans text-[12px] sm:text-[13px] text-flat-muted leading-snug">{item.tagline}</p>
          ) : null}
        </div>
      </article>
    </Link>
  );
}
