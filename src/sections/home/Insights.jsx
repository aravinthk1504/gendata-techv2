"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { homeText, localizedHref } from "../../lib/homeText";
import BlogCard from "../../components/blog/BlogCard";
import { blogPosts } from "../../data/blogData";

// Homepage highlights the six newest entries from blogData.js.
const latestPosts = blogPosts.slice(0, 6);
const count = latestPosts.length;
// Two extra cards keep the two-card desktop layout continuous at the end.
const carouselPosts = [...latestPosts, ...latestPosts.slice(0, 2)];

function Insights({ content, lang }) {
  const t = (key, variables) => homeText(content, key, variables);
  const localizedPath = (path) => localizedHref(lang, path);

  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const activeRef = useRef(0);
  const settleTimerRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [pageActive, setPageActive] = useState(true);
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

  // Native scroll-snap works before hydration and preserves real touch swiping.
  // In particular, the cards are never hidden while waiting for measurements.
  const scrollToCard = useCallback((index, smooth = true) => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const card = track?.children[index];
    if (!viewport || !track || !card) return;
    const left = card.offsetLeft - track.offsetLeft;
    viewport.scrollTo({
      left,
      behavior: smooth && !reduceMotion ? "smooth" : "instant",
    });
  }, [reduceMotion]);

  const goTo = useCallback((index, smooth = true) => {
    if (index < 0 || index >= count) return;
    activeRef.current = index;
    setActiveIndex(index);
    scrollToCard(index, smooth);
  }, [scrollToCard]);

  const move = useCallback((direction) => {
    if (count <= 1) return;
    const current = activeRef.current;
    const next = current + direction;
    if (next < 0) {
      // Wrap directly to the final real post.
      goTo(count - 1, false);
    } else if (next === count) {
      // Scroll forward to the first cloned post. Scroll-settle then resets
      // to the original first post with no visual jump.
      activeRef.current = 0;
      setActiveIndex(0);
      scrollToCard(count, true);
    } else {
      goTo(next);
    }
  }, [goTo, scrollToCard]);

  const finishScroll = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track || !count) return;
    let nearest = 0;
    let difference = Infinity;
    for (let i = 0; i < track.children.length; i += 1) {
      const distance = Math.abs(
        (track.children[i].offsetLeft - track.offsetLeft) - viewport.scrollLeft
      );
      if (distance < difference) {
        difference = distance;
        nearest = i;
      }
    }

    const logical = nearest % count;
    activeRef.current = logical;
    setActiveIndex(logical);

    if (nearest >= count) {
      // Prevent a smooth-scroll jump when resetting the duplicate edge card.
      const realCard = track.children[logical];
      if (realCard) {
        const original = viewport.style.scrollBehavior;
        viewport.style.scrollBehavior = "auto";
        viewport.scrollLeft = realCard.offsetLeft - track.offsetLeft;
        viewport.style.scrollBehavior = original;
      }
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (settleTimerRef.current) clearTimeout(settleTimerRef.current);
    settleTimerRef.current = setTimeout(finishScroll, 180);
  }, [finishScroll]);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(preference.matches);
    const updateVisibility = () => setPageActive(!document.hidden);
    const element = viewportRef.current;
    const observer = typeof IntersectionObserver !== "undefined" && element
      ? new IntersectionObserver(
          ([entry]) => setOnScreen(entry.isIntersecting),
          { threshold: 0.1 },
        )
      : null;

    observer?.observe(element);
    if (!observer) setOnScreen(true);
    updatePreference();
    updateVisibility();
    preference.addEventListener("change", updatePreference);
    document.addEventListener("visibilitychange", updateVisibility);

    return () => {
      observer?.disconnect();
      preference.removeEventListener("change", updatePreference);
      document.removeEventListener("visibilitychange", updateVisibility);
      if (settleTimerRef.current) clearTimeout(settleTimerRef.current);
    };
  }, []);

  // Re-align the current card after responsive layout changes.
  useEffect(() => {
    const handleResize = () => scrollToCard(activeRef.current, false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [scrollToCard]);

  const paused = hovered || focused || !pageActive || !onScreen || reduceMotion;
  useEffect(() => {
    if (paused || count <= 1) return;
    const timer = window.setInterval(() => move(1), 5000);
    return () => window.clearInterval(timer);
  }, [paused, move, activeIndex]);

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
            onScroll={handleScroll}
            className="overflow-x-auto overscroll-x-contain snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div ref={trackRef} className="relative flex items-stretch gap-6">
              {carouselPosts.map((post, index) => (
                <div
                  key={String(index) + "-" + post.id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={String((index % count) + 1) + " / " + String(count)}
                  className="min-w-0 w-full shrink-0 snap-start md:w-[calc((100%-1.5rem)/2)]"
                >
                  <BlogCard post={post} index={index % count} lang={lang} compact />
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
