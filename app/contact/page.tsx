import type { Metadata } from "next";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import Reveal from "../components/Reveal";
import LeadForm from "../components/LeadForm";
import FaqAccordion from "../components/FaqAccordion";
import { faqs, process, SITE } from "../lib/content";

export const metadata: Metadata = {
  title: `Book a Free Roof Inspection | ${SITE.brand}`,
  description:
    "Book a free commercial roof inspection. We inspect, measure and come back with a written report and a fixed price — with an honest answer on whether coating is right for your roof.",
};

export default function ContactPage() {
  return (
    <>
      <Reveal />
      <SiteHeader solid />

      <section className="ct-s">
        <div className="wrap ct-lay">
          <div className="ct-text">
            <div className="tag"><span>Free Inspection</span></div>
            <h1 className="h2 ct-h1">
              Tell us about your roof. <em>We will tell you the truth.</em>
            </h1>
            <p className="body-t">
              The inspection takes an hour or two and costs nothing. You get a written report and a
              fixed number — and if coating is the wrong call for your roof, we will say so rather
              than sell you something that will not hold.
            </p>

            <ol className="ct-steps">
              {process.map((p) => (
                <li key={p.n}>
                  <span className="ct-step-n">{p.n}</span>
                  <div>
                    <strong>{p.t}</strong>
                    <span className="ct-step-t">{p.time}</span>
                  </div>
                </li>
              ))}
            </ol>

            <div className="ct-direct">
              <h3>Rather talk to someone?</h3>
              <a href={SITE.phoneHref} className="ct-line">
                <i className="fas fa-phone-alt" aria-hidden="true"></i>
                <span>{SITE.phone}</span>
              </a>
              <a href={`mailto:${SITE.email}`} className="ct-line">
                <i className="fas fa-envelope" aria-hidden="true"></i>
                <span>{SITE.email}</span>
              </a>
              <div className="ct-line ct-line-plain">
                <i className="fas fa-clock" aria-hidden="true"></i>
                <span>{SITE.hours}</span>
              </div>
            </div>
          </div>

          <div className="ct-form">
            <div className="ct-form-head">
              <h2>Request your free assessment</h2>
              <p>Seven quick questions. No obligation, no sales visit unless you ask for one.</p>
            </div>
            <LeadForm />
          </div>
        </div>
      </section>

      <section className="faq-s">
        <div className="wrap">
          <div className="faq-lay">
            <div className="faq-side">
              <div className="tag rv"><span>FAQ</span></div>
              <h2 className="h2 rv d1">Common Questions</h2>
              <p className="rv d2 faq-side-p">
                Can&apos;t find your answer? Send us the details and we will write back within 24 hours.
              </p>
            </div>
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
