"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { homeText, localizedHref } from "../../lib/homeText";
import BlogCard from "../../components/blog/BlogCard";
import { blogPosts } from "../../data/blogData";

// New articles are added to the top of blogData.js.
const latestPosts = blogPosts.slice(0, 6);
const total = latestPosts.length;
const clones = Math.min(2, total);
// Edge copies keep the first and last transitions continuous on mobile and desktop.
const slides = [
  ...latestPosts.slice(-clones),
  ...latestPosts,
  ...latestPosts.slice(0, clones),
];

const normalize = (position) => {
  if (position < clones) return position + total;
  if (position >= total + clones) return position - total;
  return position;
};

function Insights({ content, lang }) {
  const t = (key, variables) => homeText(content, key, variables);
  const localizedPath = (path) => localizedHref(lang, path);

  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const movingRef = useRef(false);
  const touchStartRef = useRef(null);

  const [position, setPosition] = useState(clones);
  const [stepSize, setStepSize] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touching, setTouching] = useState(false);
  const [visibleOnPage, setVisibleOnPage] = useState(false);
  const [pageActive, setPageActive] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

  const activeIndex = total ? ((position - clones) % total + total) % total : 0;
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

  // Measure the actual slide width rather than guessing offsets from the
  // browser's scroll position. This fixes mobile arrows and progress dots.
  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track || !total) return;

    const measure = () => {
      const firstSlide = track.children[clones];
      if (!firstSlide) return;
      const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 24;
      const width = firstSlide.getBoundingClientRect().width;
      if (width <= 0) return;
      setStepSize(width + gap);
      setVisibleCount(window.matchMedia("(min-width: 768px)").matches ? 2 : 1);
      // Resizing should never cause a long animated jump.
      setTransitionEnabled(false);
      movingRef.current = false;
    };

    measure();
    const observer = typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(measure)
      : null;
    observer?.observe(viewport);
    window.addEventListener("resize", measure);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReduceMotion(media.matches);
    const updateVisibility = () => setPageActive(!document.hidden);
    const element = viewportRef.current;

    const observer = typeof IntersectionObserver !== "undefined" && element
      ? new IntersectionObserver(
          ([entry]) => setVisibleOnPage(entry.isIntersecting),
          { threshold: 0.15 },
        )
      : null;

    observer?.observe(element);
    if (!observer) setVisibleOnPage(true);
    updateMotion();
    updateVisibility();
    media.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);

    return () => {
      observer?.disconnect();
      media.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  const navigate = useCallback((next) => {
    if (total < 2 || !stepSize || movingRef.current) return;
    if (reduceMotion) {
      setTransitionEnabled(false);
      setPosition(normalize(next));
      return;
    }
    movingRef.current = true;
    setTransitionEnabled(true);
    setPosition(next);
  }, [reduceMotion, stepSize]);

  const move = useCallback((direction) => {
    navigate(position + direction);
  }, [navigate, position]);

  const goTo = useCallback((index) => {
    if (index === activeIndex || movingRef.current) return;
    // Pick the closest equivalent index, so even last-to-first dot
    // navigation advances by one card instead of jumping six cards.
    const candidates = [
      clones + index - total,
      clones + index,
      clones + index + total,
    ].filter((candidate) => candidate >= clones - 1 && candidate <= clones + total);
    const nearest = candidates.reduce(
      (best, candidate) => Math.abs(candidate - position) < Math.abs(best - position)
        ? candidate
        : best,
      candidates[0],
    );
    navigate(nearest);
  }, [activeIndex, navigate, position]);

  const handleTransitionEnd = (event) => {
    if (event.target !== trackRef.current || event.propertyName !== "transform") return;
    movingRef.current = false;
    const middlePosition = normalize(position);
    if (middlePosition !== position) {
      setTransitionEnabled(false);
      setPosition(middlePosition);
    }
  };

  const handleTouchStart = (event) => {
    touchStartRef.current = event.touches[0]?.clientX ?? null;
    setTouching(true);
  };

  const handleTouchEnd = (event) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    setTouching(false);
    if (start === null) return;
    const delta = (event.changedTouches[0]?.clientX ?? start) - start;
    if (Math.abs(delta) > 45) move(delta < 0 ? 1 : -1);
  };

  const paused = hovered || focused || touching || !pageActive || !visibleOnPage || reduceMotion;
  useEffect(() => {
    if (paused || !stepSize || total < 2) return;
    const timer = window.setInterval(() => move(1), 5000);
    return () => window.clearInterval(timer);
  }, [paused, stepSize, move]);

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
          className="mt-14 sm:mt-16 lg:mt-18"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocusCapture={() => setFocused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
          }}
        >
          <div
            ref={viewportRef}
            role="region"
            aria-roledescription="carousel"
            aria-label={labels.region}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={() => {
              touchStartRef.current = null;
              setTouching(false);
            }}
            className="overflow-hidden"
            style={{ touchAction: "pan-y" }}
          >
            <div
              ref={trackRef}
              aria-live="off"
              onTransitionEnd={handleTransitionEnd}
              className={`flex w-full items-stretch gap-6 ${transitionEnabled && !reduceMotion ? "transition-transform duration-500 ease-out" : ""}`}
              style={{
                transform: stepSize
                  ? `translate3d(-${position * stepSize}px, 0, 0)`
                  : "translate3d(0, 0, 0)",
                visibility: stepSize ? "visible" : "hidden",
              }}
            >
              {slides.map((post, index) => {
                const onScreen = index >= position && index < position + visibleCount;
                return (
                  <div
                    key={`${index}-${post.id}`}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${((index - clones + total) % total) + 1} / ${total}`}
                    aria-hidden={!onScreen}
                    inert={!onScreen}
                    className="min-w-0 w-full shrink-0 md:w-[calc((100%-1.5rem)/2)]"
                  >
                    <BlogCard post={post} index={index % total} lang={lang} />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1" aria-label={labels.region}>
              {latestPosts.map((post, index) => (
                <button
                  key={post.id}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`${labels.goTo} ${index + 1}`}
                  aria-current={activeIndex === index ? "true" : undefined}
                  className="group flex h-10 w-6 items-center justify-center"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-300 ${
                      activeIndex === index
                        ? "w-6 bg-brand-primary"
                        : "w-1.5 bg-slate-300 group-hover:bg-brand-accent"
                    }`}
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
