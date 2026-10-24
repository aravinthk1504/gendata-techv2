"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "motion/react";

// Lightweight SVG neural sphere: no canvas, WebGL, image download or animation loop.
export default function NeuralCore() {
  const id = useId().replace(/:/g, "");
  const reduceMotion = useReducedMotion();
  const nodes = Array.from({ length: 55 }, (_, i) => {
    const a = i * 2.399963229728653;
    const r = Math.sqrt((i + 0.5) / 55) * 165;
    return { x: 300 + Math.cos(a) * r, y: 300 + Math.sin(a) * r * 0.96, size: i % 7 === 0 ? 3.7 : 1.8 };
  });
  return (
    <div className="relative mx-auto w-full max-w-[630px] aspect-square" aria-label="Glowing blue neural network sphere">
      <div className="absolute inset-[12%] rounded-full bg-[#057cfa]/20 blur-[70px]" />
      <motion.svg viewBox="0 0 600 600" role="img" aria-label="Connected AI neural core" className="relative h-full w-full overflow-visible"
        animate={reduceMotion ? undefined : { rotate: [0, 2, 0, -2, 0] }}
        transition={{ duration: 24, ease: "easeInOut", repeat: Infinity }}>
        <defs>
          <radialGradient id={id+"orb"} cx="38%" cy="27%" r="77%">
            <stop offset="0%" stopColor="#1a77c9" stopOpacity=".28" />
            <stop offset="50%" stopColor="#073775" stopOpacity=".42" />
            <stop offset="100%" stopColor="#030d23" stopOpacity=".94" />
          </radialGradient>
          <linearGradient id={id+"rim"} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8beaff"/><stop offset="35%" stopColor="#0f8bff"/><stop offset="70%" stopColor="#06d3ff"/><stop offset="100%" stopColor="#166aff"/>
          </linearGradient>
          <radialGradient id={id+"light"}>
            <stop offset="0%" stopColor="#baf8ff" stopOpacity=".9" /><stop offset="22%" stopColor="#1ab6ff" stopOpacity=".28" /><stop offset="100%" stopColor="#0075ff" stopOpacity="0" />
          </radialGradient>
          <clipPath id={id+"clip"}><circle cx="300" cy="300" r="174"/></clipPath>
        </defs>
        <ellipse cx="300" cy="492" rx="197" ry="23" fill="#028bff" opacity=".13" />
        <ellipse cx="300" cy="492" rx="176" ry="16" fill="none" stroke="#047ffb" strokeWidth="1.5" opacity=".55" />
        <ellipse cx="300" cy="300" rx="262" ry="85" transform="rotate(-19 300 300)" fill="none" stroke="#0789ff" strokeWidth="1.3" opacity=".3" />
        <ellipse cx="300" cy="300" rx="264" ry="85" transform="rotate(16 300 300)" fill="none" stroke="#11caff" strokeWidth="1.3" opacity=".45" />
        <circle cx="300" cy="300" r="177" fill={"url(#"+id+"orb)"} />
        <circle cx="300" cy="300" r="175" fill="none" stroke={"url(#"+id+"rim)"} strokeWidth="3.2" opacity=".9" />
        <circle cx="300" cy="300" r="181" fill="none" stroke="#0078f9" strokeWidth="10" opacity=".12" />
        <g clipPath={"url(#"+id+"clip)"}>
          {nodes.map((n,i) => {
            const j = (i * 13 + 17) % nodes.length;
            const m = nodes[j];
            return <path key={"edge"+i} d={`M${n.x.toFixed(1)} ${n.y.toFixed(1)} Q300 ${(230 + (i%8)*20)} ${m.x.toFixed(1)} ${m.y.toFixed(1)}`} fill="none" stroke={i%3 ? "#098bff" : "#48deff"} strokeWidth=".8" opacity={i%3 ? .24 : .48} />;
          })}
          {nodes.map((n,i) => <circle key={"node"+i} cx={n.x} cy={n.y} r={n.size} fill={i%4 ? "#40aaff" : "#b5f6ff"} opacity={i%5 ? .76 : 1} />)}
          <circle cx="300" cy="300" r="86" fill={"url(#"+id+"light)"} opacity=".62" />
        </g>
        {[0,1,2,3].map((i) => <circle key={i} cx={300 + Math.cos(i*1.57)*230} cy={300 + Math.sin(i*1.57)*72} r={i%2?4:3} fill="#a0f5ff" opacity=".8" />)}
      </motion.svg>
    </div>
  );
}
