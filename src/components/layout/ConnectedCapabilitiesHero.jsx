"use client";

import { useId, useRef } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { FiCpu, FiLayers, FiMonitor, FiCode, FiSmartphone, FiWifi } from "react-icons/fi";

// This is an illustrative service map, not an operational system dashboard.
const capabilities = [
  { number:"01", label:"AI / ML", de:"KI / ML", sub:"Intelligent systems", subDe:"Intelligente Systeme", Icon:FiCpu },
  { number:"02", label:"Full Stack", de:"Full Stack", sub:"End-to-end platforms", subDe:"Komplette Plattformen", Icon:FiLayers },
  { number:"03", label:"Web Development", de:"Webentwicklung", sub:"Digital experiences", subDe:"Digitale Erlebnisse", Icon:FiMonitor },
  { number:"04", label:"Software", de:"Software", sub:"Business solutions", subDe:"Geschäftslösungen", Icon:FiCode },
  { number:"05", label:"App Development", de:"App-Entwicklung", sub:"Mobile applications", subDe:"Mobile Anwendungen", Icon:FiSmartphone },
  { number:"06", label:"IoT Solutions", de:"IoT-Lösungen", sub:"Connected devices", subDe:"Vernetzte Geräte", Icon:FiWifi },
];

// Coordinates intentionally match the six cards in the 600px SVG viewBox.
const routes = [
  "M184 68 H202 V171 H228",
  "M184 208 H228",
  "M184 347 H202 V252 H228",
  "M416 68 H398 V171 H372",
  "M416 208 H372",
  "M416 347 H398 V252 H372",
];

function CapabilityIcon({ index, x, y }) {
  const common = { fill:"none", stroke:"#61d7fc", strokeWidth:1.7, strokeLinecap:"round", strokeLinejoin:"round" };
  switch(index) {
    case 0:
      return <g {...common}><path d={`M${x+7} ${y+14} l6 -6 l7 6 l-7 6 z`}/><path d={`M${x+13} ${y+20} v6 m0 -6 l8 -2`}/></g>;
    case 1:
      return <g {...common}><path d={`M${x+9} ${y+7} l-5 7 l5 7 M${x+20} ${y+7} l5 7 l-5 7 M${x+17} ${y+5} l-6 20`}/></g>;
    case 2:
      return <g {...common}><rect x={x+5} y={y+7} width="20" height="15" rx="2"/><path d={`M${x+5} ${y+12} h20 M${x+12} ${y+25} h6`}/></g>;
    case 3:
      return <g {...common}><rect x={x+5} y={y+4} width="20" height="22" rx="2"/><path d={`M${x+9} ${y+11} h12 M${x+9} ${y+17} h9`}/></g>;
    case 4:
      return <g {...common}><rect x={x+8} y={y+4} width="14" height="23" rx="3"/><path d={`M${x+13} ${y+23} h4`}/></g>;
    default:
      return <g {...common}><rect x={x+6} y={y+6} width="19" height="19" rx="4"/><path d={`M${x+11} ${y+11} h9 v9 h-9 z M${x+15} ${y+2} v4 M${x+15} ${y+25} v4`}/></g>;
  }
}

function Hub({ mobile = false, german = false }) {
  if (mobile) {
    return (
      <div className="relative mx-auto flex w-[174px] flex-col items-center rounded-2xl border border-[#53b6dc]/80 bg-gradient-to-br from-[#174767] to-[#061e34] px-3 py-3.5 text-center shadow-[0_0_42px_rgba(5,124,250,0.12)]">
        <span className="mb-2 flex h-8 w-8 items-center justify-center rounded-full border border-[#65dffd]/70 bg-[#0b4367] text-[#97ecff]"><FiCpu size={17}/></span>
        <span className="font-heading text-sm font-bold tracking-tight text-[#f0faff]">GenData <span className="text-[#62d6ff]">Tech</span></span>
        <span className="mt-1 font-body text-[9px] uppercase tracking-[0.11em] text-[#94bad4]">{german ? "Engineering-Hub" : "Engineering hub"}</span>
      </div>
    );
  }
  return null;
}

export default function ConnectedCapabilitiesHero({ active = true, lang = "en" }) {
  const containerRef = useRef(null);
  const visible = useInView(containerRef, { margin:"-10% 0px -10% 0px" });
  const reducedMotion = useReducedMotion();
  const playSignals = active && visible && !reducedMotion;
  const german = lang === "de";
  const suffix = useId().replace(/:/g, "");
  const glowId = `services-hub-glow-${suffix}`;
  const coreId = `services-hub-core-${suffix}`;

  return (
    <figure ref={containerRef} className="mx-auto w-full min-w-0 max-w-[600px] select-none">
      {/* Detailed desktop arrangement: six capability cards join a central hub. */}
      <div className="hidden lg:block" role="img"
        aria-label={german
          ? "Sechs verbundene Leistungen: KI, Full Stack, Web, Software, Apps und IoT mit GenData Tech als zentralem Hub"
          : "Six connected engineering services: AI, Full Stack, Web, Software, Apps and IoT around the GenData Tech hub"}>
        <svg viewBox="0 0 600 427" className="block h-auto w-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <radialGradient id={glowId}><stop offset="0" stopColor="#147dea" stopOpacity="0.2"/><stop offset="1" stopColor="#147dea" stopOpacity="0"/></radialGradient>
            <linearGradient id={coreId} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#174767"/><stop offset="1" stopColor="#061e34"/></linearGradient>
          </defs>

          <ellipse cx="300" cy="214" rx="200" ry="186" fill={`url(#${glowId})`}/>
          {routes.map((route,i) => (
            <path key={i} d={route} fill="none" stroke="#2677ae" strokeWidth="1.5" strokeDasharray="4 7" opacity="0.68"/>
          ))}

          {/* Native SVG packets have no JavaScript render loop and stop when offscreen. */}
          {playSignals && routes.map((route,i) => (
            <circle key={i} r="3" fill="#75e9ff" opacity="0.95">
              <animateMotion path={route} dur={`${3.5 + i*0.32}s`} begin={`${-i*0.45}s`} repeatCount="indefinite"/>
            </circle>
          ))}

          {capabilities.map((item,i) => {
            const left = i < 3;
            const x = left ? 6 : 416;
            const y = 34 + (i % 3) * 139;
            const iconX = x + 11;
            const iconY = y + 12;
            return (
              <g key={item.number}>
                <rect x={x} y={y} width="178" height="70" rx="10" fill="#0a243d" stroke="#35698b" strokeWidth="1.1"/>
                <rect x={iconX} y={iconY} width="29" height="29" rx="7" fill="#113f60"/>
                <CapabilityIcon index={i} x={iconX} y={iconY}/>
                <text x={x+160} y={y+15} textAnchor="end" fontSize="9" fontWeight="700" fill="#61d7fc">{item.number}</text>
                <text x={x+50} y={y+29} fontSize="12" fontWeight="650" fill="#e0f4ff">
                  {german ? item.de : item.label}
                </text>
                <text x={x+50} y={y+47} fontSize="9" fill="#9dbfd6">
                  {german ? item.subDe : item.sub}
                </text>
                <circle cx={x+167} cy={y+58} r="2.5" fill="#55e2b8" />
              </g>
            );
          })}

          <circle cx="300" cy="211" r="90" fill="#057cfa" opacity="0.045"/>
          <circle cx="300" cy="211" r="77" fill="none" stroke="#2487bc" strokeOpacity="0.3" strokeDasharray="3 7"/>
          <rect x="228" y="148" width="144" height="126" rx="17" fill={`url(#${coreId})`} stroke="#53b6dc" strokeWidth="1.6"/>
          <path d="M243 161 H357" stroke="#4686aa" strokeOpacity="0.4"/>
          <circle cx="300" cy="184" r="17" fill="#0b4367" stroke="#65dffd" strokeWidth="1.2"/>
          <path d="M290 184 H310 M300 174 V194 M293 177 L307 191 M307 177 L293 191" fill="none" stroke="#78e7ff" strokeWidth="1.2" opacity="0.8"/>
          <circle cx="300" cy="184" r="4" fill="#97ecff"/>
          <text x="300" y="224" textAnchor="middle" fontSize="14" fontWeight="700" fill="#f0faff">GenData</text>
          <text x="300" y="241" textAnchor="middle" fontSize="13" fontWeight="700" fill="#62d6ff">Tech</text>
          <text x="300" y="260" textAnchor="middle" fontSize="8" letterSpacing=".7" fill="#94bad4">{german ? "ENGINEERING-HUB" : "ENGINEERING HUB"}</text>
          <text x="300" y="413" textAnchor="middle" fontSize="10" letterSpacing="1.2" fill="#8cbed8">
            {german ? "EIN PARTNER · SECHS KOMPETENZEN" : "ONE TECHNOLOGY PARTNER · SIX CAPABILITIES"}
          </text>
        </svg>
      </div>

      {/* Mobile uses legible HTML cards instead of shrinking small SVG type. */}
      <div className="relative mx-auto w-full max-w-[440px] lg:hidden">
        <Hub mobile german={german}/>
        <div className="mx-auto h-6 w-px bg-gradient-to-b from-[#5bd9fc] to-[#245f88]" aria-hidden="true"/>
        <div className="relative grid grid-cols-2 gap-x-6 gap-y-3">
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-1/2 -ml-px w-px bg-[#245f88]/70"/>
          {capabilities.map((item,i) => (
            <div key={item.number} className="relative min-w-0 rounded-xl border border-[#35698b] bg-[#0a243d] p-3 shadow-[0_12px_22px_rgba(0,0,0,0.12)]">
              <span aria-hidden="true" className={`pointer-events-none absolute top-1/2 h-px w-3 bg-[#3589b9] ${i%2 === 0 ? "-right-3" : "-left-3"}`}/>
              <div className="flex items-center justify-between gap-2">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#113f60] text-[#61d7fc]"><item.Icon size={17}/></span>
                <span className="font-body text-[10px] font-semibold text-[#61d7fc]">{item.number}</span>
              </div>
              <p className="mt-2 font-heading text-[12px] font-semibold leading-snug text-[#e0f4ff]">{german ? item.de : item.label}</p>
              <p className="mt-1 font-body text-[10px] leading-snug text-[#9dbfd6]">{german ? item.subDe : item.sub}</p>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center font-body text-[9px] uppercase tracking-[0.12em] text-[#7baccd]">
        {german ? "VERNETZTE LEISTUNGEN · TECHNOLOGIEÜBERSICHT" : "CONNECTED SERVICES · TECHNOLOGY MAP"}
      </figcaption>
    </figure>
  );
}
