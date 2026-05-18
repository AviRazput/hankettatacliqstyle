import Image from "next/image";
import { whyHanket } from "@/data/homepage";

const WHY_HANKET_IMAGE = "/whyHanket/whyHanket.png";

export function WhyHanketSection() {
  return (
    <section className="bg-white border-y border-flat-border">
      <div className="max-w-[1500px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 md:min-h-[min(52vh,560px)]">
          <div className="relative aspect-[16/10] w-full md:aspect-auto md:min-h-full">
            <Image
              src={WHY_HANKET_IMAGE}
              alt="Fashion lifestyle at the beach"
              fill
              priority={false}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>

          <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 md:px-12 lg:px-16">
            <h2 className="font-serif text-[1.75rem] font-medium leading-[1.12] tracking-[-0.03em] text-flat-text sm:text-[2rem] lg:text-[2.25rem]">
              Why Hanket
            </h2>
            <p className="mt-2 max-w-md font-sans text-[14px] leading-relaxed text-flat-muted sm:text-[15px]">
              More than a marketplace — a launchpad for fashion
            </p>

            <ul className="mt-8 space-y-0 divide-y divide-flat-border/80 list-none p-0 sm:mt-10">
              {whyHanket.map((item) => (
                <li key={item.title} className="py-4 first:pt-0 last:pb-0 sm:py-5">
                  <h3 className="font-sans text-[13px] font-semibold uppercase tracking-[0.12em] text-flat-text">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 font-sans text-[13px] leading-relaxed text-flat-muted sm:text-[14px]">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
