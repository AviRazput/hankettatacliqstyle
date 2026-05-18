import Image from "next/image";
import Link from "next/link";

export type CreatorService = {
  slug: string;
  title: string;
  description: string;
  image: string;
};

export function CreatorServiceCard({
  service,
  className = "",
}: {
  service: CreatorService;
  className?: string;
}) {
  const href = `/search?service=${service.slug}`;

  return (
    <article
      className={[
        "flex h-full min-h-full w-[min(78vw,300px)] shrink-0 flex-col border-r border-[#1a1a1a]/10 bg-[#fdf8f4] sm:w-[300px] md:w-[340px] lg:w-[min(32vw,420px)]",
        className,
      ].join(" ")}
    >
      <div className="flex flex-1 flex-col px-4 pt-4 pb-6 sm:px-5 sm:pt-5 sm:pb-8 md:px-6 md:pt-6">
        <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden sm:mb-5">
          <Image
            src={service.image}
            alt=""
            fill
            sizes="(max-width: 640px) 78vw, (max-width: 1024px) 340px, 420px"
            className="object-cover object-center"
          />
        </div>

        <h3 className="font-sans text-[1rem] font-semibold leading-snug text-[#1a1a1a] sm:text-[1.125rem] md:text-[1.25rem]">
          {service.title}
        </h3>
        <p className="mt-2 flex-1 font-sans text-[13px] leading-relaxed text-[#4a4a4a] sm:text-[14px] md:mt-3 md:text-[15px] md:leading-[1.65]">
          {service.description}
        </p>

        <Link
          href={href}
          className="mt-5 inline-flex w-fit items-center justify-center border border-[#1a1a1a] px-5 py-2 font-sans text-[12px] font-medium tracking-wide text-[#1a1a1a] transition-colors hover:bg-[#1a1a1a] hover:text-white sm:mt-6 sm:px-6 sm:py-2.5 sm:text-[13px]"
        >
          Read More
        </Link>
      </div>
    </article>
  );
}
