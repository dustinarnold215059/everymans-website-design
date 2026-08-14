"use client";

import Script from "next/script";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { siteConfig } from "@/config/site.config";

/** Must match TURNSTILE_ACTION in lib/turnstile.ts. */
const ACTION = "contact";

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: {
          sitekey: string;
          action?: string;
          theme?: "light" | "dark" | "auto";
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        },
      ) => string;
      reset: (id?: string) => void;
      remove: (id?: string) => void;
    };
  }
}

/**
 * Cloudflare Turnstile widget.
 *
 * Renders nothing when no site key is configured, so the form still works with
 * the widget switched off. The token is handed up via `onToken`; the server
 * treats a missing token as a rejection once TURNSTILE_SECRET is set.
 *
 * Tokens are single-use and expire, hence the imperative `reset` exposed to the
 * parent — a failed submit must get a fresh token before retrying.
 */
export function Turnstile({
  onToken,
  resetRef,
}: {
  onToken: (token: string) => void;
  /** Parent sets this to a function that clears the token and re-challenges. */
  resetRef?: React.MutableRefObject<(() => void) | null>;
}) {
  const siteKey = siteConfig.turnstileSiteKey;
  const containerId = useId().replace(/:/g, "");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [scriptReady, setScriptReady] = useState(false);

  const render = useCallback(() => {
    if (!siteKey || !scriptReady) return;
    const el = containerRef.current;
    if (!el || !window.turnstile || widgetIdRef.current) return;

    widgetIdRef.current = window.turnstile.render(el, {
      sitekey: siteKey,
      action: ACTION,
      theme: "light",
      callback: (token) => onToken(token),
      "expired-callback": () => onToken(""),
      "error-callback": () => onToken(""),
    });
  }, [siteKey, scriptReady, onToken]);

  useEffect(() => {
    render();
    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [render]);

  useEffect(() => {
    if (!resetRef) return;
    resetRef.current = () => {
      onToken("");
      if (widgetIdRef.current && window.turnstile) window.turnstile.reset(widgetIdRef.current);
    };
    return () => {
      if (resetRef) resetRef.current = null;
    };
  }, [resetRef, onToken]);

  if (!siteKey) return null;

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="lazyOnload"
        onReady={() => setScriptReady(true)}
      />
      <div ref={containerRef} id={containerId} className="mt-1" />
    </>
  );
}
