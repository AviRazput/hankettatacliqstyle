import { whyHanket } from "@/data/homepage";
import { SectionHeading } from "./SectionHeading";

export function WhyHanketSection() {
  return (
    <section className="bg-white pt-5 pb-5 md:pt-6 md:pb-6">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-8">
        <SectionHeading title="Why Hanket" subtitle="More than a marketplace — a launchpad for fashion" align="center" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {whyHanket.map((item) => (
            <article key={item.title} className="border border-flat-border p-6 bg-flat-layer">
              <h3 className="font-sans text-sm font-semibold text-flat-text mb-2 uppercase tracking-wide">
                {item.title}
              </h3>
              <p className="text-sm text-flat-muted leading-relaxed">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
