"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

/**
 * Shared process timeline:
 * - desktop: one horizontal travelling glow (existing design);
 * - phone: one vertical glow from the centre of step 1 to the final step,
 *   measured from actual marker positions so translated/wrapped text fits.
 */
export default function ProcessFlowGlow({ breakpoint = "lg", columns, mobileOnly = false }) {
  const reduceMotion = useReducedMotion();
  const mobileRef = useRef(null);
  const mobileVisible = useInView(mobileRef, { margin: "-10% 0px -10% 0px" });
  const [mobileTrack, setMobileTrack] = useState(null);
  const showAt = breakpoint === "xl" ? "xl:block" : "lg:block";

  useEffect(() => {
    const container = mobileRef.current?.parentElement;
    const grid = container?.querySelector(".gd-process-steps");
    if (!grid) return;

    const steps = Array.from(grid.children);
    if (steps.length < 2) return;

    const update = () => {
      const first = steps[0].querySelector("[data-process-marker]") ?? steps[0].firstElementChild;
      const last = steps[steps.length - 1].querySelector("[data-process-marker]") ??
        steps[steps.length - 1].firstElementChild;
      if (!first || !last) return;

      const bounds = container.getBoundingClientRect();
      const firstBounds = first.getBoundingClientRect();
      const lastBounds = last.getBoundingClientRect();
      const top = firstBounds.top + firstBounds.height / 2 - bounds.top;
      const bottom = lastBounds.top + lastBounds.height / 2 - bounds.top;
      const left = firstBounds.left + firstBounds.width / 2 - bounds.left - 1;
      const height = bottom - top;
      if (height <= 0) return;

      setMobileTrack(previous =>
        previous &&
        Math.abs(previous.top - top) < 0.5 &&
        Math.abs(previous.height - height) < 0.5 &&
        Math.abs(previous.left - left) < 0.5
          ? previous
          : { top, height, left, count: steps.length }
      );
    };

    update();
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(update) : null;
    observer?.observe(grid);
    steps.forEach(step => observer?.observe(step));
    window.addEventListener("resize", update);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  // A single animation spans the entire line, rather than restarting at
  // each intermediate card. Accessible static track remains with reduced motion.
  const playMobile = Boolean(mobileTrack && mobileVisible && !reduceMotion);
  const duration = (mobileTrack?.count ?? 6) * 1.4;
  const lineStyle = columns
    ? {
        left: "20px",
        right: `calc(${100 / columns}% - ${20 + (20 * (columns - 1)) / columns}px)`,
      }
    : undefined;

  return (
    <>
      <div
        ref={mobileRef}
        aria-hidden="true"
        className="gd-process-mobile-line pointer-events-none absolute z-0 w-[2px] overflow-hidden sm:hidden"
        style={{
          left: mobileTrack?.left ?? 19,
          top: mobileTrack?.top ?? 20,
          height: mobileTrack?.height ?? 0,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#057CFA]/40 via-[#21d4f3]/30 to-[#057CFA]/40" />
        {playMobile && (
          <>
            <motion.span
              className="absolute inset-x-0 top-0 h-full origin-top bg-gradient-to-b from-[#057CFA] to-[#21d4f3]"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: [0, 1] }}
              transition={{ duration, repeat: Infinity, ease: "linear" }}
            />
            <motion.span
              className="absolute -left-px top-0 h-7 w-[4px] rounded-full bg-gradient-to-b from-transparent via-[#21d4f3] to-transparent shadow-[0_0_13px_rgba(33,212,243,0.95)]"
              initial={{ y: -28 }}
              animate={{ y: [-28, mobileTrack.height] }}
              transition={{ duration, repeat: Infinity, ease: "linear" }}
            />
          </>
        )}
      </div>
      {!mobileOnly && (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 top-5 hidden h-px overflow-hidden ${showAt}`}
          style={lineStyle}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#057CFA]/25 to-transparent" />
          {!reduceMotion && (
            <motion.span
              className="absolute left-0 top-0 h-px w-[18%] bg-gradient-to-r from-transparent via-[#057CFA] to-transparent shadow-[0_0_14px_rgba(5,124,250,0.85)]"
              initial={{ x: "-100%" }}
              animate={{ x: ["-100%", "570%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
          )}
        </div>
      )}
    </>
  );
}
