"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

// Reusable progressive enhancement for the interactive service hero demos.
// Auto-cycle only when on screen and idle; manual selection always works.
export default function useHeroAutoCycle({ active = true, index, setIndex, count, delay = 5000 }) {
  const ref = useRef(null);
  const visible = useInView(ref, { margin: "-10% 0px -10% 0px" });
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const sync = () => setTabVisible(document.visibilityState === "visible");
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  useEffect(() => {
    if (!active || !visible || reduceMotion || hovered || focused || !tabVisible || count < 2) return;
    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % count), delay);
    return () => window.clearTimeout(timer);
  }, [active, visible, reduceMotion, hovered, focused, tabVisible, count, delay, index, setIndex]);

  const interactionProps = {
    ref,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onFocusCapture: () => setFocused(true),
    onBlurCapture: (event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
    },
  };

  return interactionProps;
}
