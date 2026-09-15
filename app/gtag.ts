// Google Ads (gtag.js) configuration and conversion helpers.
// Tag + conversion labels come from the Ford Paving LLC Google Ads account.

export const GA_TAG_ID = "AW-18375216584";

export const CONVERSIONS = {
  // "Estimate Form Submit": fires when the free-estimate form is submitted.
  form: "AW-18375216584/JXiuCKjE0eAcEMib_rlE",
  // "Click to call": fires when a visitor taps a tel: phone link.
  call: "AW-18375216584/r36RCK7E0eAcEMib_rlE",
} as const;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Report the free-estimate form conversion, then run `onDone` once the hit is
 * sent (or after a short fallback so navigation is never blocked).
 */
export function reportFormConversion(onDone: () => void) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    onDone();
    return;
  }

  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    onDone();
  };

  window.gtag("event", "conversion", {
    send_to: CONVERSIONS.form,
    value: 1.0,
    currency: "USD",
    event_callback: finish,
  });

  // Fallback in case event_callback is delayed or blocked.
  window.setTimeout(finish, 1000);
}

/** Report a click-to-call conversion (fire-and-forget; the dialer opens as normal). */
export function reportCallConversion() {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "conversion", {
    send_to: CONVERSIONS.call,
    value: 1.0,
    currency: "USD",
  });
}
