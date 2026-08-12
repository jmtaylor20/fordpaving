"use client";

import { useEffect } from "react";
import { reportCallConversion } from "./gtag";

/**
 * Fires a Google Ads click-to-call conversion whenever a visitor taps any
 * `tel:` link on the site. Uses a single delegated listener so every phone
 * link (header, footer, hero, service pages, thank-you page) is covered
 * automatically — no per-link wiring needed.
 */
export function CallConversionTracker() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const link = target?.closest?.('a[href^="tel:"]');
      if (link) reportCallConversion();
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return null;
}
