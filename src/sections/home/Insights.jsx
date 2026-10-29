"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { homeText, localizedHref } from "../../lib/homeText";
import BlogCard from "../../components/blog/BlogCard";
function Insights({ content, lang, posts = [] }) {
  const latestPosts = posts.slice(0, 6);
  const count = latestPosts.length;
  const t = (key, variables) => homeText(content, key, variables);
  const localizedPath = (path) => localizedHref(lang, path);
  const viewportRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const labels = lang === "de"
    ? { previous: "Vorheriger Beitrag", next: "Nächster Beitrag", goTo: "Zum Beitrag", region: "Aktuelle Blogbeiträge" }
    : { previous: "Previous article", next: "Next article", goTo: "Go to article", region: "Latest blog insights" };

  const moveTo = useCallback((index, smooth = true) => {
    const viewport = viewportRef.current;
    if (!count) return;
    const bounded = (index + count) % count;
    const slide = viewport?.querySelectorAll("[data-insight-slide]")[bounded];
    if (!slide || !viewport) return;
    setActiveIndex(bounded);
    viewport.scrollTo({
      left: slide.offsetLeft - slide.parentElement.offsetLeft,
      behavior: smooth && !reduceMotion ? "smooth" : "instant",
    });
  }, [reduceMotion]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener?.("change", sync);
    return () => media.removeEventListener?.("change", sync);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion || count < 2) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) moveTo(activeIndex + 1);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [paused, reduceMotion, activeIndex, moveTo]);

  const syncActive = () => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const slides = viewport.querySelectorAll("[data-insight-slide]");
    let nearest = 0;
    let distance = Infinity;
    slides.forEach((slide, index) => {
      const diff = Math.abs(slide.offsetLeft - slide.parentElement.offsetLeft - viewport.scrollLeft);
      if (diff < distance) { distance = diff; nearest = index; }
    });
    setActiveIndex(nearest);
  };

  return (
    <section className="relative overflow-hidden bg-white px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-100 w-200 -translate-x-1/2 rounded-full bg-blue-50 blur-[150px]" />
      <div className="relative mx-auto max-w-350">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <motion.p
              initial={{ opacity: 1, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-body text-[12px] font-semibold uppercase tracking-[0.28em] text-brand-primary"
            >
              {t("insights.eyebrow")}
            </motion.p>

            <motion.h2
              initial={{ opacity: 1, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="mt-5 max-w-4xl font-heading text-4xl font-semibold leading-[1.1] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-5xl"
            >
              {t("insights.titleLine1")}
              <span className="block text-slate-400">
                {t("insights.titleLine2")}
              </span>
            </motion.h2>
          </div>

          <div className="lg:col-span-4 lg:justify-self-end">
            <motion.p
              initial={{ opacity: 1, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-md font-body text-sm leading-7 text-slate-500 lg:text-base"
            >
              {t("insights.description")}
            </motion.p>

            <Link
              href={localizedPath("/blog")}
              className="group mt-6 inline-flex items-center gap-3 font-body text-xs font-semibold text-brand-primary"
            >
              {t("insights.viewAll")}
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>

        <div
          className="relative z-10 mx-auto mt-14 w-full max-w-[824px] sm:mt-16 lg:mt-18"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
          }}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          <div
            ref={viewportRef}
            role="region"
            aria-roledescription="carousel"
            aria-label={labels.region}
            onScroll={syncActive}
            className="relative overflow-x-auto overscroll-x-contain snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-x pan-y" }}
          >
            <div className="flex items-stretch gap-6">
              {latestPosts.map((post, index) => (
                <div
                  id={`insight-slide-${index + 1}`}
                  key={post.id}
                  data-insight-slide
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} / ${count}`}
                  className="w-full min-w-0 shrink-0 snap-start scroll-mt-24 md:w-[calc((100%-1.5rem)/2)]"
                >
                  <BlogCard post={post} index={index} lang={lang} compact />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 flex items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1" aria-label={labels.region}>
              {latestPosts.map((post, index) => (
                <a
                  key={post.id}
                  href={`#insight-slide-${index + 1}`}
                  onClick={(event) => {
                    event.preventDefault();
                    moveTo(index);
                  }}
                  aria-label={`${labels.goTo} ${index + 1}`}
                  aria-current={activeIndex === index ? "true" : undefined}
                  className="group relative z-10 flex h-11 w-7 touch-manipulation items-center justify-center"
                >
                  <span className={`block h-1.5 rounded-full transition-all duration-300 ${activeIndex === index ? "w-6 bg-brand-primary" : "w-1.5 bg-slate-300 group-hover:bg-brand-accent"}`} />
                </a>
              ))}
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button type="button" onClick={() => moveTo(activeIndex - 1)} aria-label={labels.previous}
                className="relative z-10 flex h-11 w-11 touch-manipulation items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900">
                <FiChevronLeft aria-hidden="true" />
              </button>
              <button type="button" onClick={() => moveTo(activeIndex + 1)} aria-label={labels.next}
                className="relative z-10 flex h-11 w-11 touch-manipulation items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900">
                <FiChevronRight aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Insights;
