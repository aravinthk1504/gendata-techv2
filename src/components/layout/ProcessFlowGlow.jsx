"use client"

import { motion, useReducedMotion } from "motion/react"

/**
 * A single travelling glow that crosses the complete process timeline.
 * Only visible when the numbered steps are arranged in one horizontal row.
 * The percentage is relative to the 18%-wide travelling segment:
 * 570% carries that segment beyond the right end of its parent line.
 */
export default function ProcessFlowGlow({ breakpoint = "lg", columns }) {
  const reduceMotion = useReducedMotion()
  const showAt = breakpoint === "xl" ? "xl:block" : "lg:block"
  // Match the centers of 40px step markers in a gap-5 CSS grid.
  // Each marker sits at the start of a column; the line must stop at
  // the center of the last marker, not the far right of the grid.
  const lineStyle = columns
    ? {
        left: "20px",
        right: `calc(${100 / columns}% - ${20 + (20 * (columns - 1)) / columns}px)`,
      }
    : undefined

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 top-5 hidden h-px overflow-hidden ${showAt}`}
      style={lineStyle}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#057CFA]/25 to-transparent" />
      {!reduceMotion && (
        <motion.span
          className="absolute left-0 top-0 h-px w-[18%] bg-gradient-to-r from-transparent via-[#057CFA] to-transparent shadow-[0_0_14px_rgba(5,124,250,0.85)]"
          initial={{ x: "-100%" }}
          animate={{ x: ["-100%", "570%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      )}
    </div>
  )
}
