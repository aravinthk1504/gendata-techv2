"use client";

import { useRef } from "react";
import { useInView, useReducedMotion } from "motion/react";

// A single SVG path is shared by the ribbon and the moving highlight.
// No canvas, 3D engine, timers, pointer tracking, or per-frame React updates.
const infinityPath =
  "M 300 217 C 238 113 100 111 100 217 C 100 321 237 322 300 217 C 366 111 500 111 500 217 C 500 322 364 322 300 217";

export default function InfinityVisual() {
  const visualRef = useRef(null);
  const visible = useInView(visualRef, { margin: "0px 0px -10% 0px" });
  const reduceMotion = useReducedMotion();
  const playHighlight = visible && !reduceMotion;

  return (
    <div
      ref={visualRef}
      className="relative isolate mx-auto w-full max-w-[570px] select-none lg:justify-self-end"
    >
      <svg
        viewBox="0 0 600 430"
        role="img"
        aria-label="An infinity-shaped blue and cyan glass ribbon symbolizing continuous intelligence"
        className="block h-auto w-full overflow-visible"
      >
        <defs>
          <radialGradient id="gd-infinity-ambient">
            <stop offset="0%" stopColor="#057CFA" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#057CFA" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="gd-infinity-ribbon" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#002DCC" />
            <stop offset="28%" stopColor="#0667DB" />
            <stop offset="52%" stopColor="#3ED6F6" />
            <stop offset="77%" stopColor="#087CEB" />
            <stop offset="100%" stopColor="#1740AF" />
          </linearGradient>
          <linearGradient id="gd-infinity-edge" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#7BE2FF" stopOpacity="0.15" />
            <stop offset="48%" stopColor="#C5F5FF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#61A6FF" stopOpacity="0.22" />
          </linearGradient>
        </defs>

        <ellipse cx="300" cy="217" rx="280" ry="184" fill="url(#gd-infinity-ambient)" />

        {/* The depth comes from a few static vector strokes, not blur filters. */}
        <path d={infinityPath} fill="none" stroke="#08365E" strokeWidth="51" strokeLinecap="round" opacity="0.34" />
        <path d={infinityPath} fill="none" stroke="#124780" strokeWidth="35" strokeLinecap="round" opacity="0.66" />
        <path
          id="gd-infinity-track"
          d={infinityPath}
          fill="none"
          stroke="url(#gd-infinity-ribbon)"
          strokeWidth="27"
          strokeLinecap="round"
        />
        <path d={infinityPath} fill="none" stroke="url(#gd-infinity-edge)" strokeWidth="3" strokeLinecap="round" />

        {/* Only this tiny highlight moves. Native SVG motion avoids JS frame loops. */}
        {playHighlight && (
          <g>
            <circle r="13" fill="#65E3FF" opacity="0.17" />
            <circle r="5" fill="#D9FBFF" opacity="0.95" />
            <animateMotion dur="8.5s" rotate="auto" repeatCount="indefinite">
              <mpath href="#gd-infinity-track" />
            </animateMotion>
          </g>
        )}
      </svg>

      <div className="pointer-events-none -mt-7 hidden items-center justify-center gap-3 text-center sm:-mt-10 lg:flex">
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#057CFA]/60" />
        <span className="font-body text-[9px] font-semibold uppercase tracking-[0.22em] text-blue-200/75 sm:text-[10px]">
          Infinite Intelligence
        </span>
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#057CFA]/60" />
      </div>
    </div>
  );
}
