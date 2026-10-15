"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { homeText, localizedHref } from "../../lib/homeText";
import BlogCard from "../../components/blog/BlogCard";
import { blogPosts } from "../../data/blogData";

// Six newest blog posts, maintained newest-first in blogData.js.
const latestPosts = blogPosts.slice(0, 6);
const count = latestPosts.length;

function Insights({ content, lang }) {
  const t = (key, variables) => homeText(content, key, variables);
  const localizedPath = (path) => localizedHref(lang, path);

  // Directly switch React-rendered posts. No scrollTo, scroll snapping,
  // CSS transforms based on measured widths, or phone-specific offsets.
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touching, setTouching] = useState(false);
  const [inView, setInView] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const slideAreaRef = useRef(null);
  const touchStartRef = useRef(null);

  const labels = lang === "de"
    ? {
        previous: "Vorheriger Beitrag",
        next: "Nächster Beitrag",
        goTo: "Zum Beitrag",
        region: "Aktuelle Blogbeiträge",
      }
    : {
        previous: "Previous article",
        next: "Next article",
        goTo: "Go to article",
        region: "Latest blog insights",
      };

  const move = useCallback((step) => {
    if (count < 2) return;
    setDirection(step < 0 ? -1 : 1);
    setActiveIndex((current) => (current + step + count) % count);
  }, []);

  const goTo = useCallback((index) => {
    if (index < 0 || index >= count) return;
    setActiveIndex((current) => {
      setDirection(index < current ? -1 : 1);
      return index;
    });
  }, []);

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    if (!touch) return;
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    setTouching(true);
  };

  const handleTouchEnd = (event) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    setTouching(false);
    const touch = event.changedTouches[0];
    if (!start || !touch) return;
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    // Horizontal gestures change cards; vertical page scrolling is untouched.
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      move(dx < 0 ? 1 : -1);
    }
  };

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReduceMotion(media.matches);
    updateMotion();
    media.addEventListener?.("change", updateMotion);

    const element = slideAreaRef.current;
    const observer = typeof IntersectionObserver !== "undefined"
      ? new IntersectionObserver(
          ([entry]) => setInView(Boolean(entry?.isIntersecting)),
          { threshold: 0.1 },
        )
      : null;
    if (element) observer?.observe(element);
    if (!observer) setInView(true);

    return () => {
      observer?.disconnect();
      media.removeEventListener?.("change", updateMotion);
    };
  }, []);

  // Advance one blog every five seconds when visible and not in use.
  useEffect(() => {
    if (!inView || hovered || focused || touching || reduceMotion || count < 2) {
      return;
    }
    const interval = window.setInterval(() => {
      if (!document.hidden) move(1);
    }, 5000);
    return () => window.clearInterval(interval);
  }, [activeIndex, inView, hovered, focused, touching, reduceMotion, move]);

  const visiblePosts = count
    ? [latestPosts[activeIndex], latestPosts[(activeIndex + 1) % count]]
    : [];

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
          className="relative z-10 mx-auto mt-14 w-full max-w-[824px] sm:mt-16 lg:mt-18"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocusCapture={() => setFocused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setFocused(false);
            }
          }}
        >
          <div
            ref={slideAreaRef}
            role="region"
            aria-roledescription="carousel"
            aria-label={labels.region}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={() => {
              touchStartRef.current = null;
              setTouching(false);
            }}
            className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2"
            style={{ touchAction: "pan-y" }}
          >
            {visiblePosts.map((post, slot) => (
              <motion.div
                key={String(slot) + "-" + post.id}
                role="group"
                aria-roledescription="slide"
                aria-label={String(((activeIndex + slot) % count) + 1) + " / " + String(count)}
                initial={{ opacity: 1, x: direction * 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
                className={slot === 0 ? "min-w-0" : "hidden min-w-0 md:block"}
              >
                <BlogCard post={post} index={(activeIndex + slot) % count} lang={lang} compact />
              </motion.div>
            ))}
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
                  className="group relative z-10 flex h-11 w-7 touch-manipulation items-center justify-center"
                >
                  <span
                    className={
                      "block h-1.5 rounded-full transition-all duration-300 " +
                      (activeIndex === index
                        ? "w-6 bg-brand-primary"
                        : "w-1.5 bg-slate-300 group-hover:bg-brand-accent")
                    }
                  />
                </button>
              ))}
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => move(-1)}
                aria-label={labels.previous}
                className="relative z-10 flex h-11 w-11 touch-manipulation items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 transition hover:border-brand-accent hover:text-brand-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
              >
                <FiChevronLeft aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => move(1)}
                aria-label={labels.next}
                className="relative z-10 flex h-11 w-11 touch-manipulation items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 transition hover:border-brand-accent hover:text-brand-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
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
