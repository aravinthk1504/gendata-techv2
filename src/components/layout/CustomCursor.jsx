"use client"

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = {
    damping: 28,
    stiffness: 350,
    mass: 0.5,
  };

  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (event) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      setVisible(true);
    };

    const handleMouseOver = (event) => {
      const target = event.target.closest(
        "a, button, [data-cursor='interactive']",
      );

      setHovering(Boolean(target));
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave,
      );
    };
  }, [mouseX, mouseY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-9999 hidden md:block">
      {/* Main cursor dot */}
      <motion.div
        className="absolute h-2 w-2 rounded-full bg-white mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
      />

      {/* Following ring */}
      <motion.div
        className="absolute rounded-full border border-brand-accent/70"
        animate={{
          width: hovering ? 54 : 34,
          height: hovering ? 54 : 34,
          backgroundColor: hovering
            ? "rgba(5, 124, 250, 0.12)"
            : "rgba(5, 124, 250, 0)",
        }}
        transition={{
          duration: 0.2,
        }}
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
      />
    </div>
  );
}

export default CustomCursor;
