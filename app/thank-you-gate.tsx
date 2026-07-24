"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function ThankYouGate() {
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    setAllowed(window.sessionStorage.getItem("ford-estimate-submitted") === "true");
  }, []);

  if (allowed === null) {
    return <div className="gate-loading" aria-label="Loading" />;
  }

  if (!allowed) {
    return (
      <div className="gate-card">
        <span className="eyebrow">Estimate requests only</span>
        <h1>This page follows a submitted estimate request.</h1>
        <p>Ready to talk pavement? Start with the quick form and we’ll take it from there.</p>
        <Link className="button button--primary" href="/contact">
          Request an estimate <span aria-hidden="true">↗</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="gate-card gate-card--success">
      <div className="success-mark" aria-hidden="true">
        ✓
      </div>
      <span className="eyebrow">Request received</span>
      <h1>Thank you. Your project is on our radar.</h1>
      <p>
        We received your estimate request and will follow up using the contact information you
        provided.
      </p>
      <div className="button-row">
        <Link className="button button--primary" href="/">
          Return home
        </Link>
        <a className="button button--outline" href="tel:+13347031949">
          Call 334.703.1949
        </a>
      </div>
    </div>
  );
}

