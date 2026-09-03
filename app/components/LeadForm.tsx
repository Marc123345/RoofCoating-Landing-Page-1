"use client";

import { useEffect } from "react";
import { SITE } from "../lib/content";

/**
 * The Jotform card form. It redirects to /thank-you on submit, which is what
 * makes the Meta "Lead" conversion trackable.
 *
 * The wrapper crop lives in .form-embed (globals.css): Jotform always renders a
 * .jfWelcome-wrapper banner showing the form title and exposes no setting to
 * turn it off, so the iframe is pulled up inside a clipping container.
 */
export default function LeadForm() {
  useEffect(() => {
    const s1 = document.createElement("script");
    s1.src = "https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js";
    s1.onload = () => {
      const s2 = document.createElement("script");
      s2.innerHTML = `window.jotformEmbedHandler("iframe[id='JotFormIFrame-${SITE.formId}']", "https://form.jotform.com/")`;
      document.body.appendChild(s2);
    };
    document.body.appendChild(s1);
    return () => s1.remove();
  }, []);

  return (
    <div className="form-embed">
      <iframe
        id={`JotFormIFrame-${SITE.formId}`}
        title={SITE.brand}
        allow="geolocation; microphone; camera; fullscreen; payment"
        src={`https://form.jotform.com/${SITE.formId}`}
        frameBorder={0}
        style={{ minWidth: "100%", maxWidth: "100%", border: "none" }}
        scrolling="no"
      />
    </div>
  );
}
