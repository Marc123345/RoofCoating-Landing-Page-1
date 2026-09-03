import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import PageHero from "../components/PageHero";
import CtaBand from "../components/CtaBand";
import Reveal from "../components/Reveal";
import { benefits, caseStudy, comparison, SITE } from "../lib/content";

export const metadata: Metadata = {
  title: `Roof Coating vs. Replacement | ${SITE.brand}`,
  description:
    "Coating runs $3–$5 per sq ft against $8–$14 for replacement, takes 1–3 days instead of weeks, and sends nothing to landfill. The full comparison, line by line.",
};

export default function WhyCoatingPage() {
  return (
    <>
      <Reveal />
      <SiteHeader solid />

      <PageHero
        eyebrow="Coat or Replace"
        title={<>The Case For Coating, <em>With The Numbers</em></>}
        lead="Most commercial roofs get torn off years before they need to be. If the deck underneath is structurally sound, replacement is usually spending six figures to solve a problem a coating solves for a fraction of it."
        image="https://ik.imagekit.io/qcvroy8xpd/Asyrc.png?updatedAt=1776008954670"
      />

      <section className="cmp-s">
        <div className="wrap">
          <div className="tag rv"><span>Line By Line</span></div>
          <h2 className="h2 rv d1">Replacement vs. <em>Coating</em></h2>
          <p className="body-t rv d2">
            Same roof, same waterproofing outcome, two very different invoices and timelines.
          </p>

          <div className="cmp-table rv d2" role="table" aria-label="Replacement compared with coating">
            <div className="cmp-row cmp-head" role="row">
              <span role="columnheader"></span>
              <span role="columnheader">Full Replacement</span>
              <span role="columnheader" className="cmp-win">Roof Coating</span>
            </div>
            {comparison.map((c) => (
              <div className="cmp-row" role="row" key={c.label}>
                <span role="cell" className="cmp-label">{c.label}</span>
                <span role="cell" className="cmp-bad">{c.replace}</span>
                <span role="cell" className="cmp-good">{c.coat}</span>
              </div>
            ))}
          </div>
          <p className="ind-note rv">
            Pricing reflects typical commercial flat-roof work. Your inspection returns a fixed
            number for your building, not a range.
          </p>
        </div>
      </section>

      <section className="ben-s">
        <div className="wrap">
          <div className="tag rv"><span>Why Smart Owners Choose Coating</span></div>
          <h2 className="h2 rv d1">Six Reasons It <em>Wins On Paper</em></h2>
          <div className="bg">
            {benefits.map((b, i) => (
              <div key={b.title} className={`bc zoom-in${i > 0 ? " d" + (i % 5 || 1) : ""}`}>
                <div className="b-ic-wrap">
                  <div className="b-ic-ring"></div>
                  <div className="b-ic"><i className={`fas ${b.icon}`} aria-hidden="true"></i></div>
                </div>
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="case-s">
        <div className="wrap">
          <div className="tag tag-light rv"><span>Case Study</span></div>
          <h2 className="h2 h2-w rv d1">
            How One Property Manager Saved <em>{caseStudy.saved}</em> — In One Phone Call
          </h2>
          <div className="cs-grid">
            <div className="cs-i zoom-in"><div className="cs-lb">Building</div><div className="cs-v">{caseStudy.size}</div><div className="cs-sub">Commercial office</div></div>
            <div className="cs-i zoom-in d1"><div className="cs-lb">Replacement Quote</div><div className="cs-v">{caseStudy.replacement}</div><div className="cs-sub">Full tear-off</div></div>
            <div className="cs-i zoom-in d2"><div className="cs-lb">Coating Cost</div><div className="cs-v">{caseStudy.coating}</div><div className="cs-sub">Silicone system</div></div>
            <div className="cs-i zoom-in d3"><div className="cs-lb">Total Saved</div><div className="cs-v hl">{caseStudy.saved}</div><div className="cs-sub">Zero leaks since</div></div>
          </div>
          <div className="row rv d3">
            <div className="col-lg-6">
              <p className="body-t body-t-w"><strong style={{ color: "#fff" }}>The situation:</strong> {caseStudy.situation}</p>
              <p className="body-t body-t-w"><strong style={{ color: "#fff" }}>Our solution:</strong> {caseStudy.solution}</p>
              <p className="body-t" style={{ color: "var(--amber)" }}><strong>Result:</strong> {caseStudy.result}</p>
            </div>
            <div className="col-lg-5 offset-lg-1">
              <div className="cq">
                <p>&ldquo;{caseStudy.quote}&rdquo;</p>
                <cite>
                  <strong>
                    <i className="fas fa-user-tie" style={{ marginRight: 6, fontSize: 11, color: "var(--amber)" }} aria-hidden="true"></i>
                    {caseStudy.author}
                  </strong>
                  <span>{caseStudy.role}</span>
                </cite>
              </div>
            </div>
          </div>
          <p className="ind-note rv" style={{ color: "rgba(255,255,255,.55)" }}>
            See more finished roofs on the <Link href="/projects" className="ilink">projects page</Link>.
          </p>
        </div>
      </section>

      <CtaBand
        heading="Get the number for your roof."
        sub="We inspect, measure, and come back with a fixed price and a written report — and an honest answer on whether coating is right for your building."
      />
      <SiteFooter />
    </>
  );
}
