"use client";
import {motion,useReducedMotion} from "motion/react";

const productPaths=[
 "M50 187 C125 75 205 72 260 187 S395 300 470 187",
 "M50 187 C125 300 205 302 260 187 S395 75 470 187",
 "M88 187 C160 108 210 108 260 187 S360 266 432 187",
];
const aboutPaths=[
 "M260 44 C160 88 160 156 85 187 S160 286 260 330",
 "M260 44 C360 88 360 156 435 187 S360 286 260 330",
 "M85 187 C185 112 335 112 435 187",
 "M85 187 C185 262 335 262 435 187",
];
export default function TechHeroSculpture({variant="about",animate=true}){
 const reduce=useReducedMotion();
 const running=animate&&!reduce;
 const paths=variant==="products"?productPaths:aboutPaths;
 const nodes=variant==="products"?[[50,187],[150,117],[260,187],[370,257],[470,187]]:[[260,44],[85,187],[435,187],[260,330],[260,187]];
 return <div className="relative w-full max-w-[470px]" aria-label={variant==="products"?"Connected digital product pathways":"Intelligent technology network"} role="img">
  <div className="pointer-events-none absolute inset-[12%] rounded-full bg-cyan-500/10 blur-[65px]"/>
  <svg viewBox="0 0 520 374" className="relative w-full overflow-visible" fill="none" xmlns="http://www.w3.org/2000/svg">
   <defs>
    <linearGradient id={variant+"-beam"} x1="0" y1="0" x2="520" y2="374" gradientUnits="userSpaceOnUse"><stop stopColor="#002DCC"/><stop offset=".5" stopColor="#22D3EE"/><stop offset="1" stopColor="#057CFA"/></linearGradient>
    <filter id={variant+"-glow"} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"/></filter>
   </defs>
   {paths.map((d,i)=><g key={i}>
    <path d={d} stroke={"url(#"+variant+"-beam)"} strokeWidth="15" opacity=".17" filter={"url(#"+variant+"-glow)"}/>
    <path d={d} stroke={"url(#"+variant+"-beam)"} strokeWidth="2.5" opacity=".65"/>
    <motion.path d={d} stroke="#7DEBFF" strokeWidth="3" strokeLinecap="round" strokeDasharray="18 280" initial={{strokeDashoffset:280}} animate={running?{strokeDashoffset:[280,0]}:{strokeDashoffset:0}} transition={{duration:5+i,repeat:running?Infinity:0,ease:"linear",delay:i*.6}}/>
   </g>)}
   {nodes.map(([x,y],i)=><g key={i}>
     <circle cx={x} cy={y} r="17" fill="#057CFA" opacity=".12"/>
     <motion.circle cx={x} cy={y} r="5" fill="#8CEBFF" animate={running?{opacity:[.45,1,.45],r:[4,7,4]}:{opacity:1,r:5}} transition={{duration:2.6,delay:i*.45,repeat:running?Infinity:0}}/>
   </g>)}
   <rect x="211" y="155" width="98" height="64" rx="13" fill="#071A38" stroke="#3DCEFA" strokeOpacity=".6"/>
   <text x="260" y="181" textAnchor="middle" fill="#DAF8FF" fontSize="12" fontWeight="700">{variant==="products"?"PRODUCTS":"GENDATA"}</text>
   <text x="260" y="198" textAnchor="middle" fill="#77B9DD" fontSize="9">{variant==="products"?"LMS · CRM · ERP":"INTELLIGENCE"}</text>
  </svg>
  <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[.2em] text-cyan-100/60">{variant==="products"?"Connected product ecosystem":"Intelligence meets engineering"}</div>
 </div>;
}
