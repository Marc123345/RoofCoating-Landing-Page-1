import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import PageHero from "../components/PageHero";
import CtaBand from "../components/CtaBand";
import Reveal from "../components/Reveal";
import { process, roofTypes, systems, SITE } from "../lib/content";

export const metadata: Metadata = {
  title: `Commercial Roof Coating Systems | ${SITE.brand}`,
  description:
    "Silicone, acrylic and polyurethane roof coating systems for TPO, EPDM, PVC, metal, modified bitumen and built-up commercial roofs. Manufacturer warranties up to 20 years.",
};

export default function RoofCoatingPage() {
  return (
    <>
      <Reveal />
      <SiteHeader solid />

      <PageHero
        eyebrow="What We Do"
        title={<>Roof Coating Systems, <em>Specified For Your Roof</em></>}
        lead="Coating is not one product. The right system depends on how your roof drains, what it is made of, and what lives on top of it. Here is what we install and when each one is the correct call."
        image="https://ik.imagekit.io/qcvroy8xpd/Sylicone.jpeg?updatedAt=1776009369481"
      />

      <section className="sys-s">
        <div className="wrap">
          <div className="tag rv"><span>Coating Systems</span></div>
          <h2 className="h2 rv d1">Three Systems. <em>One Honest Recommendation.</em></h2>
          <p className="body-t rv d2">
            We are not tied to a single manufacturer, so the recommendation follows the roof
            rather than whatever is in the warehouse.
          </p>

          <div className="sys-grid">
            {systems.map((s, i) => (
              <article key={s.name} className={`sys-card rv${i > 0 ? " d" + i : ""}`}>
                <div className="sys-card-top">
                  <h3>{s.name}</h3>
                  <span className="sys-life">{s.life}</span>
                </div>
                <div className="sys-best">Best for: {s.best}</div>
                <p>{s.body}</p>
                <ul className="sys-points">
                  {s.points.map((p) => (
                    <li key={p}>
                      <i className="fas fa-check" aria-hidden="true"></i>
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ind-s">
        <div className="wrap">
          <div className="ind-head">
            <div>
              <div className="tag rv"><span>What We Coat</span></div>
              <h2 className="h2 rv d1">Every Roof System — <em>Restored, Not Replaced</em></h2>
              <p className="body-t rv d2">
                If your commercial roof is one of these, coating is almost certainly the smarter
                decision — and we have sealed thousands of them.
              </p>
            </div>
            <div className="ind-counter rv d2">
              <span className="ind-counter-n">1,200+</span>
              <span className="ind-counter-l">Roofs Coated</span>
              <span className="ind-counter-sub">Across 14 industries &middot; 8 states</span>
            </div>
          </div>

          <div className="ind-grid">
            {roofTypes.map((r, i) => (
              <div key={r.title} className={`ind-card rv${i > 0 ? " d" + (i % 5 || 1) : ""}`}>
                <div className="ind-ic"><i className={`fas ${r.icon}`} aria-hidden="true"></i></div>
                <h3>{r.title}</h3>
                <div className="ind-stat">{r.stat}</div>
                <p>{r.sub}</p>
              </div>
            ))}
          </div>

          <p className="rv d3 ind-note">
            Not sure what you have? Send a photo when you book — we will confirm during the inspection.
          </p>
        </div>
      </section>

      <section className="proc-s">
        <div className="wrap">
          <div className="proc-head">
            <div className="tag rv"><span>The Process</span></div>
            <h2 className="h2 rv d1">Leaky Roof to <em>Bone-Dry</em> in 3 Days Flat</h2>
            <p className="body-t rv d2">
              1,200+ roofs coated. Three steps. Zero surprises. Zero change orders.
            </p>
          </div>
          <ol className="proc-steps proc-steps-wide">
            {process.map((p, i) => (
              <li key={p.n} className={`psc rv${i > 0 ? " d" + i : ""}`}>
                <div className="psc-n">{p.n}</div>
                <div className="psc-body">
                  <div className="psc-head">
                    <h3>{p.t}</h3>
                    <span className="psc-time">{p.time}</span>
                  </div>
                  <p>{p.d}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="rv ind-note">
            Want the numbers behind the decision? See{" "}
            <Link href="/why-coating" className="ilink">coating versus replacement</Link>.
          </p>
        </div>
      </section>

      <CtaBand />
      <SiteFooter />
    </>
  );
}
