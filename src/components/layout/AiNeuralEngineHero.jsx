"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import useHeroAutoCycle from "./useHeroAutoCycle";

// The outputs below are illustrative examples, not predictions from a live model.
const demonstrations = [
  {
    id: "vision", en: "Vision AI", de: "Bild-KI",
    input: "Image input", inputDe: "Bilddaten",
    category: "CLASSIFICATION", categoryDe: "KLASSIFIKATION",
    result: "Recyclable", resultDe: "Recycelbar",
    value: "94%", note: "Sample confidence", noteDe: "Beispielkonfidenz",
    bars: [99, 62],
  },
  {
    id: "forecast", en: "Forecasting", de: "Prognose",
    input: "Series data", inputDe: "Zeitreihe",
    category: "FORECASTING", categoryDe: "PROGNOSE",
    result: "Demand trend", resultDe: "Nachfragetrend",
    value: "+18.2%", note: "Example projection", noteDe: "Beispielprognose",
    bars: [82, 50],
  },
  {
    id: "automation", en: "AI Automation", de: "KI-Automation",
    input: "Task request", inputDe: "Aufgabe",
    category: "AI AUTOMATION", categoryDe: "KI-AUTOMATISIERUNG",
    result: "Task routed", resultDe: "Zugewiesen",
    value: "Ready", note: "Simulated decision", noteDe: "Simulierte Entscheidung",
    bars: [95, 75],
  },
];

const backgroundConnections = [
  "M121 168 L170 90 M121 168 L170 139 M121 168 L170 188 M121 168 L170 237",
  "M170 90 L253 78 M170 90 L253 123 M170 90 L253 168",
  "M170 139 L253 78 M170 139 L253 123 M170 139 L253 168 M170 139 L253 213",
  "M170 188 L253 123 M170 188 L253 168 M170 188 L253 213 M170 188 L253 258",
  "M170 237 L253 168 M170 237 L253 213 M170 237 L253 258",
  "M253 78 L334 111 M253 78 L334 168",
  "M253 123 L334 111 M253 123 L334 168 M253 123 L334 225",
  "M253 168 L334 111 M253 168 L334 168 M253 168 L334 225",
  "M253 213 L334 111 M253 213 L334 168 M253 213 L334 225",
  "M253 258 L334 168 M253 258 L334 225",
  "M334 111 L392 168 M334 168 L392 168 M334 225 L392 168",
];

const activeConnections = [
  "M121 168 L170 139 L253 123 L334 111 L392 168",
  "M121 168 L170 188 L253 213 L334 168 L392 168",
  "M121 168 L170 237 L253 258 L334 225 L392 168",
  "M121 168 L170 90 L253 78 L334 111 L392 168",
];

const neurons = [
  [170, 90], [170, 139], [170, 188], [170, 237],
  [253, 78], [253, 123], [253, 168], [253, 213], [253, 258],
  [334, 111], [334, 168], [334, 225],
];

export default function AiNeuralEngineHero({ active = true, lang = "en" }) {
  const [selected, setSelected] = useState(0);
  const reducedMotion = useReducedMotion();
  const motionOn = active && !reducedMotion;
  const german = lang === "de";
  const current = demonstrations[selected];
  const autoCycle = useHeroAutoCycle({ active, index: selected, setIndex: setSelected, count: demonstrations.length });

  return (
    <div {...autoCycle} className="mx-auto w-full min-w-0 max-w-[540px]">
      <div className="mb-3 flex items-center justify-between gap-2 font-body text-[9px] uppercase tracking-[0.12em] text-[#80acc8]">
        <span>GenData / Neural Engine</span>
        <span className="text-[#60e2bf]">{german ? "● Demo aktiv" : "● Demo active"}</span>
      </div>

      <div
        className="relative isolate overflow-hidden rounded-2xl border border-[#254b6a] bg-[radial-gradient(ellipse_at_48%_47%,#0c3251_0%,#081d32_48%,#071525_100%)]"
        role="img"
        aria-label={german
          ? "Illustratives neuronales Netzwerk: Eingabedaten, verborgene Schichten und simuliertes KI-Ergebnis"
          : "Illustrative neural network: input data, hidden layers, and a simulated AI result"}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage: "linear-gradient(rgba(75,151,201,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(75,151,201,0.06) 1px,transparent 1px)",
            backgroundSize: "19px 19px",
          }}
        />
        <svg viewBox="0 0 540 330" className="relative block h-auto w-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <radialGradient id="gd-ai-neural-ambient">
              <stop offset="0" stopColor="#108cff" stopOpacity="0.18" />
              <stop offset="1" stopColor="#108cff" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="gd-ai-neural-output" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#113f5e" />
              <stop offset="1" stopColor="#0a263f" />
            </linearGradient>
          </defs>
          <ellipse cx="267" cy="164" rx="183" ry="147" fill="url(#gd-ai-neural-ambient)" />

          <g fontSize="10" fill="#8aafc7" letterSpacing="1.2">
            <text x="18" y="31">{german ? "DATEN" : "DATA INPUT"}</text>
            <text x="194" y="31">{german ? "NEURONALES MODELL" : "NEURAL MODEL"}</text>
            <text x="402" y="31">{german ? "ERGEBNIS" : "INFERENCE"}</text>
          </g>

          {/* Input vector: a subtle 3x3 sample data mosaic. */}
          <rect x="13" y="89" width="108" height="159" rx="9" fill="#0c2943" stroke="#2b7199" />
          <rect x="24" y="102" width="86" height="64" rx="5" fill="#102f50" stroke="#2f6388" />
          {[0.5, 0.85, 0.4, 0.75, 0.25, 0.9, 0.45, 0.9, 0.65].map((opacity, index) => (
            <rect key={index} x={33 + index % 3 * 21} y={111 + Math.floor(index / 3) * 17}
              width="16" height="12" rx="2" fill="#49aadd" opacity={opacity} />
          ))}
          <text x="67" y="186" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#e2f5ff">
            {german ? current.inputDe : current.input}
          </text>
          <text x="67" y="204" textAnchor="middle" fontSize="8" fill="#8eafc7">
            {german ? "Beispieldaten" : "Sample features"}
          </text>
          <path d="M30 219 H103 M30 226 H87" stroke="#3a7a9e" strokeWidth="3" strokeLinecap="round" />

          {/* Structure and active paths are separate to keep the motion subtle. */}
          <g fill="none" stroke="#3175a4" strokeWidth="1" opacity="0.48">
            {backgroundConnections.map((d, i) => <path key={i} d={d}/>)}
          </g>
          {activeConnections.map((d, i) => (
            <motion.path key={i} d={d} fill="none" stroke="#5bdefb" strokeWidth="1.65"
              strokeDasharray="5 15" strokeLinecap="round" opacity="0.84"
              animate={motionOn ? { strokeDashoffset: [0, -120] } : { strokeDashoffset: 0 }}
              transition={{ duration: 5, repeat: motionOn ? Infinity : 0, ease: "linear", delay: i * 0.45 }} />
          ))}

          {[{ x:170, r:83 }, { x:253, r:93 }, { x:334, r:75 }].map((halo) =>
            <circle key={halo.x} cx={halo.x} cy="168" r={halo.r} fill="#21aeff" opacity="0.06" />
          )}
          {neurons.map(([cx, cy], i) => (
            <motion.circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="9"
              fill="#0f4369" stroke="#63dfff" strokeWidth="1.4"
              animate={motionOn ? { opacity: [1, 0.45, 1] } : { opacity: 1 }}
              transition={{ duration: 2.5 + (i % 3) * 0.4, repeat: motionOn ? Infinity : 0, delay: i % 4 * 0.2, ease:"easeInOut" }} />
          ))}
          {[ [170,139], [253,168], [334,168] ].map(([cx,cy]) =>
            <circle key={cx} cx={cx} cy={cy} r="3" fill="#66e5ff" />
          )}

          {/* Results change only when the visitor chooses an example. */}
          <rect x="393" y="89" width="135" height="159" rx="9" fill="url(#gd-ai-neural-output)" stroke="#3698c1" />
          <text x="406" y="112" fontSize="9" fill="#8db7d2">{german ? current.categoryDe : current.category}</text>
          <text x="406" y="143" fontSize="16" fontWeight="700" fill="#f3fbff">{german ? current.resultDe : current.result}</text>
          <text x="406" y="170" fontSize="24" fontWeight="750" fill="#65dcf5">{current.value}</text>
          <text x="406" y="186" fontSize="8" fill="#98bbd4">{german ? current.noteDe : current.note}</text>
          <rect x="406" y="202" width="106" height="6" rx="3" fill="#24516f" />
          <motion.rect x="406" y="202" width={current.bars[0]} height="6" rx="3" fill="#52ceef" />
          <rect x="406" y="216" width="106" height="6" rx="3" fill="#24516f" />
          <motion.rect x="406" y="216" width={current.bars[1]} height="6" rx="3" fill="#328cbf" />
          <text x="270" y="304" textAnchor="middle" fontSize="9" fill="#8fbbd4" letterSpacing="1">
            {german ? "EINGABE → REPRÄSENTATION → AUSGABE" : "INPUT → LEARNED REPRESENTATION → OUTPUT"}
          </text>
        </svg>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-2" role="group" aria-label={german ? "KI-Demo auswählen" : "Choose AI demo"}>
        {demonstrations.map((item, index) => (
          <button key={item.id} type="button" aria-pressed={selected === index}
            onClick={() => setSelected(index)}
            className={`rounded-lg border px-3 py-2 font-body text-[10px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 ${selected === index
              ? "border-[#057cfa] bg-[#057cfa] text-white"
              : "border-[#345675] bg-[#10263f] text-slate-300 hover:border-cyan-400 hover:text-white"}`}>
            {german ? item.de : item.en}
          </button>
        ))}
      </div>
      <p className="mt-3 text-center font-body text-[9px] uppercase tracking-[0.12em] text-[#7f9eb7]">
        {german ? "Interaktives Konzept · simulierte Ausgaben, keine Live-Ergebnisse" : "Interactive concept · simulated outputs, not live model results"}
      </p>
    </div>
  );
}
