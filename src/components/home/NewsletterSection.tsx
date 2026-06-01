export function NewsletterSection() {
  return (
    <section className="bg-black text-white">
      <div className="max-w-[1500px] mx-auto">
        <div className="flex min-h-[300px] items-center justify-center px-4 py-12">
          <div className="text-center">
            <h2 className="font-serif text-[1.5rem] font-medium tracking-[-0.02em] sm:text-[2rem] md:text-[2.5rem]">
              Join the Hanket Community
            </h2>

            <p className="mt-3 max-w-md text-sm text-white/75 sm:text-base">
              New brands, creator drops, and exclusive offers — straight to your inbox.
            </p>

            <form
              className="mt-8 w-full max-w-[420px] mx-auto"
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
                className="w-full border border-white/35 bg-white/10 px-4 py-3 text-white placeholder:text-white/45 outline-none focus:border-white/60"
              />

              <button
                type="submit"
                className="mt-4 w-full bg-white px-6 py-3 font-semibold text-black hover:opacity-90"
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