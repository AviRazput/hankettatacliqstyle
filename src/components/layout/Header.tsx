"use client";

import { useAuthDrawer } from "@/components/auth/AuthDrawerContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const searchInputBase =
  "w-full rounded-full bg-[#f0f0f0] border border-[#e0e0e0] text-[#333] placeholder:text-[#999] outline-none focus:border-[#ccc] focus:ring-1 focus:ring-[#ddd] transition-colors";
const searchInputMobile = `${searchInputBase} h-10 pl-4 pr-11 text-[13px]`;
const searchInputDesktop = `${searchInputBase} h-[46px] pl-5 pr-12 text-[14px]`;

function SearchField({
  className,
  inputClassName,
  value,
  onChange,
  id,
  inputRef,
}: {
  className?: string;
  inputClassName: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <div className={["relative w-full", className].filter(Boolean).join(" ")}>
      <input
        id={id}
        ref={inputRef}
        value={value}
        onChange={onChange}
        placeholder="Search for products"
        className={inputClassName}
      />
      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#c4c4c4] pointer-events-none md:right-4">
        <IconSearch />
      </span>
    </div>
  );
}

function IconUser() {
  return (
    <svg className="w-5 h-5 stroke-[#333] fill-none stroke-[1.6] shrink-0" viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
    </svg>
  );
}

function IconHeart() {
  return (
    <svg className="w-[21px] h-[21px] stroke-[#333] fill-none stroke-[1.6] shrink-0" viewBox="0 0 24 24">
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

function IconBag() {
  return (
    <svg className="w-[18px] h-[18px] stroke-current fill-none stroke-[1.75] shrink-0" viewBox="0 0 24 24" aria-hidden>
      <path d="M6 7h12l-1 14H7L6 7z" strokeLinejoin="round" />
      <path d="M9 7V5a3 3 0 0 1 6 0v2" strokeLinecap="round" />
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

function IconCompare() {
  return (
    <svg className="w-[21px] h-[21px] stroke-[#333] fill-none stroke-[1.6]" viewBox="0 0 24 24" aria-hidden>
      <path d="M7 4H4v3M17 20h3v-3M4 20l16-16M20 4v3h-3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CountBadge({ count, variant = "icon" }: { count: number; variant?: "icon" | "cart" }) {
  if (variant === "cart") {
    return (
      <span className="absolute -top-1.5 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-[#f5a623] text-white text-[10px] font-bold leading-none">
        {count}
      </span>
    );
  }
  return (
    <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-[#f5f5f5] text-[#333] text-[10px] font-semibold leading-none border border-[#e8e8e8]">
      {count}
    </span>
  );
}

const categoryNav = [
  "Mens",
  "Womens",
  "Kids",
  "Handloom",
  "GenZ",
  "Accessories",
  "Beauty",
  "Customized",
] as const;

const logoImageBoost = "contrast-[1.14] saturate-[1.06]";

export function Header() {
  const { openAuthDrawer } = useAuthDrawer();
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const cartCount = 0;

  const drawerLinks = categoryNav;
  const drawerAccountLinks: { label: string; href?: string; action?: "auth" }[] = [
    { label: "Login / Register", action: "auth" },
    { label: "Wishlist", href: "#" },
    { label: "Cart", href: "/cart" },
  ];

  const openAuth = () => {
    setMobileOpen(false);
    openAuthDrawer("sign-in");
  };

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="bg-white border-b border-[#ebebeb] fixed md:sticky top-0 left-0 right-0 w-full z-50">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-5 md:px-6 lg:px-8 py-2 md:py-0">
        {/* Mobile */}
        <div className="md:hidden">
          <div className="grid grid-cols-[auto_1fr_auto] items-center min-h-[48px] gap-2">
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
              className="justify-self-center flex items-center min-w-0 max-w-[min(220px,58vw)] px-1 py-1 overflow-visible"
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
                className={["h-[48px] w-auto max-w-full object-contain origin-center scale-[1.62]", logoImageBoost].join(
                  " ",
                )}
              />
            </Link>

            <div className="justify-self-end flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => openAuthDrawer("sign-in")}
                className="text-[#333] w-11 h-11 inline-flex items-center justify-center rounded-sm hover:bg-flat-layer transition-colors"
                aria-label="Login / Register"
              >
                <IconUser />
              </button>

              <Link
                href="/cart"
                className="relative inline-flex items-center gap-1.5 bg-[#1a1a1a] text-white rounded-full pl-3 pr-3 py-2 hover:bg-[#333] transition-colors"
                aria-label="Cart"
              >
                <IconBag />
                <span className="text-[11px] font-medium leading-none">₹0.00</span>
                <CountBadge count={cartCount} variant="cart" />
              </Link>
            </div>
          </div>

          <form className="mt-2 w-full" onSubmit={(e) => e.preventDefault()} role="search" aria-label="Site search">
            <SearchField
              inputClassName={searchInputMobile}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>

        {/* Desktop: WoodMart-style */}
        <div className="hidden md:flex flex-col w-full min-w-0">
          <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 lg:gap-8 py-4 lg:py-5">
            <Link href="/" className="flex items-center shrink-0 overflow-visible -ml-8 lg:-ml-14" aria-label="Hanket home">
              <Image
                src="/logo.png"
                alt="Hanket"
                width={320}
                height={128}
                sizes="180px"
                quality={90}
                preload
                className={["h-11 lg:h-12 w-auto object-contain origin-left scale-[3]", logoImageBoost].join(" ")}
              />
            </Link>

            <form
              className="w-full max-w-xl lg:max-w-[42rem] justify-self-center"
              onSubmit={(e) => e.preventDefault()}
              role="search"
              aria-label="Site search"
            >
              <SearchField
                inputClassName={searchInputDesktop}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>

            <div className="flex items-center gap-4 lg:gap-6 shrink-0">
              <button
                type="button"
                className="relative flex h-10 w-10 items-center justify-center text-[#333] hover:text-[#666] transition-colors"
                aria-label="Compare"
              >
                <IconCompare />
                <CountBadge count={0} />
              </button>

              <button
                type="button"
                className="relative flex h-10 w-10 items-center justify-center text-[#333] hover:text-[#666] transition-colors"
                aria-label="Wishlist"
              >
                <IconHeart />
                <CountBadge count={0} />
              </button>

              <button
                type="button"
                onClick={() => openAuthDrawer("sign-in")}
                className="hidden lg:inline-flex items-center gap-2 text-[#333] hover:text-[#666] transition-colors whitespace-nowrap"
              >
                <IconUser />
                <span className="text-[13px] font-normal">Login / Register</span>
              </button>
              <button
                type="button"
                onClick={() => openAuthDrawer("sign-in")}
                className="lg:hidden relative flex h-10 w-10 items-center justify-center text-[#333] hover:text-[#666] transition-colors"
                aria-label="Login / Register"
              >
                <IconUser />
              </button>

              <Link
                href="/cart"
                className="relative inline-flex items-center gap-2.5 bg-[#1a1a1a] text-white rounded-full pl-4 pr-5 py-2.5 hover:bg-[#333] transition-colors shrink-0"
                aria-label="Cart"
              >
                <IconBag />
                <span className="text-[13px] font-medium leading-none">₹0.00</span>
                <CountBadge count={cartCount} variant="cart" />
              </Link>
            </div>
          </div>

          <div className="border-t border-[#f0f0f0] flex items-center justify-between gap-4 py-3 pb-4">
            <nav className="flex items-center gap-6 lg:gap-8 overflow-x-auto no-scrollbar flex-1 min-w-0">
              {categoryNav.map((label) => (
                <a
                  key={label}
                  href="#"
                  className="shrink-0 text-[13px] font-semibold text-[#333] hover:text-flat-pink transition-colors whitespace-nowrap"
                >
                  {label}
                </a>
              ))}
            </nav>
            <p className="hidden lg:block shrink-0 text-[12px] text-[#3d7a99] bg-[#d9edf7] px-4 py-2 rounded-full whitespace-nowrap m-0 font-normal">
              Free shipping for all orders of <strong className="font-semibold">₹1,300</strong>
            </p>
          </div>
        </div>
      </div>

      <button
        type="button"
        aria-label="Close menu overlay"
        className={[
          "fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 md:hidden",
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        ].join(" ")}
        onClick={() => setMobileOpen(false)}
      />

      <div
        className={[
          "fixed top-0 left-0 h-full w-[300px] bg-flat-bg z-[70] transition-transform duration-300 ease-out flex flex-col border-r border-flat-border md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="flex justify-between items-center p-6 border-b border-flat-border">
          <span className="flex items-center overflow-visible">
            <Image
              src="/logo.png"
              alt="Hanket"
              width={340}
              height={96}
              sizes="280px"
              quality={85}
              className={["h-[54px] w-auto object-contain origin-left scale-[1.36]", logoImageBoost].join(" ")}
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
            <SearchField
              id="mobile-search-input"
              inputRef={mobileSearchInputRef}
              inputClassName={searchInputMobile}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <div className="flex flex-col gap-5">
            {drawerLinks.map((label) => (
              <a
                key={label}
                href="#"
                onClick={() => setMobileOpen(false)}
                className="text-xs font-bold uppercase tracking-widest text-flat-text hover:text-flat-pink transition-colors"
              >
                {label}
              </a>
            ))}
          </div>

          <div className="my-6 border-t border-flat-border" />

          <div className="flex flex-col gap-4">
            {drawerAccountLinks.map(({ label, href, action }) =>
              action === "auth" ? (
                <button
                  key={label}
                  type="button"
                  onClick={openAuth}
                  className="text-left text-xs uppercase tracking-widest text-flat-text/90 hover:text-flat-pink transition-colors"
                >
                  {label}
                </button>
              ) : (
                <Link
                  key={label}
                  href={href ?? "#"}
                  onClick={() => setMobileOpen(false)}
                  className="text-xs uppercase tracking-widest text-flat-text/90 hover:text-flat-muted transition-colors"
                >
                  {label}
                </Link>
              ),
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
