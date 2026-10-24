"use client";

import { motion, useReducedMotion } from "motion/react";

// Responsive, layered glass architecture. No additional dependencies or WebGL.
// The shapes are kept separate so the hero copy is always selectable and readable.
export default function GlassArchitecture() {
  const reduceMotion = useReducedMotion();
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[590px] select-none" aria-hidden="true">
      <div className="absolute inset-[12%] rounded-full bg-[#087cff]/20 blur-[75px]" />
      <div className="absolute inset-x-[12%] bottom-[10%] h-[10%] rounded-[50%] bg-[#057cfa]/25 blur-[26px]" />
      <motion.div
        className="absolute inset-[9%] [perspective:850px]"
        animate={reduceMotion ? undefined : { y: [0,-10,0] }}
        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
      >
        <div className="absolute inset-[13%] [transform:rotateX(-12deg)_rotateY(-26deg)] [transform-style:preserve-3d]">
          <div className="absolute inset-0 border border-sky-200/70 bg-gradient-to-br from-cyan-100/15 via-blue-600/5 to-blue-500/20 shadow-[inset_0_0_48px_rgba(70,190,255,.1),0_0_26px_rgba(12,153,255,.2)]" />
          <div className="absolute inset-[0] [transform:translateZ(-65px)_translate(35px,-27px)] border border-blue-300/60 bg-cyan-500/5" />
          <div className="absolute inset-x-[0] top-0 h-[65px] [transform-origin:top] [transform:rotateX(-90deg)] border border-sky-200/60 bg-gradient-to-b from-cyan-200/20 to-transparent" />
          <div className="absolute bottom-0 right-0 top-0 w-[65px] [transform-origin:right] [transform:rotateY(90deg)] border border-blue-300/50 bg-blue-500/10" />
          <div className="absolute inset-[20%] [transform:translateZ(38px)] border border-cyan-200/65 bg-gradient-to-tr from-[#047cff]/35 via-cyan-300/15 to-transparent shadow-[0_0_35px_rgba(5,180,255,.25)]" />
          <div className="absolute inset-[31%] [transform:translateZ(90px)] border border-cyan-100/90 bg-gradient-to-br from-cyan-300/45 via-blue-600/10 to-[#047cff]/35 shadow-[0_0_42px_rgba(5,124,250,.55),inset_0_0_25px_rgba(80,225,255,.18)]" />
          <div className="absolute inset-x-[24%] top-[30%] h-px bg-cyan-200/80 shadow-[0_0_20px_4px_rgba(49,207,255,.6)]" />
          <div className="absolute inset-y-[23%] left-[50%] w-px bg-cyan-300/45 shadow-[0_0_14px_2px_rgba(12,184,255,.4)]" />
        </div>
      </motion.div>
      <div className="absolute left-[7%] top-[27%] h-px w-[14%] bg-gradient-to-r from-transparent to-[#5ddcff]/65" />
      <div className="absolute right-[5%] top-[42%] h-px w-[18%] bg-gradient-to-l from-transparent to-[#5ddcff]/65" />
      <div className="absolute left-[17%] top-[22%] h-1 w-1 rounded-full bg-[#8ee8ff] shadow-[0_0_13px_3px_rgba(50,170,255,.7)]" />
      <div className="absolute right-[11%] bottom-[26%] h-1 w-1 rounded-full bg-[#8ee8ff] shadow-[0_0_13px_3px_rgba(50,170,255,.7)]" />
    </div>
  );
}
