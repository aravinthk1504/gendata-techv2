"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

// Explicit rendering for Next.js client navigation; keep the widget mounted
// and reset the used token after a submission instead of re-mounting the iframe.
export default function ContactTurnstile({ siteKey, onTokenChange, resetKey }) {
  const container = useRef(null);
  const widgetId = useRef(null);
  const callback = useRef(onTokenChange);
  const [scriptReady, setScriptReady] = useState(false);
  const [status, setStatus] = useState("loading");

  useEffect(() => { callback.current = onTokenChange; }, [onTokenChange]);

  useEffect(() => {
    if (!scriptReady || !siteKey || !container.current || !window.turnstile) return;
    let active = true;
    try {
      const id = window.turnstile.render(container.current, {
        sitekey: siteKey,
        action: "contact",
        theme: "light",
        callback: token => {
          if (!active) return;
          callback.current(token);
          setStatus("complete");
        },
        "expired-callback": () => {
          if (!active) return;
          callback.current("");
          setStatus("expired");
        },
        "timeout-callback": () => {
          if (!active) return;
          callback.current("");
          setStatus("expired");
        },
        "error-callback": code => {
          if (!active) return true;
          callback.current("");
          console.warn("Turnstile verification error code", code);
          setStatus("error");
          return true;
        },
      });
      widgetId.current = id;
      setStatus("ready");
    } catch (error) {
      console.error("Turnstile widget rendering failed", error?.name || "unknown");
      setStatus("error");
    }
    return () => {
      active = false;
      callback.current("");
      const id = widgetId.current;
      widgetId.current = null;
      if (id != null) {
        try { window.turnstile?.remove(id); } catch {}
      }
    };
  }, [scriptReady, siteKey]);

  useEffect(() => {
    if (!resetKey || widgetId.current == null || !window.turnstile) return;
    try {
      window.turnstile.reset(widgetId.current);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }, [resetKey]);

  const notice = {
    loading: "Loading security verification…",
    ready: "Complete the security check if prompted.",
    complete: "Security check complete.",
    expired: "Security check expired. Please complete it again.",
    error: "Security verification couldn't load. Refresh the page or disable blocking extensions, then retry.",
  }[status];

  return (
    <div aria-label="Spam protection verification">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
        onError={() => {
          callback.current("");
          setStatus("error");
        }}
      />
      <div ref={container} />
      <p className="mt-2 text-xs text-slate-500" role="status" aria-live="polite">{notice}</p>
    </div>
  );
}
