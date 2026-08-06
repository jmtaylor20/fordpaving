"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type Props = {
  dark?: boolean;
  title?: string;
  id?: string;
};

export function EstimateForm({
  dark = false,
  title = "Tell us about your pavement",
  id = "estimate",
}: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });

      if (!response.ok) {
        throw new Error("Estimate request could not be submitted.");
      }

      window.sessionStorage.setItem("ford-estimate-submitted", "true");
      window.location.assign("/thank-you/");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      id={id}
      className={`estimate-form${dark ? " estimate-form--dark" : ""}`}
      name="free-estimate"
      method="POST"
      action="/thank-you/"
      data-netlify="true"
      netlify-honeypot="company-website"
      onSubmit={submitForm}
    >
      <input type="hidden" name="form-name" value="free-estimate" />
      <div className="hidden-field" aria-hidden="true">
        <label>
          Leave this empty
          <input name="company-website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="form-heading">
        <span className="eyebrow">Free estimate</span>
        <h2>{title}</h2>
        <p>Share a few details. We’ll follow up to discuss the right next step.</p>
      </div>
      <div className="field-grid">
        <label>
          Name
          <input name="name" autoComplete="name" required placeholder="Your name" />
        </label>
        <label>
          Phone
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            placeholder="Best number to reach you"
          />
        </label>
        <label>
          Email
          <input name="email" type="email" autoComplete="email" required placeholder="you@email.com" />
        </label>
        <label>
          Service
          <select name="service" defaultValue="" required>
            <option value="" disabled>
              Select a service
            </option>
            <option>Asphalt paving</option>
            <option>Sealcoating</option>
            <option>Striping / thermoplastic</option>
            <option>Driveway</option>
            <option>Parking lot</option>
            <option>Patching / repair</option>
            <option>Not sure yet</option>
          </select>
        </label>
        <label className="field-full">
          Project details
          <textarea
            name="message"
            rows={4}
            placeholder="Tell us about the property, surface, and timing."
          />
        </label>
      </div>
      <button className="button button--primary form-submit" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Request my free estimate"}
        <span aria-hidden="true">↗</span>
      </button>
      <p className="form-note">
        {status === "error"
          ? "Something interrupted the form. Please call 334.703.1949."
          : "No pressure. Just a straightforward conversation about your project."}
      </p>
      <p className="form-privacy">
        By submitting this form, you acknowledge our <Link href="/privacy-policy/">Privacy Policy</Link>.
      </p>
    </form>
  );
}
