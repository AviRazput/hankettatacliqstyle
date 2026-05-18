import Image from "next/image";

const NEWSLETTER_IMAGE = "/joinHanket/joinhanket.jpg";

export function NewsletterSection() {
  return (
    <section className="bg-black text-white">
      <div className="max-w-[1500px] mx-auto">
        <div className="grid grid-cols-2 min-h-[min(38vh,300px)] sm:min-h-[min(46vh,420px)] md:min-h-[min(52vh,520px)] items-stretch">
          <div className="relative min-h-full">
            <Image
              src={NEWSLETTER_IMAGE}
              alt=""
              fill
              sizes="50vw"
              className="object-cover object-center"
            />
          </div>

          <div className="flex min-h-full flex-col items-center justify-center px-3 py-4 text-center sm:px-10 sm:py-8 md:px-12 lg:px-16">
            <h2 className="font-serif text-[0.8125rem] leading-[1.2] font-medium tracking-[-0.02em] text-white sm:text-[1.5rem] md:text-[2.125rem]">
              Join the Hanket Community
            </h2>
            <p className="mt-1.5 max-w-md font-sans text-[9px] leading-snug text-white/75 sm:mt-3 sm:text-[14px] sm:leading-relaxed md:text-[15px]">
              New brands, creator drops, and exclusive offers — straight to your inbox.
            </p>

            <form
              className="mt-3 w-full max-w-[420px] sm:mt-8 md:mt-10"
              action="#"
              method="post"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                name="email"
                placeholder="Your email address"
                required
                autoComplete="email"
                className="newsletter-input w-full border border-white/35 bg-white/10 px-2.5 py-2 font-sans text-[11px] text-white placeholder:text-white/45 outline-none focus:border-white/60 focus:ring-2 focus:ring-white/15 sm:px-4 sm:py-3.5 sm:text-[14px] md:py-4"
              />
              <button
                type="submit"
                className="newsletter-submit mx-auto mt-2 block w-full max-w-[7.5rem] bg-white px-4 py-2 font-sans text-[11px] font-semibold text-black transition-opacity hover:opacity-90 sm:mt-4 sm:min-w-[140px] sm:max-w-none sm:px-10 sm:py-3.5 sm:text-[14px] md:py-4"
              >
                Join
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
