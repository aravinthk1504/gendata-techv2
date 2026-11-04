"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

// Explicit render handles Next.js client navigation and token reset after submit.
export default function ContactTurnstile({ siteKey, onTokenChange, resetKey }) {
  const ref = useRef(null);
  const callback = useRef(onTokenChange);
  const [ready, setReady] = useState(false);

  useEffect(() => { callback.current = onTokenChange; }, [onTokenChange]);

  useEffect(() => {
    if (!ready || !siteKey || !ref.current || !window.turnstile) return;
    const container = ref.current;
    const widgetId = window.turnstile.render(container, {
      sitekey: siteKey,
      action: "contact",
      theme: "light",
      callback: token => callback.current(token),
      "expired-callback": () => callback.current(""),
      "error-callback": () => callback.current(""),
    });
    return () => {
      callback.current("");
      try { window.turnstile?.remove(widgetId); } catch {}
    };
  }, [ready, siteKey, resetKey]);

  return (
    <div aria-label="Spam protection verification">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => setReady(true)}
      />
      <div ref={ref} />
    </div>
  );
}
