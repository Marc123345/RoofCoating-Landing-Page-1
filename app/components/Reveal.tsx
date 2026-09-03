"use client";

import { useEffect } from "react";

/**
 * Drives the .rv / .zoom-in / .slide-* entrance animations on the inner pages.
 * LandingPage runs its own copy of this; the new routes mount this instead.
 *
 * Fails open on purpose: if the observer never fires, elements are revealed by
 * the timeout below rather than left permanently hidden.
 */
export default function Reveal() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>(".rv, .zoom-in, .slide-left, .slide-right")
    );
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((x) => {
          if (x.isIntersecting) {
            x.target.classList.add("vis");
            io.unobserve(x.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));

    // Safety net: lazy images can settle after the observer has already run, so
    // anything still hidden a moment later gets shown regardless.
    const t = window.setTimeout(() => els.forEach((el) => el.classList.add("vis")), 2500);

    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  return null;
}
