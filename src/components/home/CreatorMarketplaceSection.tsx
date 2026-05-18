import Link from "next/link";
import { creatorServices } from "@/data/homepage";
import { CreatorServiceCard } from "./CreatorServiceCard";
import { HorizontalScrollRow } from "./HorizontalScrollRow";

export function CreatorMarketplaceSection() {
  return (
    <section className="bg-[#fdf8f4] pt-6 pb-6 md:pt-10 md:pb-10">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-5 md:mb-7">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h2 className="font-serif text-[1.5rem] font-medium leading-[1.15] tracking-[-0.02em] text-[#1a1a1a] md:text-[2rem]">
              Creator Marketplace
            </h2>
            <Link
              href="/search?service=creator"
              className="font-sans text-[13px] text-[#1a1a1a] underline underline-offset-[5px] decoration-[#1a1a1a]/70 hover:decoration-[#1a1a1a] md:text-[14px]"
            >
              Read More
            </Link>
          </div>
          <p className="mt-2 max-w-xl font-sans text-[14px] leading-relaxed text-[#5c5c5c] md:text-[15px]">
            Services for growing fashion brands
          </p>
        </header>

        <HorizontalScrollRow
          arrowTop="50%"
          scrollClassName="flex gap-0 overflow-x-auto no-scrollbar scroll-smooth"
        >
          {creatorServices.map((service, index) => (
            <CreatorServiceCard
              key={service.slug}
              service={service}
              className={index === creatorServices.length - 1 ? "border-r-0" : ""}
            />
          ))}
        </HorizontalScrollRow>
      </div>
    </section>
  );
}
