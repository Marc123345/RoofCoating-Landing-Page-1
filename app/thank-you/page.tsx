import type { Metadata } from "next";
import Link from "next/link";
import ConversionPixel from "./ConversionPixel";

export const metadata: Metadata = {
  title: "Thanks — we've got your request | Roof Coat Pros",
  description: "We've received your free roof assessment request and will be in touch shortly.",
  robots: { index: false, follow: false },
};

/**
 * Jotform redirects here after a submission, which is what makes the Meta
 * "Lead" conversion trackable — it fires on a URL only reachable post-submit.
 */
export default function ThankYouPage() {
  return (
    <>
      <ConversionPixel />
      <main className="ty-root">
        <div className="ty-card">
          <div className="ty-tick" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="34" height="34" fill="none">
              <path
                d="M4 12.5l5 5L20 6.5"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h1>Request received.</h1>
          <p className="ty-lead">
            Thanks — your free roof assessment request is in. One of our team
            will call you shortly to book a time that works.
          </p>

          <ol className="ty-steps">
            <li>
              <span>1</span>
              We call to confirm the details and arrange the site visit.
            </li>
            <li>
              <span>2</span>
              We inspect the roof and take measurements — no charge, no
              obligation.
            </li>
            <li>
              <span>3</span>
              You get a written scope and price, with the coating options and
              warranty explained.
            </li>
          </ol>

          <p className="ty-note">
            Nothing needed from you in the meantime. If it&apos;s urgent, call
            us and we&apos;ll bring the visit forward.
          </p>

          <Link className="ty-back" href="/">
            Back to the site
          </Link>
        </div>
      </main>
    </>
  );
}
