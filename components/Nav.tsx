"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLang } from "@/components/i18n/LanguageProvider";
import clsx from "clsx";

type NavItem = { href: string; da: string; en: string };

const LINKS: NavItem[] = [
  { href: "/", da: "Intro", en: "Intro" },
  { href: "/cv", da: "CV", en: "CV" },
  { href: "/projects", da: "Projekter", en: "Projects" },
  { href: "/blog", da: "Blog", en: "Blog" },
  { href: "/game", da: "CV spil", en: "CV-Game" },
  { href: "/contact", da: "Kontakt", en: "Contact" },
  { href: "/about", da: "Om mig", en: "About" },
];

export default function Nav() {
  const pathname = usePathname();
  const { lang, toggle } = useLang();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // WOW: Scroll progress (0..1)
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      setProgress(Math.min(Math.max(p, 0), 1));
      setScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Luk mobile menu ved route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const navLink = (item: NavItem) => {
    const active = pathname === item.href;
    return (
      <Link
        key={item.href}
        href={item.href}
        className={clsx(
          "group relative px-3 py-2 rounded-md transition-colors",
          active
            ? "text-white bg-white/10 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
            : "text-white/80 hover:text-white hover:bg-white/10"
        )}
      >
        <span>{lang === "en" ? item.en : item.da}</span>
        {/* WOW: underline glide-in */}
        <span
          className={clsx(
            "pointer-events-none absolute left-3 right-3 -bottom-0.5 h-px rounded",
            active ? "bg-white/80" : "bg-transparent group-hover:bg-white/50"
          )}
          style={{
            transformOrigin: "left",
            transform: active ? "scaleX(1)" : "scaleX(0)",
            transition: "transform .25s ease, background-color .25s ease",
          }}
          aria-hidden
        />
      </Link>
    );
  };

  return (
    <header
      className={clsx(
        "fixed top-0 inset-x-0 z-50 transition-all",
        scrolled
          ? "bg-black/60 backdrop-blur border-b border-white/10 shadow-lg"
          : "bg-transparent"
      )}
    >
      {/*super–slim progress bar */}
      <div
        className="h-[2px] bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 origin-left"
        style={{
          transform: `scaleX(${progress})`,
          transition: "transform 80ms linear",
        }}
      />

      <nav className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
         
         {/* Brand med subtil glow on hover */}
      <Link href="/" className="flex items-center gap-2 group">
        <img
          src="/logo.png"
           alt="EL"
           className="w-10 h-10 rounded-md transition-shadow group-hover:shadow-[0_0_24px_rgba(99,102,241,0.45)]"
        />
      <div className="flex flex-col leading-tight">
        <span className="font-semibold tracking-tight group-hover:opacity-90">
            Elisabeth Lennert
        </span>
       <span className="text-xs text-white/70 group-hover:opacity-90">
         AKA CodeBloodedMama
        </span>
          </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-2">
            {LINKS.map(navLink)}
            <button
              onClick={toggle}
              className="ml-2 px-3 py-2 rounded-md border border-white/20 hover:bg-white/10 text-sm transition-colors"
              aria-label="Toggle language"
              title="Toggle language"
            >
              {lang === "en" ? "DA 🇩🇰" : "EN 🇬🇧"}
            </button>
          </div>

          {/* Mobile toggler */}
          <button
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md hover:bg-white/10"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            <svg
              className={clsx("w-6 h-6 transition-transform", open && "rotate-90")}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              {open ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <>
                  <path d="M3 6h18" />
                  <path d="M3 12h18" />
                  <path d="M3 18h18" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={clsx(
            "md:hidden overflow-hidden transition-[max-height,opacity] duration-300",
            open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="pb-3 pt-1 flex flex-col gap-1">
            {LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "px-3 py-2 rounded-md transition-colors",
                  pathname === item.href
                    ? "bg-white/10 text-white shadow-[0_0_18px_rgba(59,130,246,0.15)]"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                {lang === "en" ? item.en : item.da}
              </Link>
            ))}
            <button
              onClick={toggle}
              className="mt-1 px-3 py-2 rounded-md border border-white/20 hover:bg-white/10 text-left"
            >
              {lang === "en" ? "DA 🇩🇰" : "EN 🇬🇧"}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
