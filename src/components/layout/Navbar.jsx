"use client"

import { useEffect, useRef } from "react"
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
  const mobileMenuRef = useRef(null)

  // Reset the native mobile disclosure after route changes.
  useEffect(() => {
    if (mobileMenuRef.current) mobileMenuRef.current.open = false
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
      className="sticky inset-x-0 top-0 z-[100] w-full border-b border-white/10 bg-[#030b18]/95 xl:absolute xl:border-0 xl:bg-transparent"
    >
      <nav
        aria-label="Main navigation"
        className="relative z-[80] mx-auto flex min-h-[76px] w-full max-w-[1400px] items-center justify-between gap-2 px-6 py-4 sm:min-h-[80px] lg:min-h-[88px] lg:px-10"
      >
        {/* LOGO AND WORDMARK */}
        <Link
          href={`/${currentLang}`}
          aria-label="GenData Tech — Home"
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

        {/* Native disclosure works on touch screens even before JS hydration. */}
        <details ref={mobileMenuRef} className="group xl:hidden">
          <summary
            className="relative z-[90] flex h-11 w-11 cursor-pointer touch-manipulation list-none items-center justify-center rounded-full border border-white/20 bg-[#06152c]/85 text-white transition hover:bg-[#002DCC] focus-visible:outline-2 focus-visible:outline-[#057CFA] [&::-webkit-details-marker]:hidden"
            aria-label={currentLang === "de" ? "Navigationsmenü" : "Navigation menu"}
          >
            <FiMenu size={21} className="group-open:hidden" aria-hidden="true" />
            <FiX size={21} className="hidden group-open:block" aria-hidden="true" />
          </summary>

          <div
            id="gendata-mobile-navigation"
            aria-label={currentLang === "de" ? "Mobiles Menü" : "Mobile navigation"}
            className="gd-mobile-menu absolute inset-x-3 top-full z-[95] max-h-[calc(100dvh-90px)] overflow-y-auto overscroll-contain rounded-2xl border border-white/15 bg-[#06152c] p-5 shadow-[0_24px_64px_rgba(0,0,0,0.45)] sm:inset-x-6"
          >
            <div className="mb-5 flex items-center gap-3 border-b border-white/10 pb-5">
              <Image
                src="/assets/gendata-tech-mark.webp"
                alt=""
                width={48}
                height={48}
                unoptimized
                className="h-12 w-12 shrink-0 object-contain"
              />
              <div className="min-w-0">
                <p
                  className="bg-clip-text font-heading text-lg font-bold leading-tight tracking-[-0.03em] text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(90deg, #003DB8 0%, #002DCC 45%, #057CFA 75%, #18BDF2 100%)",
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
                  onClick={() => {
                    if (mobileMenuRef.current) mobileMenuRef.current.open = false
                  }}
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
                    onClick={() => {
                      if (mobileMenuRef.current) mobileMenuRef.current.open = false
                    }}
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
              onClick={() => {
                if (mobileMenuRef.current) mobileMenuRef.current.open = false
              }}
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#057CFA] px-5 py-3 font-body text-sm font-semibold text-white transition hover:bg-[#002DCC]"
            >
              {navigation.contact || "Let's Talk"}
            </Link>
          </div>
        </details>
      </nav>
    </header>
  )
}
