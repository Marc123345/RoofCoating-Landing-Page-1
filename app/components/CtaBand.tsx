import Link from "next/link";
import { SITE } from "../lib/content";

export default function CtaBand({
  heading = "Find out what your roof actually needs.",
  sub = "A free inspection takes an hour and comes back with a written report and a fixed number. If coating is the wrong call for your roof, we will tell you that instead.",
}: {
  heading?: string;
  sub?: string;
}) {
  return (
    <section className="cta-band">
      <div className="wrap cta-band-i">
        <div>
          <h2 className="h2 h2-w">{heading}</h2>
          <p className="body-t body-t-w">{sub}</p>
        </div>
        <div className="cta-band-act">
          <Link href="/contact" className="btn-p">Book a Free Inspection</Link>
          <a href={SITE.phoneHref} className="btn-o btn-ow">
            <i className="fas fa-phone-alt" style={{ marginRight: 8 }} aria-hidden="true"></i>
            {SITE.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
