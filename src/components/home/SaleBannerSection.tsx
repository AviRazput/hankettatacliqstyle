import Link from "next/link";

export function SaleBannerSection() {
  return (
    <section className="bg-[#1a1a1a] text-white">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-8 py-16 md:py-20 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/70 mb-3">Limited Time</p>
          <h2 className="font-serif text-3xl md:text-4xl mb-3">Season Sale</h2>
          <p className="text-white/80 text-lg">Up to 40% off on curated collections</p>
        </div>
        <Link href="/search?category=sale" className="btn-flat bg-white text-flat-text hover:bg-transparent hover:text-white border-white self-start">
          Shop Sale
        </Link>
      </div>
    </section>
  );
}
