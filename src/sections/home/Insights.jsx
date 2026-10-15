"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { homeText, localizedHref } from "../../lib/homeText";
import BlogCard from "../../components/blog/BlogCard";
import { blogPosts } from "../../data/blogData";

// Show six real cards; native scroll-snap and direct indexing keep mobile
// arrow and indicator navigation predictable.
const latestPosts = blogPosts.slice(0, 6);
const count = latestPosts.length;

function Insights({ content, lang }) {
  const t = (key, variables) => homeText(content, key, variables);
  const localizedPath = (path) => localizedHref(lang, path);

  const viewportRef = useRef(null);
  const activeRef = useRef(0);
  const settleRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const labels = lang === "de"
    ? { previous: "Vorheriger Beitrag", next: "Nächster Beitrag", goTo: "Zum Beitrag", region: "Aktuelle Blogbeiträge" }
    : { previous: "Previous article", next: "Next article", goTo: "Go to article", region: "Latest blog insights" };

  const getStep = () => {
    const viewport = viewportRef.current;
    if (!viewport) return 0;
    const card = viewport.querySelector("[data-insight-slide]");
    if (!card) return 0;
    const gap = Number.parseFloat(window.getComputedStyle(card.parentElement).gap) || 24;
    return card.getBoundingClientRect().width + gap;
  };

  const goTo = useCallback((index, smooth = true) => {
    const viewport = viewportRef.current;
    if (!viewport || !count) return;
    const bounded = ((index % count) + count) % count;
    const card = viewport.querySelectorAll("[data-insight-slide]")[bounded];
    if (!card) return;
    activeRef.current = bounded;
    setActiveIndex(bounded);
    const offset = card.getBoundingClientRect().left - viewport.getBoundingClientRect().left + viewport.scrollLeft;
    viewport.scrollTo({ left: offset, behavior: smooth && !reduceMotion ? "smooth" : "instant" });
  }, [reduceMotion]);

  const move = useCallback((direction) => {
    const next = (activeRef.current + direction + count) % count;
    goTo(next, next !== 0 && next !== count - 1);
  }, [goTo]);

  const onScroll = () => {
    if (settleRef.current) window.clearTimeout(settleRef.current);
    settleRef.current = window.setTimeout(() => {
      const viewport = viewportRef.current;
      const step = getStep();
      if (!viewport || step <= 0) return;
      const current = Math.min(count - 1, Math.max(0, Math.round(viewport.scrollLeft / step)));
      activeRef.current = current;
      setActiveIndex(current);
    }, 250);
  };

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const setPreference = () => setReduceMotion(media.matches);
    const observer = typeof IntersectionObserver !== "undefined"
      ? new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.1 })
      : null;
    if (viewportRef.current) observer?.observe(viewportRef.current);
    if (!observer) setVisible(true);
    setPreference();
    media.addEventListener?.("change", setPreference);
    const align = () => goTo(activeRef.current, false);
    window.addEventListener("resize", align);
    return () => {
      observer?.disconnect();
      media.removeEventListener?.("change", setPreference);
      window.removeEventListener("resize", align);
      if (settleRef.current) window.clearTimeout(settleRef.current);
    };
  }, [goTo]);

  useEffect(() => {
    if (hovered || focused || !visible || reduceMotion || count < 2) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) move(1);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [hovered, focused, visible, reduceMotion, move]);

  return (
    <section className="relative overflow-hidden bg-white px-6 py-28 lg:px-10 lg:py-36">
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
              className="mt-5 max-w-4xl font-heading text-4xl font-semibold leading-[1.1] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl"
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
          className="mx-auto mt-14 w-full max-w-[824px] sm:mt-16 lg:mt-18"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocusCapture={(event) => {
            if (event.target.matches(":focus-visible")) setFocused(true);
          }}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
          }}
        >
          <div
            ref={viewportRef}
            role="region"
            aria-roledescription="carousel"
            aria-label={labels.region}
            onScroll={onScroll}
            className="overflow-x-auto overscroll-x-contain snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="relative flex items-stretch gap-6">
              {latestPosts.map((post, index) => (
                <div
                  key={post.id}
                  data-insight-slide
                  role="group"
                  aria-roledescription="slide"
                  aria-label={String(index + 1) + " / " + String(count)}
                  className="min-w-0 w-full shrink-0 snap-start md:w-[calc((100%-1.5rem)/2)]"
                >
                  <BlogCard post={post} index={index} lang={lang} compact />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1" aria-label={labels.region}>
              {latestPosts.map((post, index) => (
                <button
                  key={post.id}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={labels.goTo + " " + String(index + 1)}
                  aria-current={activeIndex === index ? "true" : undefined}
                  className="group flex h-10 w-6 items-center justify-center"
                >
                  <span
                    className={"block h-1.5 rounded-full transition-all duration-300 " + (
                      activeIndex === index
                        ? "w-6 bg-brand-primary"
                        : "w-1.5 bg-slate-300 group-hover:bg-brand-accent"
                    )}
                  />
                </button>
              ))}
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => move(-1)}
                aria-label={labels.previous}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 transition hover:border-brand-accent hover:text-brand-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
              >
                <FiChevronLeft aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => move(1)}
                aria-label={labels.next}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 transition hover:border-brand-accent hover:text-brand-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
              >
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
