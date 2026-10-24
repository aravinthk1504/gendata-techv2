"use client";

import { useId } from "react";

// Full-width decorative neural network with CSS/SVG motion and no frame-loop.
export default function NeuralBackground() {
  const id = useId().replace(/:/g, "");
  const nodes = Array.from({ length: 76 }, (_, i) => ({
    x: 28 + ((i * 173 + Math.floor(i / 9) * 59) % 1150),
    y: 25 + ((i * 101 + Math.floor(i / 7) * 43) % 630),
  }));
  const edges = nodes.flatMap((node, i) => {
    const candidates = nodes.map((other,j) => ({
      j, dist: Math.hypot(node.x-other.x, node.y-other.y)
    })).filter(item=>item.j!==i && item.j>i && item.dist<230);
    return candidates.sort((a,b)=>a.dist-b.dist).slice(0,2).map(item=>[i,item.j]);
  });

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_45%_48%,rgba(3,94,206,.19),transparent_73%)]" />
      <svg viewBox="0 0 1200 680" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full opacity-75">
        <defs>
          <linearGradient id={id+"wire"} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#057CFA" stopOpacity=".24" />
            <stop offset=".5" stopColor="#40CFFF" stopOpacity=".68" />
            <stop offset="1" stopColor="#057CFA" stopOpacity=".24" />
          </linearGradient>
        </defs>
        <g className="gd-neural-drift">
          {edges.map(([a,b],i)=>(
            <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
              stroke={`url(#${id}wire)`} strokeWidth={i%7===0?1.05:.65} opacity={i%5===0?.65:.36} />
          ))}
          {nodes.map((node,i)=>(
            <g key={i} className="gd-neural-node" style={{animationDelay:`${-(i%13)*.47}s`, animationDuration:`${3.8+(i%7)*.7}s`}}>
              <circle cx={node.x} cy={node.y} r={i%9===0?3.2:1.8}
                fill={i%4===0?"#a6efff":"#148aff"} />
              {i%11===0 && <circle cx={node.x} cy={node.y} r="8" fill="none" stroke="#19b9ff" strokeOpacity=".48" strokeWidth=".9" />}
            </g>
          ))}
        </g>
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(3,11,24,.52),transparent_75%)]" />
      <style jsx>{`
        .gd-neural-drift { animation: neural-drift 22s ease-in-out infinite alternate; transform-origin: center; }
        .gd-neural-node { animation: neural-blink 4s ease-in-out infinite; }
        @keyframes neural-drift { from { transform: translate(-9px, 5px); } to { transform: translate(10px, -7px); } }
        @keyframes neural-blink { 0%,100% { opacity:.38; } 45% {opacity:1;} 70% {opacity:.55;} }
        @media (prefers-reduced-motion: reduce) {
          .gd-neural-drift, .gd-neural-node { animation: none; }
        }
      `}</style>
    </div>
  );
}
