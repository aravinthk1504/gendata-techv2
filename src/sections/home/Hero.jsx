"use client"

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import Link from "next/link";
import { homeText, localizedHref } from "../../lib/homeText";



import AnimatedBackground from "./AnimatedBackground";
import InfinityVisual from "./InfinityVisual";

function Hero({ content, lang }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "-10% 0px -10% 0px" });
  const reduceMotion = useReducedMotion();
  const shouldAnimate = isInView && !reduceMotion;
  const t = (key, variables) => homeText(content, key, variables);
  const localizedPath = (path) => localizedHref(lang, path);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[calc(94svh+30px)] items-start overflow-hidden sm:min-h-[94svh] lg:min-h-[88svh] lg:items-center"
    >
      <AnimatedBackground />

      <div className="relative z-10 mx-auto w-full max-w-350 px-6 pb-[78px] pt-28 sm:pb-16 sm:pt-36 lg:px-10 lg:pb-16 lg:pt-28">
        <div className="relative isolate grid min-w-0 items-center gap-8 lg:grid-cols-[0.98fr_1.02fr] lg:gap-6">
          {/* Keep mobile hero copy above the decorative infinity background. */}
          <div className="relative z-20 min-w-0 text-left">
          <motion.div
            initial={{ opacity: 1, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/4 px-4 py-2 backdrop-blur-md sm:mb-7"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-accent" />
            </span>

            <span className="font-body text-[12px] font-semibold uppercase tracking-[0.24em] text-blue-100">
              {lang === "en" ? "AI-Powered Solutions" : t("hero.eyebrow")}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 1, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.08 }}
            className="max-w-3xl font-heading text-[clamp(2.25rem,8.8vw,3.5rem)] font-semibold leading-[1.07] tracking-[-0.045em] text-white sm:text-6xl lg:text-[clamp(2.75rem,4.25vw,4.25rem)]"
          >
            {lang === "en" ? "Innovating with" : t("hero.titleLine1")}
            <span className="block bg-linear-to-r from-white via-blue-100 to-brand-accent bg-clip-text text-transparent">
              {lang === "en" ? "cutting-edge technology." : t("hero.titleLine2")}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 1, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18 }}
            className="mt-6 max-w-2xl font-body text-sm leading-7 text-slate-200 sm:text-base sm:leading-8"
          >
            {lang === "en" ? "GenData Tech combines artificial intelligence, software engineering, web, mobile and IoT technologies to build practical digital systems around real business requirements." : t("hero.description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28 }}
            className="mt-8 flex flex-wrap items-center justify-start gap-3 sm:gap-4"
          >
            <Link
              href={localizedPath("/services")}
              className="gd-hero-button gd-hero-button--primary group min-w-55"
            >
              {lang === "en" ? "Explore Our Services" : t("hero.primaryCta")}
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            <Link
              href={localizedPath("/contact")}
              className="gd-hero-button gd-hero-button--secondary min-w-40"
            >
              {t("hero.secondaryCta")}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.55 }}
            className="mt-9 flex max-w-xl flex-wrap items-center justify-start gap-x-5 gap-y-3 border-t border-white/8 pt-5 sm:mt-10"
          >
            {t("hero.tags", { returnObjects: true }).map(
              (item, index) => (
                <div key={item} className="flex items-center gap-3">
                  {index !== 0 && (
                    <span className="hidden h-1 w-1 rounded-full bg-brand-accent sm:block" />
                  )}
                  <span className="font-body text-[11px] font-medium uppercase tracking-[0.18em] text-slate-200">
                    {item}
                  </span>
                </div>
              ),
            )}
          </motion.div>
          </div>

          {/* Independent visual layers preserve the responsive layout and working CTAs. */}
          <div className="pointer-events-none relative z-0 hidden min-h-[500px] w-full items-center justify-center lg:flex">
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(4,115,255,.28),transparent_68%)]" />
            <div className="absolute inset-x-[-5%] top-[16%] opacity-90">
              <InfinityVisual />
            </div>
            <div className="absolute inset-x-0 inset-y-[10%] rounded-full border border-[#057CFA]/15" />
            <div className="absolute inset-x-[8%] inset-y-[18%] rounded-full border border-[#057CFA]/10" />

            {/* Keep the portrait as its own asset, not a flattened screenshot. */}
            <img
              src="/images/home-hero-portrait.webp"
              alt="GenData Tech founder"
              className="absolute bottom-[-60px] left-1/2 z-10 h-[min(650px,75svh)] w-auto max-w-none -translate-x-1/2 object-contain object-bottom drop-shadow-[0_0_48px_rgba(3,105,255,.26)]"
            />

            <div className="absolute left-[-2%] top-[15%] z-20 rounded-2xl border border-sky-400/50 bg-[#08264b]/85 p-4 shadow-[0_0_26px_rgba(5,124,250,.22)] backdrop-blur-md">
              <p className="text-sm font-semibold text-white">✧ AI Solutions</p>
              <p className="mt-1 text-xs text-blue-100">From idea to real impact</p>
            </div>
            <div className="absolute right-[-2%] top-[15%] z-20 rounded-2xl border border-sky-400/50 bg-[#08264b]/85 p-4 shadow-[0_0_26px_rgba(5,124,250,.22)] backdrop-blur-md">
              <p className="text-sm font-semibold text-white">◎ Real Business Problems</p>
              <p className="mt-1 text-xs text-blue-100">Practical Solutions</p>
            </div>
            <div className="absolute bottom-[13%] right-[-2%] z-20 rounded-2xl border border-sky-400/50 bg-[#08264b]/85 p-4 shadow-[0_0_26px_rgba(5,124,250,.22)] backdrop-blur-md">
              <p className="text-sm font-semibold text-white">⚙ Innovate</p>
              <p className="text-xs text-blue-100">Build · Evolve</p>
            </div>
          </div>

          {/* On narrow screens the portrait sits underneath the copy, with a contrast wash. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[100px] z-0 h-[450px] lg:hidden">
            <div className="absolute inset-0 opacity-55"><InfinityVisual /></div>
            <img
              src="/images/home-hero-portrait.webp"
              alt=""
              className="absolute -right-12 bottom-0 h-[390px] w-auto max-w-none object-contain object-bottom opacity-40 sm:right-0 sm:h-[450px]"
            />
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-[#030b18]/95 via-[#030b18]/80 to-[#030b18]/45 lg:hidden" />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="relative z-20 mt-7 hidden md:block"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="font-body text-[9px] uppercase tracking-[0.3em] text-slate-200">
              {t("hero.scroll")}
            </span>

            <div className="relative h-10 w-px overflow-hidden bg-white/10">
              <motion.span
                animate={shouldAnimate ? { y: [-15, 36] } : { y: -15 }}
                transition={{
                  duration: 1.8,
                  repeat: shouldAnimate ? Infinity : 0,
                  ease: "easeInOut",
                }}
                className="absolute left-0 top-0 h-4 w-px bg-brand-accent"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
