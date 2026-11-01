"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

// Reusable progressive enhancement for the interactive service hero demos.
// Auto-cycle while visible, including during pointer hover and after mouse/touch selection.
export default function useHeroAutoCycle({ active = true, index, setIndex, count, delay = 3000 }) {
  const ref = useRef(null);
  const visible = useInView(ref, { margin: "-10% 0px -10% 0px" });
  const reduceMotion = useReducedMotion();
  const [focused, setFocused] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const sync = () => setTabVisible(document.visibilityState === "visible");
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  useEffect(() => {
    if (!active || !visible || reduceMotion || focused || !tabVisible || count < 2) return;
    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % count), delay);
    return () => window.clearTimeout(timer);
  }, [active, visible, reduceMotion, focused, tabVisible, count, delay, index, setIndex]);

  const interactionProps = {
    ref,
    // Only keyboard-visible focus pauses playback. Pointer clicks must not
    // leave a demo permanently paused after a manual selection.
    onPointerDownCapture: () => setFocused(false),
    onFocusCapture: (event) => setFocused(Boolean(event.target.matches?.(":focus-visible"))),
    onBlurCapture: (event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
    },
  };

  return interactionProps;
}
