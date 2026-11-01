"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Illustrated, interactive website preview for the Web Development hero.
 * Deliberately does not represent a real client project.
 */
export default function WebResponsiveHero({ active = true, lang = "en" }) {
  const [view, setView] = useState("desktop");
  const prefersReducedMotion = useReducedMotion();
  const motionOn = active && !prefersReducedMotion;
  const isMobile = view === "mobile";
  const german = lang === "de";
  const duration = prefersReducedMotion ? 0 : 0.55;

  return (
    <div className="relative mx-auto w-full max-w-[470px] min-w-0">
      <div className="mb-3 flex items-center justify-center gap-2" role="group" aria-label={german ? "Vorschaugerät wählen" : "Choose preview device"}>
        {[
          { id: "desktop", label: "Desktop" },
          { id: "mobile", label: german ? "Mobil" : "Mobile" },
        ].map(({ id, label }) => (
          <button
            key={id}
            type="button"
            aria-pressed={view === id}
            onClick={() => setView(id)}
            className={`rounded-lg border px-4 py-2 font-body text-[11px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 ${view === id ? "border-[#057CFA] bg-[#057CFA] text-white" : "border-[#35516b] bg-[#10263c] text-slate-300 hover:border-cyan-400 hover:text-white"}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div
        className="relative mx-auto h-[285px] w-full max-w-[470px] overflow-hidden sm:h-[315px]"
        role="img"
        aria-label={german ? "Beispiel einer responsiven Website für Desktop und Smartphone" : "Illustrative responsive website shown on desktop and smartphone"}
      >
        {/* Desktop browser; remains in the background when the mobile preview is selected. */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{
            opacity: isMobile ? 0.28 : 1,
            scale: isMobile ? 0.86 : 1,
            x: isMobile ? "-11%" : "0%",
            y: 0,
          }}
          transition={{ duration, ease: "easeInOut" }}
          className="absolute left-[3%] top-5 w-[86%] max-w-[385px] origin-center overflow-hidden rounded-[10px] border border-[#3d708f] bg-[#f7f9fd] shadow-[0_23px_55px_rgba(0,0,0,0.45)]"
        >
          <div className="flex h-[25px] items-center gap-1 bg-[#112842] px-3">
            {[0, 1, 2].map((n) => <span key={n} className="h-[5px] w-[5px] rounded-full bg-[#65839e]" />)}
            <span className="mx-auto pr-4 font-body text-[8px] text-[#b2cee2]">{german ? "Beispiel-Website" : "website concept preview"}</span>
          </div>
          <div className="min-h-[214px] bg-[#f7f9fd] text-[#162c48]">
            <div className="flex items-center justify-between border-b border-[#e3ebf3] px-3 py-3">
              <span className="font-heading text-xs font-bold">studio<span className="text-[#057cfa]">.</span></span>
              <span className="font-body text-[8px] text-[#657c94]">{german ? "Arbeit  ·  Über uns  ·  Kontakt" : "Work  ·  About  ·  Contact"}</span>
            </div>
            <div className="grid grid-cols-[1.1fr_0.9fr] items-center gap-3 px-3 py-4">
              <div>
                <p className="font-heading text-[clamp(11px,3vw,19px)] font-bold leading-tight tracking-tight">{german ? "Ein besseres digitales Erlebnis." : "A better digital experience."}</p>
                <p className="mt-2 font-body text-[8px] leading-relaxed text-[#71849a]">{german ? "Klares Design für moderne Unternehmen." : "Thoughtful design for modern businesses."}</p>
                <span className="mt-3 inline-block rounded bg-[#057cfa] px-2.5 py-1.5 font-body text-[8px] font-medium text-white">{german ? "Entdecken" : "Explore more"} →</span>
              </div>
              <div className="relative h-[104px] overflow-hidden rounded-md bg-gradient-to-br from-[#bfe5fb] via-[#4b97d1] to-[#142f67]">
                <motion.div
                  animate={motionOn ? { opacity: [0.12, 0.42, 0.12] } : { opacity: 0.22 }}
                  transition={{ duration: 4.5, repeat: motionOn ? Infinity : 0, ease: "easeInOut" }}
                  className="absolute -right-5 -top-7 h-28 w-28 rounded-full bg-white blur-[28px]"
                />
                <div className="absolute left-1/3 top-3 h-[140px] w-[90px] rotate-[35deg] rounded-full border border-white/70 shadow-[0_0_0_18px_rgba(255,255,255,0.08),0_0_0_36px_rgba(255,255,255,0.05)]" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 px-3 pb-4">
              {["Design", "Performance", "Experience"].map((item) => (
                <div key={item} className="rounded-md border border-[#e2eaf3] bg-white p-2">
                  <div className="mb-2 h-3 w-3 rounded bg-[#dfedff]" />
                  <p className="font-body text-[8px] font-semibold">{item}</p>
                  <div className="mt-2 h-[3px] w-3/4 rounded-full bg-[#e0e9f1]" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* The same website in its narrow-screen layout. */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            scale: isMobile ? 1 : 0.72,
            x: "-50%",
            y: 0,
          }}
          transition={{ duration, ease: "easeInOut" }}
          style={{ width: 138, height: 260, left: isMobile ? "50%" : "79%", transformOrigin: "center bottom" }}
          className="absolute bottom-2 z-10 overflow-hidden rounded-[18px] border-[4px] border-[#162e4b] bg-[#f8fafd] shadow-[0_17px_34px_rgba(0,0,0,0.5)] sm:bottom-3"
        >
          <div className="mx-auto mt-[3px] h-[4px] w-5 rounded-full bg-[#19344d]" />
          <div className="flex items-center justify-between px-2 pb-1 pt-3 text-[#1b3550]">
            <span className={`font-heading font-bold ${isMobile ? "text-[11px]" : "text-[9px]"}`}>studio<span className="text-[#057cfa]">.</span></span>
            <span className="text-[11px]" aria-hidden="true">☰</span>
          </div>
          <div className="px-2.5 pt-1">
            <p className={`font-heading font-extrabold leading-tight text-[#19334e] ${isMobile ? "text-[17px]" : "text-[12px]"}`}>{german ? "Digital. Besser." : "A better digital experience."}</p>
            <div className={`relative mt-2 overflow-hidden rounded bg-gradient-to-br from-[#bfe5fb] via-[#2478c5] to-[#163a73] ${isMobile ? "h-[78px]" : "h-[48px]"}`}>
              <div className="absolute left-1/4 top-2 h-[70px] w-[65px] rotate-[34deg] rounded-full border border-white/70" />
            </div>
            <div className="mt-2 flex gap-1">
              {[0, 1, 2].map((n) => <div key={n} className={`flex-1 rounded border border-[#e1e9f0] bg-[#eaf2fa] ${isMobile ? "h-7" : "h-5"}`} />)}
            </div>
          </div>
        </motion.div>
      </div>
      <p className="mt-2 text-center font-body text-[10px] font-semibold uppercase tracking-[0.14em] text-[#86b4d4]">
        {german ? "Ein Design. Jeder Bildschirm." : "One design. Every screen."}
      </p>
      <p className="mt-1 text-center font-body text-[9px] text-slate-500">{german ? "Illustratives Website-Konzept" : "Illustrative website concept"}</p>
    </div>
  );
}
