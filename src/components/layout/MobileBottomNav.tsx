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
      width={20}
      height={20}
      className="w-5 h-5 object-contain"
    />
  );
}

function IconGrid() {
  return (
    <svg className="w-5 h-5 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
      <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg className="w-5 h-5 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function IconUser() {
  return (
    <svg className="w-5 h-5 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
    </svg>
  );
}

type Item = {
  href: string;
  label: string;
  icon: React.ReactNode;
  match?: (pathname: string) => boolean;
};

const items: Item[] = [
  { href: "/", label: "Home", icon: <IconHome />, match: (p) => p === "/" },
  { href: "/product", label: "Shop", icon: <IconGrid />, match: (p) => p.startsWith("/product") },
  { href: "/search", label: "Search", icon: <IconSearch />, match: (p) => p.startsWith("/search") },
  { href: "/auth/login", label: "Account", icon: <IconUser />, match: (p) => p.startsWith("/auth") },
];

export function MobileBottomNav() {
  const pathname = usePathname() ?? "/";

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[80] bg-flat-bg/95 backdrop-blur border-t border-flat-border max-w-[100vw]">
      <div className="max-w-[1500px] mx-auto px-4">
        <div
          className="h-[64px] grid grid-cols-4"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          {items.map((it) => {
            const active = it.match ? it.match(pathname) : pathname === it.href;
            return (
              <Link
                key={it.href}
                href={it.href}
                className={[
                  "flex flex-col items-center justify-center gap-1",
                  "text-[9px] uppercase tracking-[0.18em] font-bold",
                  active ? "text-flat-text" : "text-flat-muted",
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

