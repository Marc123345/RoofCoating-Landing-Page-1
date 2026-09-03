"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, SITE } from "../lib/content";

export function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className="logo-mark" aria-hidden="true">
      <path d="M4 30 L20 10 L36 30" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="miter" strokeLinecap="square" />
      <line x1="8" y1="23" x2="32" y2="23" stroke="var(--amber)" strokeWidth="3" strokeLinecap="square" />
      <circle cx="32" cy="23" r="2.2" fill="var(--amber)" />
    </svg>
  );
}

/**
 * `solid` pins the light treatment on from the first pixel. Inner pages start
 * with a light band under the header, so the transparent-over-photo treatment
 * the home hero uses would render white-on-white there.
 */
export default function SiteHeader({ solid = false }: { solid?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // A route change must close the drawer, or the overlay traps the new page.
  useEffect(() => setOpen(false), [pathname]);

  const light = solid || scrolled;

  return (
    <nav className={`nav-m${light ? " sc" : ""}`} id="mainNav">
      <div className="nav-i">
        <Link href="/" className="nav-br">
          <LogoMark size={34} />
          <span className="nav-br-txt">{SITE.brand}</span>
        </Link>

        <ul className="nav-links">
          {NAV.map((l) => {
            const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <li key={l.href}>
                <Link href={l.href} className={`nav-link${active ? " on" : ""}`}>
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="nav-act">
          <a href={SITE.phoneHref} className="nav-ph">
            <i className="fas fa-phone-alt" aria-hidden="true"></i>
            {SITE.phone}
          </a>
          <Link href="/contact" className="btn-p nav-pill">
            Free Inspection
          </Link>
          <button
            className="nav-burger"
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <i className={`fas ${open ? "fa-times" : "fa-bars"}`} aria-hidden="true"></i>
          </button>
        </div>
      </div>

      {open && (
        <div className="nav-drawer">
          {NAV.map((l) => (
            <Link key={l.href} href={l.href} className="nav-drawer-link">
              {l.label}
            </Link>
          ))}
          <a href={SITE.phoneHref} className="nav-drawer-link nav-drawer-ph">
            <i className="fas fa-phone-alt" aria-hidden="true"></i> {SITE.phone}
          </a>
        </div>
      )}
    </nav>
  );
}
