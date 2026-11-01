"use client";

import { useEffect, useState } from "react";

// Animate the large, blurred hero background glows only on desktop.
// This avoids expensive continuously animated filters on mobile devices.
export default function useDesktopHeroMotion(enabled) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(media.matches);
    update();

    if (media.addEventListener) {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }

    // Compatibility with older browsers.
    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  return Boolean(enabled && isDesktop);
}
