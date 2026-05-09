"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function IconUser() {
  return (
    <svg className="w-5 h-5 stroke-current fill-none stroke-2 shrink-0" viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
    </svg>
  );
}

function IconHeart() {
  return (
    <svg className="w-5 h-5 stroke-current fill-none stroke-2 shrink-0" viewBox="0 0 24 24">
      <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z" />
    </svg>
  );
}

function IconCart() {
  return (
    <svg className="w-5 h-5 stroke-current fill-none stroke-2 shrink-0" viewBox="0 0 24 24">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg className="w-5 h-5 stroke-current fill-none stroke-2 shrink-0" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function IconMenu() {
  return (
    <svg className="w-6 h-6 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

const navLinks = [
  "Mens",
  "Womens",
  "Kids",
  "Handloom",
  "GenZ",
  "Accessories",
  "Beauty",
  "Customized",
];

export function Header() {
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const cartCount = 0;

  const drawerLinks = navLinks;
  const drawerAccountLinks = ["Login / Register", "Wishlist", "Cart"];

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="bg-flat-bg border-b border-flat-border fixed md:sticky top-0 left-0 right-0 w-full z-50 md:transition-all md:duration-300">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-5 md:px-6 lg:px-8 py-2 md:py-4">
        {/* Mobile: top bar + search under header */}
        <div className="md:hidden">
          <div className="grid grid-cols-3 items-center min-h-[48px]">
            <button
              type="button"
              className="justify-self-start text-flat-text w-11 h-11 inline-flex items-center justify-center rounded-sm hover:bg-flat-layer transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
              aria-expanded={mobileOpen}
            >
              <IconMenu />
            </button>

            <Link
              href="/"
              className="justify-self-center flex items-center min-w-0 max-w-[min(260px,68vw)] px-1 py-1"
              aria-label="Hanket home"
            >
              <Image
                src="/logo.png"
                alt="Hanket"
                width={320}
                height={128}
                sizes="(max-width: 767px) min(96vw, 400px), 300px"
                quality={90}
                preload
                className="h-[48px] w-auto max-w-full object-contain origin-center scale-[1.26]"
              />
            </Link>

            <Link
              href="/cart"
              className="justify-self-end relative text-flat-text w-11 h-11 inline-flex items-center justify-center rounded-sm hover:bg-flat-layer transition-colors"
              aria-label="Cart"
            >
              <IconCart />
              <span className="absolute -top-1 -right-1 bg-flat-text text-flat-bg text-[10px] px-[6px] py-[2px] flex items-center justify-center min-w-[20px]">
                {cartCount}
              </span>
            </Link>
          </div>

          <form
            className="mt-2 w-full"
            onSubmit={(e) => {
              e.preventDefault();
            }}
            role="search"
            aria-label="Site search"
          >
            <div className="relative w-full">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-flat-muted pointer-events-none">
                <IconSearch />
              </span>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products, brands and more"
                className={[
                  "h-10 w-full pl-10 pr-4",
                  "rounded-md bg-flat-layer border border-flat-text/20 text-flat-text placeholder:text-flat-text/50",
                  "outline-none focus:border-flat-text/40 focus:ring-2 focus:ring-flat-text/15 transition-colors",
                ].join(" ")}
              />
            </div>
          </form>
        </div>

        {/* Tablet / desktop */}
        <div className="hidden md:flex flex-col w-full max-w-[1400px] xl:mx-auto min-w-0">
          <div className="flex flex-nowrap items-center gap-3 md:gap-4 lg:gap-6 xl:gap-8 min-w-0">
            <Link
              href="/"
              className="flex items-center gap-2 shrink-0 min-w-0"
              aria-label="HANKET home"
            >
              <Image
                src="/logo.png"
                alt="Hanket"
                width={320}
                height={128}
                sizes="(max-width: 1023px) 200px, 240px"
                quality={90}
                preload
                className="h-14 md:h-16 w-auto shrink-0 object-contain"
              />
            </Link>

            <nav className="flex items-center flex-nowrap justify-start gap-x-2 md:gap-x-3 lg:gap-x-5 xl:gap-x-8 min-w-0 flex-1 overflow-x-auto overscroll-x-contain whitespace-nowrap no-scrollbar py-0.5">
              {navLinks.map((label) => (
                <a key={label} href="#" className="nav-link whitespace-nowrap shrink-0">
                  {label}
                </a>
              ))}
            </nav>

            <div className="flex items-center flex-nowrap justify-end gap-2 md:gap-3 lg:gap-4 shrink-0 text-[11px] lg:text-xs">
              <a
                href="#"
                className="hidden lg:inline-flex items-center gap-1.5 text-flat-text hover:text-flat-muted transition-colors font-sans uppercase tracking-widest whitespace-nowrap shrink-0"
              >
                <IconUser />
                Login / Register
              </a>

              <button
                type="button"
                className="inline-flex items-center justify-center w-9 h-9 text-flat-text hover:text-flat-muted transition-colors shrink-0"
                aria-label="Wishlist"
              >
                <IconHeart />
              </button>

              <button
                type="button"
                className="inline-flex items-center gap-2 whitespace-nowrap text-flat-text hover:text-flat-muted transition-colors font-sans uppercase tracking-widest shrink-0"
                aria-label="Cart"
              >
                <IconCart />
                <span className="text-[11px] leading-none">Cart</span>
                <span className="bg-flat-text text-flat-bg text-[10px] leading-none px-[6px] py-[2px] inline-flex items-center justify-center min-w-[18px] rounded-sm">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>

          {/* Dedicated full-width search row below categories */}
          <form
            className="mt-3 w-full"
            onSubmit={(e) => {
              e.preventDefault();
            }}
            role="search"
            aria-label="Site search"
          >
            <div className="relative w-full">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-flat-muted pointer-events-none">
                <IconSearch />
              </span>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products, brands and more"
                className={[
                  "h-10 w-full pl-10 pr-4",
                  "rounded-md bg-flat-layer border border-flat-text/20 text-flat-text placeholder:text-flat-text/50",
                  "outline-none focus:border-flat-text/40 focus:ring-2 focus:ring-flat-text/15 transition-colors",
                ].join(" ")}
              />
            </div>
          </form>
        </div>
      </div>

      {/* Mobile overlay + drawer */}
      <button
        type="button"
        aria-label="Close menu overlay"
        className={[
          "fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300",
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        ].join(" ")}
        onClick={() => setMobileOpen(false)}
      />

      <div
        className={[
          "fixed top-0 left-0 h-full w-[300px] bg-flat-bg z-[70] transition-transform duration-300 ease-out flex flex-col border-r border-flat-border",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="flex justify-between items-center p-6 border-b border-flat-border">
          <span className="flex items-center">
            <Image
              src="/logo.png"
              alt="Hanket"
              width={340}
              height={96}
              sizes="280px"
              quality={85}
              className="h-[50px] w-auto object-contain"
            />
          </span>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-flat-text p-2 hover:text-flat-muted transition-colors"
          >
            ✕
          </button>
        </div>
        <nav className="flex flex-col flex-1 overflow-y-auto p-6 pb-10">
          <form
            className="mb-6"
            onSubmit={(e) => {
              e.preventDefault();
              setMobileOpen(false);
            }}
            role="search"
            aria-label="Site search"
          >
            <div className="relative w-full">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-flat-muted pointer-events-none">
                <IconSearch />
              </span>
              <input
                id="mobile-search-input"
                ref={mobileSearchInputRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products, brands and more"
                className={[
                  "h-10 w-full pl-10 pr-4",
                  "rounded-md bg-flat-layer border border-flat-text/20 text-flat-text placeholder:text-flat-text/50",
                  "outline-none focus:border-flat-text/40 focus:ring-2 focus:ring-flat-text/15 transition-colors",
                ].join(" ")}
              />
            </div>
          </form>
          <div className="flex flex-col gap-5">
            {drawerLinks.map((label) => (
              <a
                key={label}
                href="#"
                onClick={() => setMobileOpen(false)}
                className="text-xs font-bold uppercase tracking-widest text-flat-text hover:text-flat-muted transition-colors"
              >
                {label}
              </a>
            ))}
          </div>

          <div className="my-6 border-t border-flat-border" />

          <div className="flex flex-col gap-4">
            {drawerAccountLinks.map((label) => (
              <a
                key={label}
                href="#"
                onClick={() => setMobileOpen(false)}
                className="text-xs uppercase tracking-widest text-flat-text/90 hover:text-flat-muted transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
