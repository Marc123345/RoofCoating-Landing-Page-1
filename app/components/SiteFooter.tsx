import Link from "next/link";
import { NAV, SITE } from "../lib/content";
import { LogoMark } from "./SiteHeader";

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="fx-top">
          <div className="fx-brand">
            <div className="fx-lg">
              <LogoMark size={30} />
              <span>{SITE.brand}</span>
            </div>
            <p className="fx-blurb">
              {SITE.tagline}. We restore commercial flat and low-slope roofs with
              manufacturer-warrantied coating systems — no tear-off, no dumpsters, and
              a fraction of what replacement costs.
            </p>
            <div className="fx-stats">
              <div><strong>1,200+</strong><span>Roofs coated</span></div>
              <div><strong>20 yr</strong><span>Max warranty</span></div>
            </div>
          </div>

          <div className="fx-col">
            <h4>Pages</h4>
            <ul>
              {NAV.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="fx-col">
            <h4>What We Coat</h4>
            <ul>
              <li>TPO &amp; PVC membrane</li>
              <li>EPDM rubber</li>
              <li>Metal &amp; standing seam</li>
              <li>Modified bitumen</li>
              <li>Built-up tar &amp; gravel</li>
            </ul>
          </div>

          <div className="fx-col">
            <h4>Get In Touch</h4>
            <ul>
              <li><a href={SITE.phoneHref}>{SITE.phone}</a></li>
              <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li>{SITE.hours}</li>
            </ul>
            <Link href="/contact" className="btn-p btn-sm fx-cta">
              Book a Free Inspection
            </Link>
          </div>
        </div>
      </div>

      <div className="ft-btm">
        <div className="wrap">
          <div className="ft-btm-i">
            <span className="footer-lg">© 2026 {SITE.brand}. All Rights Reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
