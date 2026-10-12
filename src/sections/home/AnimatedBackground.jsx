"use client"

import { motion, useInView, useReducedMotion } from "motion/react"
import { useRef } from "react"

const nodes = [
  { x: "12%", y: "20%", delay: 0 },
  { x: "28%", y: "34%", delay: 0.6 },
  { x: "45%", y: "18%", delay: 1.2 },
  { x: "63%", y: "31%", delay: 0.3 },
  { x: "82%", y: "17%", delay: 1.5 },
  { x: "17%", y: "66%", delay: 1 },
  { x: "36%", y: "57%", delay: 0.2 },
  { x: "56%", y: "70%", delay: 1.7 },
  { x: "75%", y: "57%", delay: 0.8 },
  { x: "90%", y: "73%", delay: 1.3 },
]

function AnimatedBackground() {
  const backgroundRef = useRef(null)
  const isInView = useInView(backgroundRef, { margin: "-10% 0px -10% 0px" })
  const reduceMotion = useReducedMotion()
  const shouldAnimate = isInView && !reduceMotion

  return (
    <div ref={backgroundRef} className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#030b18]" />

      <motion.div
        animate={
          shouldAnimate
            ? { x: [0, 120, -40, 0], y: [0, -80, 60, 0], scale: [1, 1.12, 0.95, 1] }
            : { x: 0, y: 0, scale: 1 }
        }
        transition={{ duration: 22, repeat: shouldAnimate ? Infinity : 0, ease: "easeInOut" }}
        className="absolute -left-50 top-10 h-150 w-150 rounded-full bg-brand-primary/20 blur-[180px]"
      />

      <motion.div
        animate={
          shouldAnimate
            ? { x: [0, -100, 30, 0], y: [0, 80, -40, 0], scale: [1, 0.9, 1.15, 1] }
            : { x: 0, y: 0, scale: 1 }
        }
        transition={{ duration: 26, repeat: shouldAnimate ? Infinity : 0, ease: "easeInOut" }}
        className="absolute -right-40 top-0 h-140 w-140 rounded-full bg-brand-accent/15 blur-[190px]"
      />

      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at center, transparent 10%, #030b18 82%)",
        }}
      />

      <div className="absolute inset-0 opacity-70">
        {nodes.map((node, index) => (
          <motion.span
            key={index}
            className="absolute h-1.5 w-1.5 rounded-full bg-blue-300 shadow-[0_0_16px_rgba(96,165,250,0.9)]"
            style={{ left: node.x, top: node.y }}
            animate={
              shouldAnimate
                ? { opacity: [0.2, 1, 0.2], scale: [1, 1.8, 1] }
                : { opacity: 0.45, scale: 1 }
            }
            transition={{
              duration: 4,
              delay: node.delay,
              repeat: shouldAnimate ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div
        animate={shouldAnimate ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration: 55, repeat: shouldAnimate ? Infinity : 0, ease: "linear" }}
        className="absolute right-[8%] top-[18%] hidden h-150 w-150 rounded-full border border-blue-300/8 lg:block"
      >
        <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-brand-accent shadow-[0_0_24px_rgba(5,124,250,1)]" />
      </motion.div>
    </div>
  )
}

export default AnimatedBackground
