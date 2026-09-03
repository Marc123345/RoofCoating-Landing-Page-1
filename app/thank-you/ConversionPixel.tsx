"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Fires the Meta "Lead" conversion.
 *
 * The base pixel (965452662747636) is initialised in the root layout and tracks
 * PageView on every page; this adds the conversion event, and only here — this
 * page is only reachable via Jotform's post-submit redirect.
 *
 * Guarded against double-firing on a re-render or a back-forward restore.
 */
/**
 * Module scope, so it survives React's StrictMode double-invoke of effects
 * within a single page load. Without this the Lead event fires twice and every
 * conversion is double-counted in Ads Manager.
 */
let firedThisLoad = false;

export default function ConversionPixel() {
  useEffect(() => {
    if (firedThisLoad) return;

    const KEY = "hr_lead_fired";
    try {
      // Also guards a back-forward restore onto this page.
      if (sessionStorage.getItem(KEY)) return;
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* private mode — fall through, the module flag still applies */
    }

    firedThisLoad = true;
    window.fbq?.("track", "Lead");

    // NOTE: Meta's *automatic event detection* also infers a Lead on this page
    // (those hits carry `es=automatic`). That means two Lead events per
    // conversion. This explicit call is the reliable one — turn automatic event
    // detection off for this pixel in Events Manager rather than removing it.
  }, []);

  return (
    <noscript>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        src="https://www.facebook.com/tr?id=965452662747636&ev=Lead&noscript=1"
        alt=""
      />
    </noscript>
  );
}
