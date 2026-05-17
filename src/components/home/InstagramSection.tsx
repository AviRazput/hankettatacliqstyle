import { socialTags } from "@/data/homepage";
import Image from "next/image";
import { instaImages } from "../../data/products";

const INSTAGRAM_URL = "https://www.instagram.com/hanket.in/";

function IconInstagramOutline() {
  return (
    <svg
      className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="white" />
    </svg>
  );
}

export function InstagramSection() {
  return (
    <section className="bg-white pt-5 pb-5 md:pt-6 md:pb-6 overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-8">
        <div className="text-center mb-10">
          <p className="text-[0.75rem] leading-[1.5] tracking-[0.15em] text-flat-muted uppercase mb-4">
            @hanket.in on Instagram
          </p>
          <h2 className="mb-4 text-flat-text text-[2rem] md:text-[2.5rem] leading-[1.2]">Social</h2>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {socialTags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] uppercase tracking-widest border border-flat-border px-4 py-2 text-flat-muted"
              >
                {tag}
              </span>
            ))}
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-flat-text hover:text-flat-pink transition-colors underline underline-offset-4"
          >
            Follow @hanket.in
          </a>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1920px] grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-px bg-flat-border border-y border-flat-border">
          {instaImages.map((img, idx) => (
            <div key={`${img}-${idx}`} className="aspect-square relative bg-flat-bg overflow-hidden group cursor-pointer">
              <Image
                src={`https://woodmart.xtemos.com/wp-content/uploads/2017/04/${img}`}
                alt="Instagram post"
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 12.5vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-flat-bg/0 group-hover:bg-flat-bg/30 transition-colors duration-300 flex items-center justify-center">
                <IconInstagramOutline />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

