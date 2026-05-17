import { trendingItems } from "@/data/homepage";
import { CategoryCard } from "./CategoryCard";
import { HorizontalScrollRow } from "./HorizontalScrollRow";

export function TrendingNowSection() {
  return (
    <section className="bg-white pt-5 pb-5 md:pt-6 md:pb-6">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-5 md:mb-6">
          <h2 className="font-serif text-[1.625rem] md:text-[2rem] font-medium text-flat-text leading-[1.15] tracking-[-0.02em]">
            Trending Now
          </h2>
          <p className="mt-2 font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-flat-muted">
            What&apos;s hot
          </p>
        </div>

        <HorizontalScrollRow arrowTop="42%">
          {trendingItems.map((item) => (
            <CategoryCard
              key={item.slug}
              className="shrink-0 w-[min(44vw,200px)] sm:w-[220px] md:w-[248px]"
              item={{
                slug: item.slug,
                label: item.label,
                tagline: item.tagline,
                href: item.href,
                image: item.image,
              }}
            />
          ))}
        </HorizontalScrollRow>
      </div>
    </section>
  );
}
