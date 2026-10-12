"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FiMenu, FiX } from "react-icons/fi"
import { AnimatePresence, motion } from "motion/react"

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
  const [scrolled, setScrolled] = useState(false)

  // Apply a subtle solid background when the visitor scrolls past the hero.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close the mobile menu with Escape for keyboard accessibility.
  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [menuOpen])

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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen
          ? "border-b border-white/10 bg-[#030b18]/95 shadow-[0_12px_35px_rgba(0,0,0,0.15)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-[80px] w-full max-w-[1400px] items-center justify-between gap-5 px-6 lg:h-[88px] lg:px-10"
      >
        {/* LOGO AND WORDMARK */}
        <Link
          href={`/${currentLang}`}
          aria-label="GenData Tech — Home"
          onClick={() => setMenuOpen(false)}
          className="flex shrink-0 items-center gap-1"
        >
          <Image
            src="/assets/gendata-tech-mark.webp"
            alt=""
            width={58}
            height={58}
            priority
            unoptimized
            className="h-11 w-11 object-contain sm:h-12 sm:w-12 lg:h-16 lg:w-16"
          />
          <span className="flex flex-col">
            <span
              className="bg-clip-text font-heading text-[21px] font-bold leading-none tracking-[-0.03em] text-transparent"
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
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white transition hover:bg-white/10 xl:hidden"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-controls="gendata-mobile-navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <FiX size={21} /> : <FiMenu size={21} />}
        </button>
      </nav>

      {/* MOBILE NAVIGATION */}
      <AnimatePresence initial={false}>
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.24 }}
          id="gendata-mobile-navigation"
          className="mx-4 mb-4 overflow-hidden rounded-[22px] border border-white/10 bg-[#06152c]/98 p-5 shadow-2xl backdrop-blur-xl xl:hidden sm:mx-6"
        >
          <div className="flex flex-col">
            {NAV_ITEMS.map(({ key, path }) => (
              <Link
                key={key}
                href={localizedHref(path)}
                aria-current={isActive(path) ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
                className={`border-b border-white/[0.07] py-3.5 font-body text-sm font-medium transition ${
                  isActive(path) ? "text-[#58bafc]" : "text-slate-200 hover:text-white"
                }`}
              >
                {navigation[key] || key}
              </Link>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between gap-4">
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
                  className={`rounded-full px-4 py-2 font-body text-[11px] font-semibold ${
                    currentLang === code ? "bg-[#057CFA] text-white" : "text-slate-300"
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
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#057CFA] px-5 py-3.5 font-body text-xs font-semibold text-white transition hover:bg-[#002DCC]"
          >
            {navigation.contact || "Let's Talk"}
          </Link>
        </motion.div>
      )}
      </AnimatePresence>
    </header>
  )
}
