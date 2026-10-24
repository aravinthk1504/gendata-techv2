"use client";

import { useId } from "react";

// Decorative neural network only. Static, deterministic SVG; no GPU or layout shifts.
export default function NeuralBackground() {
  const id = useId().replace(/:/g, "");
  const nodes = Array.from({ length: 34 }, (_, i) => {
    const x = 65 + (i * 137) % 820;
    const y = 45 + (i * 83 + Math.floor(i / 5) * 41) % 460;
    return { x, y };
  });
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_76%_48%,rgba(0,91,210,.16),transparent_55%)]" />
      <svg viewBox="0 0 960 560" preserveAspectRatio="xMidYMid slice"
        className="absolute right-[-30%] top-0 h-full w-[115%] opacity-30 sm:right-[-12%] sm:w-[85%] sm:opacity-45 lg:right-[-5%] lg:w-[66%]">
        <defs>
          <linearGradient id={id+"wire"} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#057CFA" stopOpacity=".1" />
            <stop offset=".6" stopColor="#37C7FF" stopOpacity=".55" />
            <stop offset="1" stopColor="#057CFA" stopOpacity=".12" />
          </linearGradient>
        </defs>
        {nodes.map((node, i) => {
          const neighbor = nodes[(i * 7 + 9) % nodes.length];
          return <path key={i} d={`M ${node.x} ${node.y} L ${neighbor.x} ${neighbor.y}`}
            stroke={`url(#${id}wire)`} strokeWidth=".7" opacity=".5" />;
        })}
        {nodes.map((node, i) => (
          <g key={i}>
            <circle cx={node.x} cy={node.y} r={i % 8 === 0 ? 3.5 : 1.8}
              fill={i % 5 === 0 ? "#8cecff" : "#168dff"} opacity={i % 4 === 0 ? ".85" : ".55"} />
            {i % 9 === 0 && <circle cx={node.x} cy={node.y} r="9" fill="none" stroke="#0589ff" strokeOpacity=".24" strokeWidth="1" />}
          </g>
        ))}
      </svg>
      <div className="absolute inset-0 bg-gradient-to-r from-[#030b18]/95 via-[#030b18]/55 to-transparent" />
    </div>
  );
}
