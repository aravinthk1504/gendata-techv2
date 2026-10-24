"use client"

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import Link from "next/link";
import { homeText, localizedHref } from "../../lib/homeText";



import AnimatedBackground from "./AnimatedBackground";
import GlassArchitecture from "./GlassArchitecture";

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
      className="relative flex min-h-[calc(100svh-72px)] items-start overflow-hidden sm:min-h-[calc(100svh-72px)] lg:min-h-[calc(100svh-88px)] lg:items-center"
    >
      <AnimatedBackground />

      <div className="relative z-10 mx-auto w-full max-w-350 px-6 pb-16 pt-20 sm:pb-16 sm:pt-24 lg:px-10 lg:pb-10 lg:pt-16">
        <div className="relative isolate grid min-w-0 items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
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
              {t("hero.eyebrow")}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 1, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.08 }}
            className="max-w-3xl font-heading text-[clamp(2.25rem,8.8vw,3.5rem)] font-semibold leading-[1.07] tracking-[-0.045em] text-white sm:text-6xl lg:text-[clamp(3rem,4.5vw,4.25rem)]"
          >
            {t("hero.titleLine1")}
            <span className="block bg-linear-to-r from-white via-blue-100 to-brand-accent bg-clip-text text-transparent">
              {t("hero.titleLine2")}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 1, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18 }}
            className="mt-6 max-w-xl font-body text-sm leading-7 text-slate-200 sm:text-base sm:leading-8"
          >
            {t("hero.description")}
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
              {t("hero.primaryCta")}
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

          {/* Glass architecture on desktop, softly positioned behind content on small screens. */}
          <div className="pointer-events-none absolute inset-x-[-8%] top-[90px] z-0 opacity-35 sm:inset-x-[2%] sm:top-[80px] sm:opacity-45 lg:relative lg:inset-auto lg:z-auto lg:w-full lg:opacity-100">
            <GlassArchitecture />
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-[#030b18]/95 via-[#030b18]/80 to-[#030b18]/35 lg:hidden" />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="relative z-20 mt-5 hidden lg:block"
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
