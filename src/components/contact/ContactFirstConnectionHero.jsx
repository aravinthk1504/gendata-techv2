"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

// Purely illustrative animation. It never sends messages or interacts with
// the enquiry form; the real contact workflow remains below this hero.
export default function ContactFirstConnectionHero({ active = true, lang = "en" }) {
  const rootRef = useRef(null);
  const inView = useInView(rootRef, { margin: "-10% 0px -10% 0px" });
  const reducedMotion = useReducedMotion();
  const play = active && inView && !reducedMotion;
  const german = lang === "de";

  return (
    <div
      ref={rootRef}
      className="relative mx-auto w-full min-w-0 max-w-[530px]"
      role="img"
      aria-label={german
        ? "Illustriertes Briefumschlag- und Papierflieger-Motiv als Einladung, GenData Tech eine Nachricht zu senden"
        : "Illustrated glowing envelope and paper plane inviting visitors to start a conversation with GenData Tech"}
    >
      <div className="pointer-events-none absolute inset-[15%] rounded-full bg-[#057cfa]/[0.12] blur-[55px]" aria-hidden="true" />
      <svg
        viewBox="0 0 540 395"
        className="relative block h-auto w-full overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <radialGradient id="contact-first-halo">
            <stop offset="0" stopColor="#138ef9" stopOpacity=".32"/>
            <stop offset="1" stopColor="#138ef9" stopOpacity="0"/>
          </radialGradient>
          <linearGradient id="contact-first-face" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#1d7fcd"/>
            <stop offset="1" stopColor="#0b3a70"/>
          </linearGradient>
          <linearGradient id="contact-first-sheet" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#d2f3ff"/>
            <stop offset="1" stopColor="#7bcce9"/>
          </linearGradient>
          <filter id="contact-first-shadow" x="-50%" y="-100%" width="200%" height="300%">
            <feGaussianBlur stdDeviation="12"/>
          </filter>
        </defs>

        <motion.ellipse
          cx="270" cy="245" rx="250" ry="170" fill="url(#contact-first-halo)"
          animate={play ? { opacity: [.65, 1, .65] } : { opacity: .85 }}
          transition={{ duration: 6, ease: "easeInOut", repeat: play ? Infinity : 0 }}
        />

        {/* Fine architectural lines keep the illustration consistent with the site. */}
        <g fill="none" stroke="#4ab6e8" strokeOpacity=".23">
          <ellipse cx="261" cy="245" rx="211" ry="112" transform="rotate(-17 261 245)" strokeDasharray="3 10"/>
          <path d="M40 334 C150 378 390 390 510 304" strokeDasharray="3 11"/>
        </g>

        {/* The plane follows this curved cyan guide. */}
        <path d="M348 191 C375 125 426 114 482 79" stroke="#4dd8fc" strokeOpacity=".24" strokeWidth="9" fill="none" strokeLinecap="round"/>
        <motion.path
          d="M348 191 C375 125 426 114 482 79"
          stroke="#b5f5ff" strokeOpacity=".8" strokeWidth="1.6"
          strokeDasharray="3 9" fill="none" strokeLinecap="round"
          animate={play ? { strokeDashoffset: [0, -192] } : { strokeDashoffset: 0 }}
          transition={{ duration: 8, repeat: play ? Infinity : 0, ease: "linear" }}
        />
        {[[370,151],[435,107],[487,76]].map(([x,y],i)=>(
          <motion.circle
            key={i} cx={x} cy={y} r={i===2?2.1:3} fill="#b5f2ff"
            animate={play ? { opacity: [1, .2, 1] } : { opacity: .8 }}
            transition={{ duration: 2.7 + i*.35, repeat: play ? Infinity : 0 }}
          />
        ))}

        <ellipse cx="254" cy="342" rx="151" ry="21" fill="#041321" opacity=".72" filter="url(#contact-first-shadow)"/>

        {/* Floating envelope with emerging message sheet and folded face. */}
        <motion.g
          animate={play ? { y: [0, -6, 0] } : { y: 0 }}
          transition={{ duration: 7, repeat: play ? Infinity : 0, ease: "easeInOut" }}
        >
          <rect x="119" y="183" width="254" height="149" rx="12"
            fill="#062b52" stroke="#3e94c7" strokeWidth="1.6"/>
          <motion.g
            animate={play ? { y: [0, -11, 0] } : { y: 0 }}
            transition={{ duration: 7, repeat: play ? Infinity : 0, ease: "easeInOut", delay: .4 }}
          >
            <rect x="153" y="124" width="187" height="154" rx="8" fill="#93ddf8" opacity=".17"/>
            <rect x="150" y="119" width="187" height="154" rx="8"
              fill="url(#contact-first-sheet)" stroke="#a7efff" strokeOpacity=".75"/>
            <g stroke="#3189b6" strokeOpacity=".58" strokeWidth="3" strokeLinecap="round">
              <path d="M175 151 H235 M175 168 H303 M175 182 H287 M175 196 H311 M175 210 H259"/>
            </g>
            <circle cx="291" cy="234" r="13" fill="#1c90c7" opacity=".21"/>
            <path d="M284 233 L290 238 L300 228"
              fill="none" stroke="#0c75ae" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </motion.g>
          <path d="M119 193 L244 276 L373 193" fill="#0c4073" stroke="#55a8d6" strokeOpacity=".6"/>
          <path d="M119 195 L244 267 L119 326 Z" fill="#115a99" stroke="#5aade0" strokeOpacity=".55"/>
          <path d="M373 195 L244 267 L373 326 Z" fill="#13548e" stroke="#70c1e7" strokeOpacity=".55"/>
          <path d="M119 326 L239 250 Q245 247 251 250 L373 326 Z"
            fill="url(#contact-first-face)" stroke="#69b9e7" strokeWidth="1.2"/>
          <path d="M131 328 H362" stroke="#8cdeff" strokeOpacity=".33"/>
          <path d="M119 195 L244 266 L373 195" fill="none" stroke="#91ddff" strokeOpacity=".42"/>
          <path d="M207 290 H270" stroke="#9eeeff" strokeOpacity=".53" strokeWidth="2.2" strokeLinecap="round"/>
          <circle cx="285" cy="290" r="2.6" fill="#9befff"/>
        </motion.g>

        {/* Native SVG motion follows the curve precisely. Omitted for reduced
            motion and when offscreen; a static plane is still illustrated. */}
        <g
          opacity={1}
          transform={play ? undefined : "translate(445 107)"}
        >
          {play && (
            <animateMotion
              key="flying"
              dur="7s"
              repeatCount="indefinite"
              path="M344 201 C375 125 426 114 482 79"
              rotate="auto"
            />
          )}
          <path d="M-24 -14 L28 0 L-24 15 L-11 2 Z"
            fill="#8ce0ff" stroke="#d0f8ff" strokeWidth="1.5"/>
          <path d="M-11 2 L28 0 L-7 -4" fill="#367fc2" stroke="#d0f8ff" strokeWidth="1"/>
          <path d="M-11 2 L-24 15 L-7 8" fill="#1674b2"/>
        </g>

        <g fill="#73d8ff" opacity=".7">
          <circle cx="98" cy="140" r="2.1"/>
          <circle cx="389" cy="292" r="2.1"/>
          <circle cx="416" cy="250" r="1.3"/>
        </g>
      </svg>
      <p className="mt-1 text-center font-body text-[9px] font-semibold uppercase tracking-[0.14em] text-[#79a6c4]">
        {german ? "Eine Idee beginnt mit einem Gespräch" : "An idea begins with a conversation"}
      </p>
    </div>
  );
}
