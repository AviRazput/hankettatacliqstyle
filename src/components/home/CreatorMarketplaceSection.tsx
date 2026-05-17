import { creatorServices } from "@/data/homepage";
import { CategoryCard } from "./CategoryCard";
import { HorizontalScrollRow } from "./HorizontalScrollRow";

export function CreatorMarketplaceSection() {
  return (
    <section className="bg-white pt-5 pb-5 md:pt-6 md:pb-6">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-5 md:mb-6">
          <h2 className="font-serif text-[1.625rem] md:text-[2rem] font-medium text-flat-text leading-[1.15] tracking-[-0.02em]">
            Creator Marketplace
          </h2>
          <p className="mt-2 font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-flat-muted">
            Services for growing fashion brands
          </p>
        </div>

        <HorizontalScrollRow arrowTop="42%">
          {creatorServices.map((service) => (
            <CategoryCard
              key={service.slug}
              className="shrink-0 w-[min(44vw,200px)] sm:w-[220px] md:w-[248px]"
              item={{
                slug: service.slug,
                label: service.title,
                tagline: service.description,
                href: `/search?service=${service.slug}`,
                image: service.image,
              }}
            />
          ))}
        </HorizontalScrollRow>
      </div>
    </section>
  );
}
