"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { homeText, localizedHref } from "../../lib/homeText";
import BlogCard from "../../components/blog/BlogCard";
import { blogPosts } from "../../data/blogData";

// blogData.js is maintained newest-first; display the newest six entries.
const latestPosts = blogPosts.slice(0, 6);
const postCount = latestPosts.length;
// Three identical sets allow native touch swipes to wrap without a visible jump.
const carouselPosts = [...latestPosts, ...latestPosts, ...latestPosts];

function Insights({ content, lang }) {
  const t = (key, variables) => homeText(content, key, variables);
  const localizedPath = (path) => localizedHref(lang, path);

  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const slideIndexRef = useRef(postCount);
  const scrollTimerRef = useRef(null);

  const [activeSlide, setActiveSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

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

  // Offsets come from the actual rendered cards, so one slide is correct
  // for all three responsive layouts (1 mobile, 2 tablet, 3 desktop).
  const scrollToSlide = useCallback((index, animated = true) => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const slide = track?.children[index];
    if (!viewport || !slide) return;

    viewport.scrollTo({
      left: slide.offsetLeft,
      behavior: animated && !reduceMotion ? "smooth" : "instant",
    });
  }, [reduceMotion]);

  const settleScroll = useCallback(() => {
    const viewport = viewportRef.current;
    const slides = trackRef.current?.children;
    if (!viewport || !slides?.length || postCount < 1) return;

    let nearest = postCount;
    let distance = Infinity;
    for (let i = 0; i < slides.length; i += 1) {
      const difference = Math.abs(slides[i].offsetLeft - viewport.scrollLeft);
      if (difference < distance) {
        distance = difference;
        nearest = i;
      }
    }

    // When we reach the edge copies, move to the matching middle-set card
    // without an animation. The visible blog item stays exactly the same.
    let centered = nearest;
    if (nearest < postCount) centered += postCount;
    if (nearest >= postCount * 2) centered -= postCount;

    slideIndexRef.current = centered;
    setActiveSlide(centered % postCount);
    if (centered !== nearest) scrollToSlide(centered, false);
  }, [scrollToSlide]);

  const handleScroll = useCallback(() => {
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(settleScroll, 150);
  }, [settleScroll]);

  const move = useCallback((step) => {
    if (postCount <= 1) return;
    const nextIndex = Math.min(
      postCount * 3 - 1,
      Math.max(0, slideIndexRef.current + step),
    );
    slideIndexRef.current = nextIndex;
    setActiveSlide(nextIndex % postCount);
    scrollToSlide(nextIndex);
  }, [scrollToSlide]);

  const goTo = useCallback((index) => {
    slideIndexRef.current = postCount + index;
    setActiveSlide(index);
    scrollToSlide(postCount + index);
  }, [scrollToSlide]);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReduceMotion(motionPreference.matches);
    const updateVisibility = () => setPageVisible(!document.hidden);

    updateMotionPreference();
    updateVisibility();
    motionPreference.addEventListener("change", updateMotionPreference);
    document.addEventListener("visibilitychange", updateVisibility);

    return () => {
      motionPreference.removeEventListener("change", updateMotionPreference);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    // Align the middle copy on mount and keep the selected item aligned
    // when the number of visible cards changes at a breakpoint.
    const resize = () => scrollToSlide(slideIndexRef.current, false);
    resize();
    window.addEventListener("resize", resize);
    const observer = typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(resize)
      : null;
    if (viewportRef.current) observer?.observe(viewportRef.current);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", resize);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, [scrollToSlide]);

  // Pause automatically when reading, swiping, focusing controls, tabbing
  // away or when the visitor has requested reduced motion.
  const isPaused = isHovered || hasFocus || isTouching || !pageVisible || reduceMotion;
  useEffect(() => {
    if (isPaused || postCount <= 1) return;
    const interval = setInterval(() => move(1), 5000);
    return () => clearInterval(interval);
  }, [isPaused, move, activeSlide]);

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
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocusCapture={() => setHasFocus(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setHasFocus(false);
            }
          }}
          onTouchStart={() => setIsTouching(true)}
          onTouchEnd={() => setIsTouching(false)}
          onTouchCancel={() => setIsTouching(false)}
        >
          <div
            ref={viewportRef}
            role="region"
            aria-roledescription="carousel"
            aria-label={labels.region}
            onScroll={handleScroll}
            className="overflow-x-auto overscroll-x-contain snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div ref={trackRef} className="relative flex items-stretch gap-6">
              {carouselPosts.map((post, index) => (
                <div
                  key={String(Math.floor(index / postCount)) + "-" + post.id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={String((index % postCount) + 1) + " / " + String(postCount)}
                  className="min-w-0 shrink-0 basis-full snap-start md:basis-[calc((100%-1.5rem)/2)] xl:basis-[calc((100%-3rem)/3)]"
                >
                  <BlogCard post={post} index={index % postCount} lang={lang} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2" aria-label={labels.region}>
              {latestPosts.map((post, index) => (
                <button
                  key={post.id}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={labels.goTo + " " + String(index + 1)}
                  aria-current={activeSlide === index ? "true" : undefined}
                  className="group flex h-9 w-6 items-center justify-center"
                >
                  <span
                    className={"block h-1.5 rounded-full transition-all duration-300 " + (
                      activeSlide === index
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
