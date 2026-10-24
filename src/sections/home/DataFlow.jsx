"use client";
import { motion, useReducedMotion } from "motion/react";

// A lightweight illustration of flowing data, with a restrained animated drift.
export default function DataFlow() {
  const reduceMotion = useReducedMotion();
  const streams = Array.from({ length: 30 }, (_, i) => {
    const offset = (i - 14.5) * 9;
    return { d: `M -60 ${215 + offset * .42} C 120 ${65 + offset}, 208 ${85 + offset}, 370 ${235 + offset * .36} S 650 ${390 + offset * .48}, 900 ${182 + offset * .92}`, bright: i % 6 === 0 };
  });
  const dots = Array.from({ length: 58 }, (_, i) => ({
    x: 56 + ((i * 137) % 830), y: 134 + ((i * 79) % 355), r: i % 11 === 0 ? 3 : 1.5
  }));
  return (
    <div className="relative w-full overflow-visible" aria-hidden="true">
      <div className="absolute inset-[17%_4%] rounded-full bg-[#007cff]/15 blur-[85px]" />
      <motion.svg viewBox="0 0 900 570" className="relative block h-auto w-full overflow-visible"
        animate={reduceMotion ? undefined : { y: [0, -7, 0] }}
        transition={{ duration: 13, ease: "easeInOut", repeat: Infinity }}>
        <defs>
          <linearGradient id="gd-flow-blue" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#003e91" stopOpacity="0" />
            <stop offset="22%" stopColor="#057cfa" stopOpacity=".8" />
            <stop offset="50%" stopColor="#62e6ff" stopOpacity=".95" />
            <stop offset="78%" stopColor="#0b9dff" stopOpacity=".75" />
            <stop offset="100%" stopColor="#005db4" stopOpacity=".15" />
          </linearGradient>
          <filter id="gd-flow-soft"><feGaussianBlur stdDeviation="8" /></filter>
        </defs>
        <g fill="none" stroke="url(#gd-flow-blue)" strokeLinecap="round">
          {streams.filter(x => x.bright).map((x, i) => <path key={"glow"+i} d={x.d} strokeWidth="12" opacity=".32" filter="url(#gd-flow-soft)" />)}
          {streams.map((x, i) => <path key={i} d={x.d} strokeWidth={x.bright ? "2.25" : ".7"} opacity={x.bright ? ".9" : ".36"} />)}
        </g>
        {dots.map((dot, i) => <circle key={i} cx={dot.x} cy={dot.y} r={dot.r} fill={i%4===0?"#92eeff":"#058ffb"} opacity={i%3===0?".75":".32"}/>)}
        <g stroke="#0ba5ff" opacity=".35">
          {Array.from({length: 12},(_,i)=><path key={i} d={`M${92+i*72} ${180+i%4*30} v${25+i%3*32}`} strokeWidth=".8"/>)}
        </g>
      </motion.svg>
    </div>
  );
}
