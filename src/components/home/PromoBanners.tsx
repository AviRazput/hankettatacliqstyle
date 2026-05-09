const promos = [
  {
    eyebrow: "Hot list",
    title: (
      <>
        Summer
        <br />
        {"Men's"} Wear
      </>
    ),
    img: "https://woodmart.xtemos.com/wp-content/uploads/2017/03/baner-flat-fashion-500x375.jpg",
  },
  {
    eyebrow: "Category",
    title: (
      <>
        Fantastic
        <br />
        Special Shoes
      </>
    ),
    img: "https://woodmart.xtemos.com/wp-content/uploads/2017/03/baner-flat-fashion-5-500x375.jpg",
  },
  {
    eyebrow: "Women's",
    title: (
      <>
        Bags &amp;
        <br />
        Handbags
      </>
    ),
    img: "https://woodmart.xtemos.com/wp-content/uploads/2017/03/baner-flat-fashion-7-500x375.jpg",
  },
  {
    eyebrow: "Summertime",
    title: (
      <>
        {"Women's"}
        <br />
        {"Mid-Season"}
      </>
    ),
    img: "https://woodmart.xtemos.com/wp-content/uploads/2017/03/baner-flat-fashion-9-500x375.jpg",
  },
];

export function PromoBanners() {
  return (
    <section className="pt-4 pb-4 md:py-8 bg-flat-bg">
      <div className="max-w-[1500px] mx-auto px-4 md:px-8">
        <div className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory md:grid md:grid-cols-2 md:overflow-visible md:snap-none xl:grid-cols-4 gap-px bg-flat-border border border-flat-border">
          {promos.map((p) => (
            <div
              key={p.img}
              className="relative bg-flat-bg group overflow-hidden cursor-pointer aspect-[1/1] md:aspect-[4/3] min-h-[260px] md:min-h-0 w-full min-w-full flex-none snap-start md:w-auto md:min-w-0 md:flex-auto"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                style={{ backgroundImage: `url('${p.img}')` }}
              />
              <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-center">
                <p className="text-[0.75rem] leading-[1.5] tracking-[0.15em] text-flat-text/80 mb-2 uppercase">
                  {p.eyebrow}
                </p>
                <h3 className="text-flat-text text-[26px] mb-4 leading-tight">{p.title}</h3>
                <span className="text-[11px] font-bold uppercase tracking-widest border-b border-flat-text self-start pb-1 hover:text-flat-muted hover:border-flat-muted transition-colors">
                  See More
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

