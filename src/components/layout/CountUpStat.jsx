"use client";
import {useEffect,useRef,useState} from "react";
import {useInView,useReducedMotion} from "motion/react";
export default function CountUpStat({value=0,suffix="",className=""}){
 const ref=useRef(null);const visible=useInView(ref,{once:true,amount:0.3});const reduced=useReducedMotion();
 const [number,setNumber]=useState(1);
 // With reduced motion (or nothing to count) the final value is shown directly.
 const instant=visible&&(reduced||value<=1);
 useEffect(()=>{if(!visible||instant)return;
 let id,started;const duration=1400;
 function tick(t){if(started===undefined)started=t;const progress=Math.min((t-started)/duration,1);setNumber(Math.max(1,Math.round(1+(value-1)*(1-Math.pow(1-progress,3)))));if(progress<1)id=requestAnimationFrame(tick)}
 id=requestAnimationFrame(tick);return()=>cancelAnimationFrame(id);
 },[visible,value,reduced,instant]);
 return <span ref={ref} className={className} aria-label={value+suffix}>{instant?value:number}{suffix}</span>;
}
