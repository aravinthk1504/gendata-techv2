"use client";

import { motion, useReducedMotion } from "motion/react";

// An illustrative application architecture, not a live product dashboard.
// Only mounted by the Full Stack Development hero.
export default function FullStackHeroArchitecture({ active = true, lang = "en" }) {
  const reducedMotion = useReducedMotion();
  const animate = active && !reducedMotion;
  const german = lang === "de";

  const activityBars = [
    { x: 186, y: 167, height: 14 },
    { x: 207, y: 158, height: 23 },
    { x: 228, y: 164, height: 17 },
    { x: 249, y: 154, height: 27 },
    { x: 270, y: 160, height: 21 },
    { x: 291, y: 151, height: 30 },
    { x: 312, y: 155, height: 26 },
  ];

  return (
    <figure className="w-full max-w-[470px]" aria-label={german ? "Beispiel einer Full-Stack-Anwendungsarchitektur mit Oberfläche, API und Datenbank" : "Illustration of a full-stack application connecting a frontend, API and database"}>
      <svg
        viewBox="0 0 430 335"
        xmlns="http://www.w3.org/2000/svg"
        className="block h-auto w-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="fs-hero-browser-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#102b49" />
            <stop offset="1" stopColor="#07182c" />
          </linearGradient>
          <linearGradient id="fs-hero-link-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#057cfa" />
            <stop offset="1" stopColor="#54e2f6" />
          </linearGradient>
        </defs>

        <ellipse cx="214" cy="150" rx="192" ry="153" fill="#0675db" opacity=".05" />

        {/* The application connects to an API, which communicates with storage. */}
        <path d="M170 207 L130 250" stroke="#246f9e" strokeWidth="1.7" strokeDasharray="4 6" fill="none" />
        <path d="M176 280 H256" stroke="url(#fs-hero-link-gradient)" strokeWidth="1.7" strokeDasharray="4 6" fill="none" />
        {animate ? (
          <>
            <circle r="3.5" fill="#64e7fa">
              <animateMotion dur="4.8s" repeatCount="indefinite" path="M170 207 L130 250 L176 280 H256" />
            </circle>
            <circle r="3" fill="#42adff">
              <animateMotion dur="4.8s" begin="2.4s" repeatCount="indefinite" path="M256 280 H176 L130 250 L170 207" />
            </circle>
          </>
        ) : (
          <>
            <circle cx="151" cy="230" r="3" fill="#64e7fa" />
            <circle cx="215" cy="280" r="3" fill="#42adff" />
          </>
        )}

        {/* Frontend application window */}
        <rect x="61" y="20" width="310" height="190" rx="11" fill="url(#fs-hero-browser-gradient)" stroke="#2a6389" strokeWidth="1.3" />
        <path d="M72 20 H360 Q371 20 371 31 V52 H61 V31 Q61 20 72 20" fill="#102d4a" />
        <path d="M61 52 H371" stroke="#315b7a" />
        {[76, 87, 98].map((x) => <circle key={x} cx={x} cy="36" r="3" fill="#547892" />)}
        <rect x="124" y="28" width="174" height="16" rx="5" fill="#081b30" stroke="#294b68" />
        <text x="211" y="39" fontSize="8" fill="#a2bed4" textAnchor="middle">application preview</text>

        <text x="80" y="69" fontSize="9" fontWeight="700" fill="#58d2ff">GenData</text>
        <text x="122" y="69" fontSize="9" fill="#f1f7ff">App</text>

        <rect x="80" y="83" width="78" height="107" rx="5" fill="#0a213a" stroke="#294765" />
        <rect x="90" y="95" width="50" height="5" rx="2" fill="#51c9fa" />
        {[113, 128, 143].map((y, i) => <rect key={y} x="90" y={y} width={57 - i * 4} height="4" rx="2" fill="#355979" />)}
        <rect x="89" y="164" width="60" height="16" rx="4" fill="#057cfa" />
        <text x="119" y="175" fontSize="7" textAnchor="middle" fill="#fff">Dashboard</text>

        <rect x="171" y="83" width="180" height="45" rx="6" fill="#102c47" stroke="#294f70" />
        <text x="183" y="99" fontSize="8" fill="#b0c5d7">{german ? "Beispielübersicht" : "Sample overview"}</text>
        <text x="183" y="117" fontSize="16" fontWeight="700" fill="#eef8ff">24.8K</text>
        <path d="M266 114 L280 105 L293 109 L306 96 L320 100 L340 90" fill="none" stroke="#4fd4f3" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <motion.circle cx="340" cy="90" r="3" fill="#80edff"
          animate={animate ? { opacity: [1, 0.35, 1] } : { opacity: 1 }}
          transition={{ duration: 2.8, repeat: animate ? Infinity : 0, ease: "easeInOut" }}
        />

        <rect x="171" y="137" width="180" height="53" rx="6" fill="#0c243d" stroke="#294765" />
        <text x="183" y="151" fontSize="8" fill="#b4cade">{german ? "Aktivität" : "Activity"}</text>
        {activityBars.map((bar, index) => (
          <motion.rect
            key={bar.x}
            x={bar.x}
            y={bar.y}
            width="10"
            height={bar.height}
            rx="2"
            fill="#168bf0"
            initial={false}
            animate={{ scaleY: animate ? [0.12, 1] : 1 }}
            transition={{ duration: animate ? 0.8 : 0, delay: animate ? 0.12 + index * 0.08 : 0, ease: "easeOut" }}
            style={{ transformOrigin: "center bottom", transformBox: "fill-box" }}
          />
        ))}

        {/* Backend and database modules */}
        <rect x="62" y="252" width="114" height="56" rx="8" fill="#0b2541" stroke="#2580b8" />
        <rect x="73" y="262" width="28" height="28" rx="5" fill="#123c5c" />
        <path d="M80 276 L87 269 L94 276 L87 283 Z" fill="none" stroke="#50d7f5" strokeWidth="1.5" />
        <text x="110" y="272" fontSize="10" fontWeight="600" fill="#e6f6ff">API</text>
        <text x="110" y="287" fontSize="8" fill="#9cbcd3">Backend</text>
        <motion.circle cx="156" cy="280" r="3" fill="#37deb0"
          animate={animate ? { opacity: [1, 0.35, 1] } : { opacity: 1 }}
          transition={{ duration: 2.4, repeat: animate ? Infinity : 0 }}
        />

        <rect x="256" y="252" width="114" height="56" rx="8" fill="#0b2541" stroke="#2580b8" />
        <ellipse cx="278" cy="268" rx="11" ry="4.5" fill="none" stroke="#55dafa" strokeWidth="1.5" />
        <path d="M267 268 V286 Q278 294 289 286 V268 M267 277 Q278 285 289 277" fill="none" stroke="#55dafa" strokeWidth="1.5" />
        <text x="300" y="272" fontSize="10" fontWeight="600" fill="#e6f6ff">{german ? "Daten" : "Data"}</text>
        <text x="300" y="287" fontSize="8" fill="#9cbcd3">{german ? "Datenbank" : "Database"}</text>
        <motion.circle cx="356" cy="280" r="3" fill="#37deb0"
          animate={animate ? { opacity: [0.4, 1, 0.4] } : { opacity: 1 }}
          transition={{ duration: 2.4, repeat: animate ? Infinity : 0, delay: 0.5 }}
        />
      </svg>
      <figcaption className="mt-0 flex items-center justify-center gap-2 font-body text-[10px] text-[#9dc5de]">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_9px_#4de2b4]" aria-hidden="true" />
        Frontend <span aria-hidden="true">↔</span> API <span aria-hidden="true">↔</span> {german ? "Datenbank" : "Database"}
        <span className="sr-only">{german ? "Beispielvisualisierung, keine Live-Daten" : "Illustrative system, not live data"}</span>
      </figcaption>
    </figure>
  );
}
