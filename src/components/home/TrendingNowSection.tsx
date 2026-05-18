import { instaImages } from "@/data/products";
import { trendingItems } from "@/data/homepage";
import { CategoryCard, scrollCategoryCardClass } from "./CategoryCard";
import { HorizontalScrollRow } from "./HorizontalScrollRow";

const SHOWCASE_IMAGE_BASE = "https://woodmart.xtemos.com/wp-content/uploads/2017/04/";
const MOBILE_GRID_PAGE_SIZE = 4;

function chunkBy<T>(items: readonly T[], size: number): T[][] {
  const pages: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    pages.push(items.slice(i, i + size) as T[]);
  }
  return pages;
}

export function TrendingNowSection() {
  const mobilePages = chunkBy(trendingItems, MOBILE_GRID_PAGE_SIZE);

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

        {/* Mobile: 2×2 grid (4 per screen), swipe for more */}
        <div
          className="md:hidden flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar gap-0 -mx-1"
          aria-label="Trending items, swipe for more"
        >
          {mobilePages.map((page, pageIndex) => (
            <div
              key={pageIndex}
              className="grid w-full min-w-full shrink-0 snap-start grid-cols-2 gap-3 px-1"
            >
              {page.map((item, i) => {
                const index = pageIndex * MOBILE_GRID_PAGE_SIZE + i;
                return (
                  <CategoryCard
                    key={item.slug}
                    size="grid"
                    imageFill="cover"
                    item={{
                      slug: item.slug,
                      label: item.label,
                      tagline: item.tagline,
                      href: item.href,
                      image: `${SHOWCASE_IMAGE_BASE}${instaImages[index % instaImages.length]}`,
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>

        {/* Tablet & desktop: horizontal row */}
        <div className="hidden md:block">
          <HorizontalScrollRow arrowTop="42%">
            {trendingItems.map((item, i) => (
              <CategoryCard
                key={item.slug}
                imageFill="cover"
                className={scrollCategoryCardClass}
                item={{
                  slug: item.slug,
                  label: item.label,
                  tagline: item.tagline,
                  href: item.href,
                  image: `${SHOWCASE_IMAGE_BASE}${instaImages[i % instaImages.length]}`,
                }}
              />
            ))}
          </HorizontalScrollRow>
        </div>
      </div>
    </section>
  );
}
