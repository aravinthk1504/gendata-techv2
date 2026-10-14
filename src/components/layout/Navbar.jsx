"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FiMenu, FiX } from "react-icons/fi"

const NAV_ITEMS = [
  { key: "home", path: "" },
  { key: "services", path: "/services" },
  { key: "products", path: "/products" },
  { key: "training", path: "/training" },
  { key: "insights", path: "/blog" },
  { key: "about", path: "/about" },
]

export default function Navbar({ lang = "en", navigation = {} }) {
  const pathname = usePathname() || `/${lang}`
  const currentLang = lang === "de" ? "de" : "en"
  const [menuOpen, setMenuOpen] = useState(false)

  // Keep the menu accessible and prevent the page from scrolling underneath it.
  useEffect(() => {
    if (!menuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false)
    }

    const closeOnResize = () => {
      if (window.innerWidth >= 1280) setMenuOpen(false)
    }

    window.addEventListener("keydown", closeOnEscape)
    window.addEventListener("resize", closeOnResize)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", closeOnEscape)
      window.removeEventListener("resize", closeOnResize)
    }
  }, [menuOpen])

  // Close a previously opened mobile menu when the route changes.
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const localizedHref = (path = "") => `/${currentLang}${path}`

  // Preserve the current page when switching EN <-> DE.
  // Example: /en/about -> /de/about
  const languageHref = (targetLang) => {
    const pathWithoutLang = pathname.replace(/^\/(en|de)(?=\/|$)/, "")
    return `/${targetLang}${pathWithoutLang}`
  }

  const isActive = (path) => {
    const href = localizedHref(path)
    return path === "" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <header
      className="fixed inset-x-0 top-0 z-[100] w-full border-b border-white/10 bg-[#030b18]/95 xl:absolute xl:border-0 xl:bg-transparent"
    >
      <nav
        aria-label="Main navigation"
        className="relative z-[80] mx-auto flex min-h-[76px] w-full max-w-[1400px] items-center justify-between gap-2 px-6 py-4 sm:min-h-[80px] lg:min-h-[88px] lg:px-10"
      >
        {/* LOGO AND WORDMARK */}
        <Link
          href={`/${currentLang}`}
          aria-label="GenData Tech — Home"
          onClick={() => setMenuOpen(false)}
          className="flex min-w-0 items-center gap-1 sm:shrink-0"
        >
          <Image
            src="/assets/gendata-tech-mark.webp"
            alt=""
            width={58}
            height={58}
            priority
            unoptimized
            className="h-10 w-10 shrink-0 object-contain sm:h-12 sm:w-12 lg:h-16 lg:w-16"
          />
          <span className="hidden min-w-0 flex-col sm:flex">
            <span
              className="whitespace-nowrap bg-clip-text font-heading text-[21px] font-bold leading-none tracking-[-0.03em] text-transparent"
              style={{
                backgroundImage: "linear-gradient(90deg, #003DB8 0%, #002DCC 45%, #057CFA 75%, #18BDF2 100%)",
              }}
            >
              GenData Tech
            </span>
            <span className="mt-1 font-body text-[10px] font-medium tracking-[0.05em] text-[#057CFA]">
              Think - Build - Evolve
            </span>
          </span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden items-center gap-8 xl:flex">
          {NAV_ITEMS.map(({ key, path }) => (
            <Link
              key={key}
              href={localizedHref(path)}
              aria-current={isActive(path) ? "page" : undefined}
              className={`font-body text-sm font-medium transition-colors duration-300 ${
                isActive(path) ? "text-white" : "text-slate-300 hover:text-white"
              }`}
            >
              {navigation[key] || key}
            </Link>
          ))}
        </div>

        {/* DESKTOP LANGUAGE + CTA */}
        <div className="hidden shrink-0 items-center gap-3 xl:flex">
          <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1" aria-label="Choose website language">
            {[
              { code: "en", label: "EN", accessible: "Switch to English" },
              { code: "de", label: "DE", accessible: "Zur deutschen Version wechseln" },
            ].map(({ code, label, accessible }) => (
              <Link
                key={code}
                href={languageHref(code)}
                hrefLang={code}
                aria-label={accessible}
                aria-current={currentLang === code ? "true" : undefined}
                className={`rounded-full px-3 py-1.5 font-body text-[11px] font-semibold transition-colors ${
                  currentLang === code
                    ? "bg-[#057CFA] text-white"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          <Link
            href={localizedHref("/contact")}
            className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-6 py-3 font-body text-sm font-semibold text-white backdrop-blur-md transition duration-300 hover:border-[#057CFA] hover:bg-[#057CFA]"
          >
            {navigation.contact || "Let's Talk"}
          </Link>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          type="button"
          className="relative z-[90] inline-flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-full border border-white/20 bg-[#06152c]/85 text-white transition hover:bg-[#002DCC] focus-visible:ring-2 focus-visible:ring-[#057CFA] xl:hidden"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-controls="gendata-mobile-navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <FiX size={21} /> : <FiMenu size={21} />}
        </button>
      </nav>

      {/* Mobile navigation overlay: viewport anchored, never clipped by the hero. */}
      {menuOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[60] bg-[#030b18]/80 xl:hidden"
            aria-label={currentLang === "de" ? "Menü schließen" : "Close menu"}
            onClick={() => setMenuOpen(false)}
          />

          <div
            id="gendata-mobile-navigation"
            role="region"
            aria-label={currentLang === "de" ? "Mobiles Menü" : "Mobile navigation"}
            className="gd-mobile-menu fixed inset-x-3 top-[76px] z-[70] max-h-[calc(100dvh-88px)] overflow-y-auto overscroll-contain rounded-2xl border border-white/15 bg-[#06152c] p-5 shadow-[0_24px_64px_rgba(0,0,0,0.45)] xl:hidden sm:inset-x-6 sm:top-[85px]"
          >
            <div className="mb-5 flex items-center gap-3 border-b border-white/10 pb-5">
              <Image
                src="/assets/gendata-tech-mark.webp"
                alt="GenData Tech"
                width={48}
                height={48}
                unoptimized
                className="h-12 w-12 shrink-0 object-contain"
              />
              <div className="min-w-0">
                <p
                  className="bg-clip-text font-heading text-lg font-bold leading-tight tracking-[-0.03em] text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #003DB8 0%, #002DCC 45%, #057CFA 75%, #18BDF2 100%)",
                  }}
                >
                  GenData Tech
                </p>
                <p className="mt-1 font-body text-[9px] font-medium tracking-[0.05em] text-[#057CFA]">
                  Think - Build - Evolve
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              {NAV_ITEMS.map(({ key, path }) => (
                <Link
                  key={key}
                  href={localizedHref(path)}
                  aria-current={isActive(path) ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className={`flex min-h-12 items-center border-b border-white/10 py-3 font-body text-sm font-medium transition-colors ${
                    isActive(path) ? "text-[#58bafc]" : "text-slate-200 hover:text-white"
                  }`}
                >
                  {navigation[key] || key}
                </Link>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                {currentLang === "de" ? "Sprache" : "Language"}
              </span>
              <div className="flex gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1">
                {[
                  { code: "en", label: "EN" },
                  { code: "de", label: "DE" },
                ].map(({ code, label }) => (
                  <Link
                    key={code}
                    href={languageHref(code)}
                    hrefLang={code}
                    aria-label={code === "en" ? "Switch to English" : "Zur deutschen Version wechseln"}
                    aria-current={currentLang === code ? "true" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={`rounded-full px-4 py-2 font-body text-xs font-semibold ${
                      currentLang === code ? "bg-[#057CFA] text-white" : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href={localizedHref("/contact")}
              onClick={() => setMenuOpen(false)}
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#057CFA] px-5 py-3 font-body text-sm font-semibold text-white transition hover:bg-[#002DCC]"
            >
              {navigation.contact || "Let's Talk"}
            </Link>
          </div>
        </>
      )}
    </header>
  )
}
