"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavIcon({ children }: { children: React.ReactNode }) {
  return <span className="w-5 h-5 inline-flex items-center justify-center">{children}</span>;
}

function IconHome() {
  return (
    <Image
      src="/homeicon.png"
      alt="Home"
      width={40}
      height={40}
      className="w-5 h-5 object-contain"
    />
  );
}

function IconWishlist() {
  return (
    <svg className="w-5 h-5 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
      <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z" />
    </svg>
  );
}

function IconShop() {
  return (
    <svg className="w-5 h-5 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.5 10V9a4 4 0 10-8 0v1M20 21H4a2 2 0 01-2-2v-8a2 2 0 012-2h16a2 2 0 012 2v8a2 2 0 01-2 2z"
      />
    </svg>
  );
}

function IconCart() {
  return (
    <svg className="w-5 h-5 stroke-current fill-none stroke-[1.6]" viewBox="0 0 24 24" aria-hidden>
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path
        d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const linkItems = [
  { href: "/", label: "Home", icon: <IconHome />, match: (p: string) => p === "/" },
  { href: "#", label: "Wishlist", icon: <IconWishlist />, match: () => false },
  { href: "/product", label: "Shop", icon: <IconShop />, match: (p: string) => p.startsWith("/product") },
  { href: "/cart", label: "Cart", icon: <IconCart />, match: (p: string) => p === "/cart" },
] as const;

export function MobileBottomNav() {
  const pathname = usePathname() ?? "/";

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[80] bg-flat-bg/95 backdrop-blur border-t border-flat-border max-w-[100vw] pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-[1500px] mx-auto px-4">
        <div className="h-16 min-h-[4rem] max-h-[4rem] grid grid-cols-4 items-center shrink-0">
          {linkItems.map((it) => {
            const active = it.match(pathname);
            return (
              <Link
                key={it.href + it.label}
                href={it.href}
                className={[
                  "flex flex-col items-center justify-center gap-1",
                  "text-[9px] uppercase tracking-[0.18em] font-bold",
                  active ? "text-flat-text" : "text-flat-muted hover:text-flat-text transition-colors",
                ].join(" ")}
              >
                <NavIcon>{it.icon}</NavIcon>
                <span>{it.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
