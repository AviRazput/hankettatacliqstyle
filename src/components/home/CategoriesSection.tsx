import { homeCategories } from "@/data/homepage";
import { CategoryCard } from "./CategoryCard";

export function CategoriesSection() {
  return (
    <section className="bg-white pt-5 pb-5 md:pt-6 md:pb-6">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-5 md:mb-6">
          <h2 className="font-serif text-[1.625rem] md:text-[2rem] font-medium text-flat-text leading-[1.15] tracking-[-0.02em]">
            Top Categories
          </h2>
          <p className="mt-2 font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-flat-muted">
            Shop by style
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {homeCategories.map((cat) => (
            <CategoryCard
              key={cat.slug}
              item={{
                slug: cat.slug,
                label: cat.label,
                tagline: cat.tagline,
                href: cat.href,
                image: cat.image,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
