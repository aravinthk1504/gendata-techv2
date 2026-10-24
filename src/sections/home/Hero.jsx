"use client";

import Link from "next/link";
import { homeText, localizedHref } from "../../lib/homeText";
import AnimatedBackground from "./AnimatedBackground";
import NeuralBackground from "./NeuralBackground";

export default function Hero({ content, lang }) {
  const t = (key, variables) => homeText(content, key, variables);
  const localizedPath = (path) => localizedHref(lang, path);
  const tags = t("hero.tags", { returnObjects: true });

  return (
    <section className="relative flex min-h-[calc(100svh-8px)] items-center overflow-hidden bg-[#030b18] px-6 pb-24 pt-14 sm:pb-24 sm:pt-16 lg:px-10">
      <AnimatedBackground />
      <NeuralBackground />
      <div className="relative z-10 mx-auto flex w-full max-w-[1100px] flex-col items-center text-center">
        <div className="mb-7 inline-flex items-center justify-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
          <span className="h-2 w-2 rounded-full bg-brand-accent" />
          <span className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-100 sm:text-xs">
            {t("hero.eyebrow")}
          </span>
        </div>

        <h1 className="max-w-[960px] font-heading text-[clamp(2.25rem,8vw,4.5rem)] font-semibold leading-[1.09] tracking-[-0.045em] text-white">
          {t("hero.titleLine1")}
          <span className="block bg-gradient-to-r from-white via-blue-100 to-[#057CFA] bg-clip-text text-transparent">
            {t("hero.titleLine2")}
          </span>
        </h1>

        <p className="mt-6 max-w-[720px] font-body text-sm leading-7 text-slate-200 sm:text-base sm:leading-8">
          {t("hero.description")}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Link href={localizedPath("/services")} className="gd-hero-button gd-hero-button--primary group min-w-55">
            {t("hero.primaryCta")}
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
          <Link href={localizedPath("/contact")} className="gd-hero-button gd-hero-button--secondary min-w-40">
            {t("hero.secondaryCta")}
          </Link>
        </div>

        {Array.isArray(tags) && (
          <div className="mt-10 flex max-w-[900px] flex-wrap items-center justify-center gap-x-5 gap-y-3 border-t border-white/10 pt-6">
            {tags.map((item, index) => (
              <span key={item} className="inline-flex items-center gap-3">
                {index !== 0 && <span className="h-1 w-1 rounded-full bg-brand-accent" />}
                <span className="font-body text-[10px] font-medium uppercase tracking-[0.16em] text-slate-200 sm:text-[11px]">{item}</span>
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="pointer-events-none absolute bottom-5 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
        <span className="font-body text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-300">{t("hero.scroll")}</span>
        <span className="relative h-8 w-px overflow-hidden bg-white/15"><span className="absolute inset-x-0 top-0 h-3 bg-[#19B9FF] motion-safe:animate-pulse" /></span>
      </div>
    </section>
  );
}
