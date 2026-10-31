"use client";
import {useEffect,useState} from "react";
import {motion,useReducedMotion} from "motion/react";
import {FiBookOpen,FiCode,FiCpu,FiCheckCircle} from "react-icons/fi";

const tracks=[
 {label:"AI & ML",modules:["Python fundamentals","Machine learning","Model evaluation","Practical AI project"]},
 {label:"Data Science",modules:["Data preparation","Visualization","Statistical analysis","Data project"]},
 {label:"IoT",modules:["Device programming","Sensor integration","Connectivity","IoT project"]}
];
export default function TrainingHeroDashboard({active=true}){
 const [selected,setSelected]=useState(0);
 const reduced=useReducedMotion();
 useEffect(()=>{
  if(!active||reduced)return;
  const id=setInterval(()=>setSelected(n=>(n+1)%tracks.length),6000);
  return ()=>clearInterval(id);
 },[active,reduced]);
 return <div className="w-full rounded-2xl border border-cyan-400/20 bg-[#06182e]/95 p-4 shadow-[0_22px_65px_rgba(5,124,250,0.12)]" aria-label="Training course preview">
  <div className="mb-4 flex items-center justify-between gap-2">
   <div><p className="text-sm font-semibold text-white">Learning Workspace</p><p className="text-[10px] text-slate-400">Practical technology learning</p></div>
   <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2 py-1 text-[10px] text-cyan-200">Explore</span>
  </div>
  <div className="mb-4 flex flex-wrap gap-2" role="tablist" aria-label="Training preview topics">
   {tracks.map((track,i)=><button key={track.label} type="button" role="tab" aria-selected={selected===i} onClick={()=>setSelected(i)} className={`rounded-lg px-3 py-2 text-[11px] font-semibold transition-colors ${selected===i?"bg-[#057CFA] text-white":"border border-white/10 text-slate-300 hover:bg-white/10"}`}>{track.label}</button>)}
  </div>
  <div className="rounded-xl border border-white/10 bg-[#0a2340] p-4">
   <div className="mb-3 flex items-center justify-between"><p className="text-xs font-semibold text-white">Learning topics</p><span className="text-[10px] text-cyan-300">04 topics</span></div>
   {tracks[selected].modules.map((item,i)=><div key={item} className="mb-3 last:mb-0">
    <div className="mb-1 flex items-center gap-2"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#14375a] text-[10px] text-cyan-200">{String(i+1).padStart(2,"0")}</span><span className="flex-1 text-[11px] text-slate-200">{item}</span>{i===0?<FiCheckCircle className="text-cyan-400" size={13}/>:null}</div>
    <div className="ml-8 h-1 overflow-hidden rounded-full bg-white/10"><motion.div key={selected+"-"+i} className="h-full rounded-full bg-gradient-to-r from-[#057CFA] to-cyan-400" initial={{width:"0%"}} animate={{width:`${35+i*15}%`}} transition={{duration:reduced?0:1,delay:reduced?0:i*.18}}/></div>
   </div>)}
  </div>
  <div className="mt-3 grid grid-cols-3 gap-2">
   {[[FiBookOpen,"Learn"],[FiCode,"Practice"],[FiCpu,"Build"]].map(([Icon,label])=><div key={label} className="flex items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2 py-2.5"><Icon size={13} className="text-cyan-300"/><span className="text-[10px] font-medium text-slate-200">{label}</span></div>)}
  </div>
  <p className="mt-3 text-center text-[9px] text-slate-500">Illustrative training topics</p>
 </div>;
}
