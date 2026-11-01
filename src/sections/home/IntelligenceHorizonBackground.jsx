"use client";

import { useEffect, useId, useRef, useState } from "react";

// Design-1: Intelligence Horizon.
// Decorative flowing signal ribbons replace the previous dense neural mesh.
// SVG and CSS only; no canvas, WebGL, or continuous JavaScript animation loop.
const ribbons = [
  "M-130 440 C110 600 245 348 500 465 S850 600 1130 440",
  "M-130 460 C145 620 275 370 500 470 S860 610 1130 460",
  "M-130 485 C155 650 305 392 500 475 S855 630 1130 485",
  "M-130 505 C170 660 325 412 500 480 S850 660 1130 505",
  "M-130 535 C190 700 340 435 500 485 S840 685 1130 535",
  "M-130 565 C210 730 355 458 500 492 S825 714 1130 565",
  "M-130 600 C230 765 369 480 500 500 S805 746 1130 600",
  "M-130 645 C250 805 385 490 500 508 S785 780 1130 645",
  "M-130 690 C260 840 405 500 500 518 S760 820 1130 690",
];
const sparks = [
  [94, 379, 1.6], [215, 491, 1.9], [378, 418, 2.2], [497, 451, 2.5],
  [652, 404, 1.7], [754, 478, 1.8], [904, 392, 1.8], [840, 555, 1.5],
  [148, 558, 1.5], [600, 550, 1.7],
];

export default function IntelligenceHorizonBackground() {
  const rootRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const rawId = useId().replace(/:/g, "");
  const blueId = `${rawId}-horizon-blue`;
  const cyanId = `${rawId}-horizon-cyan`;
  const lightId = `${rawId}-horizon-light`;

  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.02 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ "--gd-horizon-play": visible ? "running" : "paused" }}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        focusable="false"
      >
        <defs>
          <linearGradient id={blueId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#034482" stopOpacity="0.08" />
            <stop offset="0.32" stopColor="#078cf7" stopOpacity="0.72" />
            <stop offset="0.5" stopColor="#72dcff" stopOpacity="0.65" />
            <stop offset="0.68" stopColor="#078cf7" stopOpacity="0.72" />
            <stop offset="1" stopColor="#034482" stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id={cyanId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2dd4fa" stopOpacity="0.05" />
            <stop offset="0.6" stopColor="#2dd4fa" stopOpacity="0.7" />
            <stop offset="1" stopColor="#2dd4fa" stopOpacity="0.04" />
          </linearGradient>
          <radialGradient id={lightId}>
            <stop offset="0" stopColor="#3fbffe" stopOpacity="0.31" />
            <stop offset="0.4" stopColor="#0878ec" stopOpacity="0.12" />
            <stop offset="1" stopColor="#0878ec" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* A quiet illuminated horizon; the headline stays the focal point. */}
        <ellipse className="gd-horizon-halo" cx="500" cy="455" rx="390" ry="122" fill={`url(#${lightId})`} />

        {/* Contour ribbons with different depths, not another neural network. */}
        {ribbons.map((d, index) => (
          <path
            key={index}
            d={d}
            fill="none"
            stroke={`url(#${index < 5 ? blueId : cyanId})`}
            strokeWidth={index < 5 ? 1.3 : 0.85}
            opacity={index < 5 ? 0.53 : 0.33}
          />
        ))}

        {/* Perspective-lines suggest digital infrastructure converging in depth. */}
        <g fill="none" stroke="#2377be" strokeWidth="0.8" opacity="0.22">
          {[-200, -70, 80, 200, 300, 390, 460, 540, 610, 700, 800, 920, 1070, 1200].map(x => (
            <path key={x} d={`M500 445 L${x} 600`} />
          ))}
          {[475, 503, 535, 570].map(y => (
            <path key={y} d={`M0 ${y} H1000`} opacity="0.35" />
          ))}
        </g>

        {/* Small light packets travel along three contours when visible. */}
        {[0, 3, 6].map((index, i) => (
          <path
            key={index}
            className="gd-horizon-signal"
            d={ribbons[index]}
            stroke="#73e7ff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="1 155"
            fill="none"
            style={{ animationDelay: `${-i * 2.5}s`, opacity: i === 0 ? 1 : 0.75 }}
          />
        ))}

        <g fill="#4bcfff">
          {sparks.map(([cx, cy, radius], i) => (
            <circle
              key={i}
              className="gd-horizon-spark"
              cx={cx}
              cy={cy}
              r={radius}
              opacity={0.55 + (i % 3) * 0.1}
              style={{ animationDelay: `${-i * 0.55}s` }}
            />
          ))}
        </g>
      </svg>

      {/* Dark text-safe area plus a quiet edge vignette. */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030b18]/70 via-[#030b18]/45 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_24%,rgba(3,11,24,0.78)_100%)]" />

      <style>{`
        .gd-horizon-signal {
          animation: gd-horizon-travel 9s linear infinite;
          animation-play-state: var(--gd-horizon-play);
          filter: drop-shadow(0 0 3px rgba(35, 203, 255, 0.7));
        }
        .gd-horizon-spark {
          animation: gd-horizon-twinkle 4.5s ease-in-out infinite;
          animation-play-state: var(--gd-horizon-play);
        }
        .gd-horizon-halo {
          animation: gd-horizon-breathe 6s ease-in-out infinite;
          animation-play-state: var(--gd-horizon-play);
          transform-origin: 500px 455px;
        }
        @keyframes gd-horizon-travel { to { stroke-dashoffset: -1560; } }
        @keyframes gd-horizon-twinkle { 50% { opacity: 0.16; } }
        @keyframes gd-horizon-breathe { 50% { opacity: 0.55; } }
        @media (prefers-reduced-motion: reduce) {
          .gd-horizon-signal, .gd-horizon-spark, .gd-horizon-halo {
            animation: none !important;
            filter: none !important;
          }
        }
      `}</style>
    </div>
  );
}
