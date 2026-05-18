import { instaImages, mainCollection } from "@/data/products";
import { CategoryCard, scrollCategoryCardClass } from "./CategoryCard";
import { HorizontalScrollRow } from "./HorizontalScrollRow";

const INSTA_IMAGE_BASE = "https://woodmart.xtemos.com/wp-content/uploads/2017/04/";

export function NewArrivalsSection() {
  const products = mainCollection.slice(0, 8);

  return (
    <section className="bg-white pt-5 pb-5 md:pt-6 md:pb-6">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-5 md:mb-6">
          <h2 className="font-serif text-[1.625rem] md:text-[2rem] font-medium text-flat-text leading-[1.15] tracking-[-0.02em]">
            New Arrivals
          </h2>
          <p className="mt-2 font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-flat-muted">
            Fresh drops from emerging brands on Hanket
          </p>
        </div>

        <HorizontalScrollRow arrowTop="42%">
          {products.map((p, i) => (
            <CategoryCard
              key={p.id}
              imageFill="cover"
              className={scrollCategoryCardClass}
              item={{
                slug: p.id,
                label: p.title,
                tagline: p.price,
                href: `/product/${p.id}`,
                image: `${INSTA_IMAGE_BASE}${instaImages[i % instaImages.length]}`,
              }}
            />
          ))}
        </HorizontalScrollRow>
      </div>
    </section>
  );
}
