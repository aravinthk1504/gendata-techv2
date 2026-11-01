"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import useHeroAutoCycle from "../layout/useHeroAutoCycle";

// These editorial covers are thematic illustrations, not published article previews.
// The existing featured and published article sections below the hero remain authoritative.
const themes = [
  {
    id: "ai",
    tab: "AI",
    category: "01 / ARTIFICIAL INTELLIGENCE",
    categoryDe: "01 / KÜNSTLICHE INTELLIGENZ",
    headline: "Engineering Intelligent Systems",
    headlineDe: "Intelligente Systeme entwickeln",
    description: "Ideas at the intersection of models, automation and practical AI.",
    descriptionDe: "Ideen rund um KI-Modelle, Automatisierung und ihren praktischen Einsatz.",
    background: "radial-gradient(circle at 72% 28%,rgba(18,138,234,.34),transparent 48%),linear-gradient(145deg,#103e61,#06192d)",
  },
  {
    id: "software",
    tab: "Software",
    category: "02 / SOFTWARE ENGINEERING",
    categoryDe: "02 / SOFTWAREENTWICKLUNG",
    headline: "Building Better Digital Products",
    headlineDe: "Bessere digitale Produkte entwickeln",
    description: "Software architecture, applications and modern development.",
    descriptionDe: "Softwarearchitektur, Anwendungen und moderne Entwicklung.",
    background: "radial-gradient(circle at 70% 28%,rgba(56,130,218,.30),transparent 48%),linear-gradient(145deg,#15314d,#06192d)",
  },
  {
    id: "data",
    tab: "Data",
    category: "03 / DATA SCIENCE",
    categoryDe: "03 / DATA SCIENCE",
    headline: "Turning Data Into Decisions",
    headlineDe: "Daten in Entscheidungen verwandeln",
    description: "Analytics, insight discovery and data-driven thinking.",
    descriptionDe: "Analysen, neue Erkenntnisse und datenbasierte Entscheidungen.",
    background: "radial-gradient(circle at 73% 28%,rgba(21,182,215,.30),transparent 48%),linear-gradient(145deg,#10425a,#06192d)",
  },
  {
    id: "iot",
    tab: "IoT",
    category: "04 / CONNECTED TECHNOLOGY",
    categoryDe: "04 / VERNETZTE TECHNOLOGIE",
    headline: "When Devices Become Intelligent",
    headlineDe: "Wenn Geräte intelligent werden",
    description: "IoT, connected systems and real-world sensing.",
    descriptionDe: "IoT, vernetzte Systeme und Sensorik in der Praxis.",
    background: "radial-gradient(circle at 69% 27%,rgba(20,118,174,.37),transparent 48%),linear-gradient(145deg,#0d374f,#06192d)",
  },
];

function EditorialArtwork({ type }) {
  const stroke = "#8de9ff";
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 280 160"
      className="pointer-events-none absolute right-0 top-0 h-[57%] w-[78%] max-w-[290px] opacity-80"
      fill="none"
    >
      {type === "ai" && (
        <>
          {[24, 43, 62].map(radius => (
            <circle key={radius} cx="175" cy="80" r={radius} stroke={stroke} strokeWidth="1" strokeOpacity={radius === 43 ? ".6" : ".3"} strokeDasharray={radius === 62 ? "3 7" : undefined}/>
          ))}
          <circle cx="175" cy="80" r="15" fill="#3bb8ee" fillOpacity=".18" stroke="#a4f1ff" strokeOpacity=".85"/>
          <circle cx="175" cy="80" r="4" fill="#a4f1ff"/>
          {[[113,80],[175,18],[237,80],[175,142],[133,38],[217,122]].map(([x,y],i)=>(
            <g key={i}><line x1="175" y1="80" x2={x} y2={y} stroke={stroke} strokeOpacity=".25"/><circle cx={x} cy={y} r="2.7" fill="#76ddff"/></g>
          ))}
        </>
      )}
      {type === "software" && (
        <>
          <rect x="57" y="16" width="192" height="130" rx="11" fill="#091a2d" fillOpacity=".68" stroke={stroke} strokeOpacity=".48"/>
          <path d="M57 39 H249" stroke="#86d9f8" strokeOpacity=".35"/>
          {[70,80,90].map(x=><circle key={x} cx={x} cy="28" r="2" fill="#68c6ed"/>)}
          <path d="M108 69 L93 82 L108 95 M148 69 L163 82 L148 95 M138 62 L120 101" stroke="#a6efff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M92 115 H163 M175 115 H203" stroke="#4dc2ef" strokeWidth="3" strokeOpacity=".6" strokeLinecap="round"/>
          <rect x="181" y="58" width="46" height="37" rx="5" stroke="#49bae9" strokeOpacity=".5"/>
          <path d="M192 70 H215 M192 80 H207" stroke="#74d9ff" strokeOpacity=".7" strokeWidth="2"/>
        </>
      )}
      {type === "data" && (
        <>
          <path d="M45 135 H252 M45 20 V135" stroke={stroke} strokeOpacity=".55" strokeWidth="1.5"/>
          {[45,75,105].map(y=><path key={y} d={`M45 ${y} H252`} stroke={stroke} strokeOpacity=".13" strokeDasharray="4 6"/>)}
          {[68,95,122,149,176,203].map((x,i)=><rect key={x} x={x} y={135-[38,57,44,79,70,101][i]} width="16" height={[38,57,44,79,70,101][i]} rx="3" fill="#1b91e8" fillOpacity=".28"/>)}
          <path d="M61 113 L83 93 L110 100 L138 72 L167 81 L197 45 L224 33" stroke="#77e5fa" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          {[[61,113],[83,93],[110,100],[138,72],[167,81],[197,45],[224,33]].map(([x,y])=><circle key={x} cx={x} cy={y} r="3" fill="#9defff"/>)}
        </>
      )}
      {type === "iot" && (
        <>
          {[24,49,76].map(radius=><circle key={radius} cx="174" cy="81" r={radius} stroke={stroke} strokeOpacity={radius===76?".28":".52"} strokeDasharray={radius===76?"4 8":undefined}/>)}
          <rect x="150" y="57" width="48" height="48" rx="13" fill="#0b4162" stroke="#a7edff" strokeOpacity=".7"/>
          <text x="174" y="85" textAnchor="middle" fontSize="17" fill="#c3f8ff" fontWeight="700">IoT</text>
          {[[174,5],[250,81],[174,157],[98,81]].map(([x,y])=><circle key={x+"-"+y} cx={x} cy={y} r="4" fill="#88e5ff"/>)}
        </>
      )}
    </svg>
  );
}

export default function InsightsEditorialHero({ active = true, lang = "en" }) {
  const [selected, setSelected] = useState(0);
  const reduceMotion = useReducedMotion();
  const autoCycle = useHeroAutoCycle({
    active,
    index: selected,
    setIndex: setSelected,
    count: themes.length,
    delay: 5000,
  });
  const german = lang === "de";
  const current = themes[selected];

  return (
    <div
      {...autoCycle}
      className="relative mx-auto w-full min-w-0 max-w-[480px]"
      aria-label={german ? "Interaktive Themenvorschau" : "Interactive editorial theme preview"}
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 font-body text-[9px] font-semibold uppercase tracking-[0.12em] text-[#93b8d1]">
        <span>GenData / {german ? "Themenreihe" : "Editorial Series"}</span>
        <span className="text-[#78e3d3]">{german ? "● Ideen entdecken" : "● Exploring Ideas"}</span>
      </div>

      <div className="relative isolate h-[326px] w-full pb-2 pr-3 sm:h-[354px] sm:pr-4">
        <div aria-hidden="true" className="pointer-events-none absolute bottom-2 left-[7%] right-1 top-6 rotate-[5deg] rounded-xl border border-[#2d779d] bg-gradient-to-br from-[#123e5b] to-[#061b32] opacity-80"/>
        <div className="relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-[#397b9c] bg-[#0c263e] shadow-[0_24px_50px_rgba(0,0,0,0.4)]">
          <div className="relative z-10 flex h-11 shrink-0 items-center justify-between gap-2 border-b border-white/10 bg-[#071d32] px-4">
            <span className="font-heading text-[12px] font-bold text-white">GenData <span className="text-[#68d7ff]">Insights.</span></span>
            <span className="font-body text-[9px] uppercase tracking-[0.08em] text-[#8fb6cd]">{german ? "TECH-AUSGABE" : "THE TECH EDITION"}</span>
          </div>
          <div className="relative min-h-0 flex-1 overflow-hidden" aria-live="off">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.id}
                className="absolute inset-0 flex flex-col justify-end overflow-hidden px-4 pb-5 pt-3 sm:px-5 sm:pb-6"
                style={{ background: current.background }}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
                transition={{ duration: reduceMotion ? 0 : 0.28 }}
              >
                <EditorialArtwork type={current.id}/>
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06192d] via-[#06192d]/45 to-transparent"/>
                <div className="relative z-10 max-w-[330px]">
                  <p className="font-body text-[9px] font-bold uppercase tracking-[0.12em] text-[#76dfff]">
                    {german ? current.categoryDe : current.category}
                  </p>
                  <h3 className="mt-2 font-heading text-[clamp(1.35rem,4vw,2rem)] font-bold leading-[1.08] tracking-[-0.035em] text-white">
                    {german ? current.headlineDe : current.headline}
                  </h3>
                  <p className="mt-2 font-body text-[10px] leading-[1.55] text-[#c7daea] sm:text-[11px]">
                    {german ? current.descriptionDe : current.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex h-1 shrink-0 gap-1 bg-[#123754] px-1" aria-hidden="true">
            {themes.map((item,index)=>(
              <span key={item.id} className={`h-full flex-1 rounded-sm ${selected === index ? "bg-[#49cef4]" : "bg-[#2b6686]/50"}`}/>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-2 flex flex-wrap items-center justify-center gap-2" role="group"
        aria-label={german ? "Thema auswählen" : "Select editorial theme"}>
        {themes.map((item,index)=>(
          <button
            key={item.id}
            type="button"
            aria-pressed={selected === index}
            onClick={() => setSelected(index)}
            className={`rounded-md border px-3 py-2 font-body text-[10px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 ${selected === index ? "border-[#057cfa] bg-[#057cfa] text-white" : "border-[#345674] bg-[#10263d] text-[#bbd5e6] hover:border-[#6edbfa] hover:text-white"}`}
          >
            {item.tab}
          </button>
        ))}
      </div>
      <p className="mt-3 text-center font-body text-[9px] uppercase leading-relaxed tracking-[0.08em] text-[#88a9bf]">
        {german ? "Illustrative Themen · keine veröffentlichten Artikel" : "Illustrative editorial themes · not published articles"}
      </p>
    </div>
  );
}
