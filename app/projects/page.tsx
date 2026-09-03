import type { Metadata } from "next";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import PageHero from "../components/PageHero";
import CtaBand from "../components/CtaBand";
import Reveal from "../components/Reveal";
import ProjectVideos from "../components/ProjectVideos";
import { stats, workImages, SITE } from "../lib/content";

export const metadata: Metadata = {
  title: `Recent Commercial Roof Coating Projects | ${SITE.brand}`,
  description:
    "Finished commercial roof coating work — 1,200+ roofs sealed and warrantied in the last 12 months, with no tear-offs and no tenant disruption.",
};

export default function ProjectsPage() {
  return (
    <>
      <Reveal />
      <SiteHeader solid />

      <PageHero
        eyebrow="Recent Work"
        title={<>Real Roofs. Real Results. <em>Restored This Year.</em></>}
        lead="1,200+ commercial roofs sealed and warrantied in the last 12 months. Zero tear-offs, zero tenant disruption — just bone-dry roofs and six-figure savings."
        image="https://images.unsplash.com/photo-1632759145351-1d592919f522?w=1920&q=80"
      />

      <section className="pj-s">
        <div className="wrap">
          <div className="pj-stats rv">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="pj-stat-v">{s.val}</div>
                <div className="pj-stat-l">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="tag rv"><span>Project Gallery</span></div>
          <h2 className="h2 rv d1">Roofs We <em>Sealed This Year</em></h2>
          <p className="body-t rv d2">
            Every one of these was quoted for replacement first. Every one is still bone dry.
          </p>

          <div className="pj-grid">
            {workImages.map((file, i) => (
              <figure key={file} className={`pj-item zoom-in${i > 0 ? " d" + (i % 4 || 1) : ""}`}>
                <img
                  src={`https://ik.imagekit.io/qcvroy8xpd/${file}`}
                  alt="Completed commercial roof coating project"
                  loading="lazy"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="vid-s">
        <div className="wrap">
          <div className="tag rv"><span>On The Roof</span></div>
          <h2 className="h2 rv d1">Watch A Coating <em>Go Down</em></h2>
          <p className="body-t rv d2">
            Real project footage — surface prep through finished, warrantied membrane.
          </p>
          <ProjectVideos />
        </div>
      </section>

      <CtaBand
        heading="Your roof could be on this page next quarter."
        sub="Book the free inspection and we will tell you honestly whether coating is the right call for your building."
      />
      <SiteFooter />
    </>
  );
}
