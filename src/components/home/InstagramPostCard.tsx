import Image from "next/image";
import Link from "next/link";

const INSTA_IMAGE_BASE = "https://woodmart.xtemos.com/wp-content/uploads/2017/04/";

export type InstagramPost = {
  slug: string;
  title: string;
  image: string;
  href: string;
};

export function InstagramPostCard({ post }: { post: InstagramPost }) {
  return (
    <Link
      href={post.href}
      className="group relative block aspect-square w-full shrink-0 overflow-hidden"
    >
      <Image
        src={`${INSTA_IMAGE_BASE}${post.image}`}
        alt={post.title}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent px-3 pb-4 pt-12 text-center sm:px-4 sm:pb-5 sm:pt-14"
        aria-hidden
      >
        <p className="font-serif text-[13px] font-medium leading-snug text-white sm:text-[15px] md:text-[16px]">
          {post.title}
        </p>
        <span className="mt-1.5 block font-sans text-[9px] font-semibold uppercase tracking-[0.2em] text-white/95 sm:mt-2 sm:text-[10px]">
          Shop Now
        </span>
      </div>
    </Link>
  );
}
