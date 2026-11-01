"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const modules = [
  { id: "rules", x: 82, y: 107, label: "Business Rules", de: "Geschäftsregeln" },
  { id: "operations", x: 225, y: 107, label: "Operations", de: "Prozesse" },
  { id: "records", x: 82, y: 180, label: "Records", de: "Datensätze" },
  { id: "integrations", x: 225, y: 180, label: "Integrations", de: "Integrationen" },
];

const connections = [
  "M205 134 H225",
  "M143 161 V180",
  "M287 161 V180",
  "M205 204 H225",
];

export default function SoftwareBlueprintHero({ active = true, lang = "en" }) {
  const [mode, setMode] = useState("built");
  const reducedMotion = useReducedMotion();
  const isBuilt = mode === "built";
  const motionOn = active && !reducedMotion;
  const duration = reducedMotion ? 0 : 0.65;
  const german = lang === "de";

  return (
    <div className="mx-auto w-full min-w-0 max-w-[470px]">
      <div className="mb-3 flex items-center justify-between gap-2 font-body text-[9px] font-medium uppercase tracking-[0.13em] text-[#7fa6c3]">
        <span>GenData / System Design</span>
        <span className="text-right text-cyan-300">
          {isBuilt
            ? german ? "Entwickeltes System" : "Engineered System"
            : german ? "Systementwurf" : "Design Blueprint"}
        </span>
      </div>

      <div
        className="relative isolate overflow-hidden rounded-xl border border-[#24425d] bg-[#071b30] shadow-[0_18px_50px_rgba(0,0,0,0.3)]"
        role="img"
        aria-label={german
          ? "Konzept für individuelle Software mit Geschäftsregeln, Prozessen, Daten und Integrationen"
          : "Custom software concept with business rules, operations, records and integrations"}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          aria-hidden="true"
          style={{
            backgroundImage: "linear-gradient(rgba(77,144,187,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(77,144,187,0.07) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />

        <svg viewBox="0 0 430 300" className="relative block h-auto w-full" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" stroke="#386184" strokeWidth="0.8" opacity={isBuilt ? 0.55 : 0.95}>
            <path d="M32 49 V30 H52 M378 30 H398 V49 M32 250 V270 H52 M378 270 H398 V250" />
            <path d="M34 150 H396 M215 33 V267" strokeDasharray="2 9" opacity="0.5" />
            <circle cx="215" cy="150" r="125" strokeDasharray="2 8" opacity="0.3" />
          </g>

          <motion.rect
            x="64" y="55" width="302" height="193" rx="10"
            animate={{ fill: isBuilt ? "#102f4b" : "#071c30", stroke: isBuilt ? "#3682ad" : "#2c688e" }}
            transition={{ duration }}
            strokeWidth="1.2"
          />
          <path d="M64 88 H366" stroke="#3c779e" fill="none" />
          {[80, 91, 102].map(x => <circle key={x} cx={x} cy="72" r="3" fill="#59a5d2" />)}
          <text x="216" y="76" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b9d9ee" letterSpacing="1">
            {german ? "INDIVIDUELLES SOFTWARESYSTEM" : "CUSTOM SOFTWARE SYSTEM"}
          </text>

          {modules.map((module, index) => {
            const primary = index === 0;
            return (
              <g key={module.id}>
                <motion.rect
                  x={module.x} y={module.y} width="123" height={index < 2 ? 54 : 49} rx="6"
                  strokeWidth="1"
                  animate={{
                    fill: isBuilt ? (primary ? "#104c7b" : "#102f4b") : "#071c30",
                    stroke: isBuilt ? (primary ? "#51caf2" : "#3682ad") : "#2c688e",
                  }}
                  transition={{ duration, delay: reducedMotion ? 0 : index * 0.07 }}
                />
                <text x={module.x + 15} y={module.y + 23} fontSize="10" fontWeight="600" fill="#dfedfa">
                  {german ? module.de : module.label}
                </text>
                <motion.rect x={module.x + 15} y={module.y + 33} width="75" height="3" rx="2"
                  fill="#6caccb" animate={{ opacity: isBuilt ? 1 : 0.35 }} transition={{ duration }} />
                {index < 2 && (
                  <motion.rect x={module.x + 15} y={module.y + 40} width="53" height="3" rx="2"
                    fill="#6caccb" animate={{ opacity: isBuilt ? 0.6 : 0.22 }} transition={{ duration }} />
                )}
              </g>
            );
          })}

          {connections.map((d, i) => (
            <motion.path
              key={d}
              d={d}
              fill="none"
              stroke="#58cfff"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeDasharray="4 5"
              animate={{
                opacity: isBuilt ? 0.9 : 0.4,
                strokeDashoffset: motionOn ? [0, -36] : 0,
              }}
              transition={{
                opacity: { duration },
                strokeDashoffset: { duration: 3 + i * 0.3, repeat: motionOn ? Infinity : 0, ease: "linear" },
              }}
            />
          ))}
          {[{ x: 215, y: 134 }, { x: 143, y: 171 }, { x: 287, y: 171 }, { x: 215, y: 204 }].map((point, i) => (
            <motion.circle key={i} cx={point.x} cy={point.y} r="3" fill="#63e3fa"
              animate={{ opacity: isBuilt ? 1 : 0.6 }} transition={{ duration }} />
          ))}

          <text x="35" y="284" fontSize="8" fill="#5d9bbd" letterSpacing="1">SYS / 001</text>
          <text x="310" y="284" fontSize="8" fill="#5d9bbd" letterSpacing="1">
            {isBuilt ? "ENGINEERED SYSTEM" : "SYSTEM BLUEPRINT"}
          </text>
        </svg>

        {/* A faint blueprint scanner; kept decorative and disabled for reduced motion. */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 h-10 border-b border-cyan-300/15 bg-gradient-to-b from-transparent via-cyan-400/[0.05] to-transparent"
          initial={false}
          animate={motionOn ? { top: ["-15%", "110%"] } : { top: "-15%" }}
          transition={{ duration: 7, repeat: motionOn ? Infinity : 0, ease: "linear", repeatDelay: 1 }}
        />
      </div>

      <div className="mt-4 flex items-center justify-center gap-2" role="group" aria-label={german ? "Ansicht des Softwaresystems" : "Software system preview mode"}>
        <button
          type="button"
          aria-pressed={!isBuilt}
          onClick={() => setMode("blueprint")}
          className={`rounded-lg border px-4 py-2 font-body text-[11px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 ${!isBuilt ? "border-[#057cfa] bg-[#057cfa] text-white" : "border-[#345572] bg-[#10253c] text-slate-300 hover:text-white"}`}
        >
          {german ? "Entwurf" : "Blueprint"}
        </button>
        <button
          type="button"
          aria-pressed={isBuilt}
          onClick={() => setMode("built")}
          className={`rounded-lg border px-4 py-2 font-body text-[11px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 ${isBuilt ? "border-[#057cfa] bg-[#057cfa] text-white" : "border-[#345572] bg-[#10253c] text-slate-300 hover:text-white"}`}
        >
          {german ? "Fertiges System" : "Built System"}
        </button>
      </div>
      <p className="mt-3 text-center font-body text-[9px] uppercase tracking-[0.12em] text-[#7f9eb5]">
        {german ? "Von Anforderungen zu individueller Software" : "From requirements to purpose-built software"}
      </p>
      <span className="sr-only">{german ? "Illustratives Konzept, keine Live-Software" : "Illustrative concept, not live software"}</span>
    </div>
  );
}
