"use client";
import {motion,useReducedMotion} from "motion/react";

const flows={
 fullstack:{title:"FULL STACK",nodes:[["UI",85,100],["API",260,100],["DB",435,100]],edges:["M85 100 H260","M260 100 H435"],caption:"Frontend · Backend · Database"},
 web:{title:"RESPONSIVE WEB",nodes:[["Desktop",110,100],["Tablet",260,100],["Mobile",410,100]],edges:["M110 100 H260","M260 100 H410"],caption:"One website · Every screen"},
 software:{title:"SOFTWARE SYSTEM",nodes:[["Modules",105,70],["Core",260,110],["APIs",415,70],["Data",260,190]],edges:["M105 70 L260 110","M415 70 L260 110","M260 190 V110"],caption:"Integrated workflows"},
 app:{title:"MOBILE APPLICATION",nodes:[["Screen 01",100,110],["Screen 02",260,110],["Screen 03",420,110]],edges:["M100 110 H260","M260 110 H420"],caption:"Design · Interact · Deliver"},
 iot:{title:"CONNECTED DEVICES",nodes:[["Sensor",105,65],["Gateway",260,115],["Device",415,65],["Monitor",260,195]],edges:["M105 65 L260 115","M415 65 L260 115","M260 195 V115"],caption:"Sense · Connect · Monitor"}
};
export default function ServiceFlowVisual({variant="fullstack",active=true}){
 const reduced=useReducedMotion();
 const motionOn=active&&!reduced;
 const v=flows[variant]||flows.fullstack;
 return <div role="img" aria-label={v.title+" — "+v.caption} className="relative mx-auto w-full max-w-[460px]">
  <div className="absolute inset-[15%] rounded-full bg-[#057CFA]/10 blur-[55px]"/>
  <svg viewBox="0 0 520 285" className="relative w-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id={"flow-"+variant} x1="0" y1="0" x2="520" y2="260" gradientUnits="userSpaceOnUse"><stop stopColor="#057CFA"/><stop offset=".55" stopColor="#67E8F9"/><stop offset="1" stopColor="#057CFA"/></linearGradient></defs>
    {v.edges.map((d,i)=><g key={i}><path d={d} fill="none" stroke="#15558a" strokeWidth="2"/><motion.path d={d} fill="none" stroke={"url(#flow-"+variant+")"} strokeWidth="3" strokeLinecap="round" strokeDasharray="13 140" animate={motionOn?{strokeDashoffset:[140,0]}:{strokeDashoffset:0}} transition={{duration:3.2+i*.4,repeat:motionOn?Infinity:0,ease:"linear",delay:i*.35}}/></g>)}
    {v.nodes.map(([label,x,y],i)=><g key={label}><rect x={x-62} y={y-25} width="124" height="50" rx="12" fill="#071a35" stroke="#278ACB" strokeOpacity=".75"/><motion.rect x={x-62} y={y-25} width="124" height="50" rx="12" fill="none" stroke="#67E8F9" strokeWidth="1.5" animate={motionOn?{opacity:[.1,.75,.1]}:{opacity:.3}} transition={{duration:3,delay:i*.65,repeat:motionOn?Infinity:0}}/><text x={x} y={y+4} fill="#E5F7FF" textAnchor="middle" fontSize="12" fontWeight="600">{label}</text></g>)}
    <text x="260" y="255" textAnchor="middle" fill="#82BBD9" fontSize="11" letterSpacing="2">{v.title}</text>
  </svg>
 </div>;
}
