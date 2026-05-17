import { footerLinks } from "@/data/homepage";

const INSTAGRAM_URL = "https://www.instagram.com/hanket.in/";

function IconInstagram() {
  return (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function FooterColumn({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-6">{title}</h4>
      <ul className="space-y-3 text-[13px]">
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} className="hover:text-white transition-colors">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-[#a8a8a8] border-t border-flat-text">
      <div className="max-w-[1500px] mx-auto px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-1">
            <a href="#" className="font-serif font-bold text-[30px] tracking-widest text-white inline-block mb-6">
              Hanket<span className="text-flat-muted">.</span>
            </a>
            <p className="text-[13px] leading-relaxed mb-6">
              India&apos;s marketplace for emerging fashion brands, creators, and curated style.
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border border-[#333] inline-flex items-center justify-center hover:bg-white hover:text-black transition-colors"
              aria-label="Instagram @hanket.in"
            >
              <IconInstagram />
            </a>
          </div>
          <FooterColumn title="About" links={footerLinks.about} />
          <FooterColumn title="Shop" links={footerLinks.shop} />
          <FooterColumn title="Creators" links={footerLinks.creators} />
          <FooterColumn title="Support" links={footerLinks.support} />
        </div>

        <div className="border-t border-[#333] pt-6 flex flex-col md:flex-row justify-between items-center text-[11px] uppercase tracking-widest gap-4">
          <div>© 2026 HANKET. All rights reserved.</div>
          <div className="flex gap-4">
            <span>VISA</span>
            <span>MC</span>
            <span>UPI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
