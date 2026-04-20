"use client";

import { useEffect, useState, MouseEvent } from "react";

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [showMobile, setShowMobile] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
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
    document.querySelectorAll(".rv").forEach((el) => io.observe(el));

    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      setShowMobile(window.scrollY > 500);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const smoothScroll = (e: MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href");
    if (href && href.startsWith("#")) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const toggleFaq = (i: number) => setOpenFaq(openFaq === i ? null : i);

  const LogoMark = ({ size = 34 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" className="logo-mark" aria-hidden="true">
      <path d="M4 30 L20 10 L36 30" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="miter" strokeLinecap="square" />
      <line x1="8" y1="23" x2="32" y2="23" stroke="var(--amber)" strokeWidth="3" strokeLinecap="square" />
      <circle cx="32" cy="23" r="2.2" fill="var(--amber)" />
    </svg>
  );

  const faqs = [
    {
      q: "How long does a roof coating last?",
      a: "A properly applied silicone coating lasts 15–20 years. With a maintenance recoat, you can extend indefinitely — without ever tearing it off.",
    },
    {
      q: "Is my roof a good candidate?",
      a: "Most flat and low-slope roofs qualify if the deck is structurally sound. We determine this during our free inspection. If coating isn't right, we'll tell you.",
    },
    {
      q: "Silicone vs. acrylic — what's the difference?",
      a: "Silicone handles ponding water and UV better — ideal for flat roofs. Acrylic is more affordable for sloped metal roofs. We recommend based on your situation.",
    },
    {
      q: "Will coating fix my current leaks?",
      a: "Yes. We repair all damage before applying the coating. The system then seals the entire roof surface.",
    },
    {
      q: "Do I need to vacate during application?",
      a: "No. No tear-off, minimal noise, no structural work. Business continues as normal.",
    },
  ];

  const benefits = [
    { icon: "fa-dollar-sign", title: "Save up to 75% vs. Replacement", body: "Average replacement: $8–$14/sq ft. Coating: $3–$5. On a 20,000 sq ft roof, that's $100K+ saved." },
    { icon: "fa-volume-mute", title: "Zero Business Disruption", body: "No tear-off. No noise. No closed parking. Tenants won't know we're there." },
    { icon: "fa-shield-alt", title: "15–20 Year Manufacturer Warranty", body: "Backed by the manufacturer, not just our word. Transferable for property sales." },
    { icon: "fa-thermometer-quarter", title: "Energy Cost Reduction", body: "Reflective coatings cut rooftop temps by up to 60°F. Cooling costs drop 15–25%." },
    { icon: "fa-leaf", title: "Environmentally Responsible", body: "Keep 20+ tons of roofing material out of the landfill. Coating restores — doesn't replace." },
    { icon: "fa-clock", title: "Installed in 1–3 Days", body: "Most commercial roofs fully coated in 1–3 working days. Leak-free by end of week." },
  ];

  const process = [
    { n: "01", t: "Free Roof Inspection", time: "1–2 hrs", d: "We inspect your roof, identify damage, measure area, and determine if coating is right. Written report, no obligation." },
    { n: "02", t: "Custom Coating Plan", time: "24–48 hrs", d: "We recommend the right system — silicone, acrylic, or hybrid — based on roof type, climate, and budget. Fixed-price quote." },
    { n: "03", t: "Professional Application", time: "1–3 days", d: "Certified crew cleans, repairs, primes, and applies the coating. Every step documented with photos." },
    { n: "04", t: "Walkthrough + Warranty", time: "Same day", d: "We walk the finished roof with you, deliver manufacturer warranty docs, and schedule your first maintenance check." },
  ];

  const comparison = [
    ["Manufacturer-certified applicators", "Self-trained, no certification"],
    ["Written manufacturer warranty", "Verbal promise or contractor-only"],
    ["Full surface prep: clean, repair, prime, coat", "Spray over dirt and damage"],
    ["Photo documentation of entire process", "No documentation provided"],
    ["Free inspection before commitment", "Pressure to sign on the spot"],
    ["Fixed pricing — no change orders", "Low bid that grows after signing"],
  ];

  const testimonials = [
    { txt: `"I was skeptical that coating could fix our 22-year-old flat roof. Three years later — zero leaks. Saved us over $90K compared to the replacement quote."`, nm: "Robert M.", rl: "Building Owner", tag: "Skeptic Converted", initials: "RM", av: "av-1" },
    { txt: `"They were in and out in two days. Our tenants didn't even know work was being done. Professional, clean, communicated every step."`, nm: "Patricia L.", rl: "Property Manager", tag: "Zero Disruption", initials: "PL", av: "av-2" },
    { txt: `"What sold me was the manufacturer warranty. Not a handshake — a 20-year document I can transfer when I sell."`, nm: "James K.", rl: "Commercial Investor", tag: "Warranty Proof", initials: "JK", av: "av-3" },
  ];

  return (
    <>
      <nav className={`nav-m${scrolled ? " sc" : ""}`} id="mainNav">
        <div className="nav-i">
          <a href="#" className="nav-br" onClick={smoothScroll}>
            <LogoMark size={34} />
            <span className="nav-br-txt">Roof Coat</span>
          </a>
        </div>
      </nav>

      <section className="hero" id="hero">
        <svg className="hero-lines" viewBox="0 0 1440 900" preserveAspectRatio="none">
          <line x1="0" y1="0" x2="1440" y2="900" stroke="rgba(200,16,46,.06)" strokeWidth="1" />
          <line x1="1440" y1="0" x2="0" y2="900" stroke="rgba(255,255,255,.02)" strokeWidth="1" />
          <path d="M0 220 L720 40 L1440 220" fill="none" stroke="rgba(200,16,46,.08)" strokeWidth="1" />
        </svg>
        <div className="hero-cut">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ height: 80 }}>
            <polygon points="0,80 1440,80 1440,0" fill="var(--white)" />
          </svg>
        </div>
        <div className="wrap" style={{ width: "100%" }}>
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="hero-badge rv">
                <div className="dot"></div>
                <span>Serving [City/Region] Since 2011</span>
              </div>
              <h1 className="rv d1 hero-h1-stat">
                <span className="hero-stat-big">91% of commercial roofs</span> don't need replacement.{" "}
                <span className="ul">They need restoration.</span>
              </h1>
              <p className="hero-sub rv d2">
                Silicone coating restores flat, metal, and modified bitumen roofs in 1–3 days — saving building owners up to 75% vs. replacement, backed by manufacturer warranties up to 20 years.
              </p>
              <div className="hero-stats rv d3">
                <div><div className="stat-n">1,200+</div><div className="stat-l">Roofs Coated</div></div>
                <div><div className="stat-n">Up to 75%</div><div className="stat-l">Avg. Savings</div></div>
                <div><div className="stat-n">20 yr</div><div className="stat-l">Max Warranty</div></div>
              </div>

              <div className="hero-arrow rv d4" aria-hidden="true">
                <span className="hero-arrow-txt">Fill out the form</span>
                <svg className="hero-arrow-svg" viewBox="0 0 140 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 8 18 C 35 5, 80 8, 115 42" stroke="var(--amber)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="0" />
                  <path d="M 105 30 L 117 44 L 100 48" stroke="var(--amber)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="hf-wrap">
                <div className="hf rv d2" id="hero-form">
                  <div className="hf-eyebrow"><span className="hf-pulse"></span>Free Inspection &middot; 2-Hr Response</div>
                  <h3>Get Your Free Online Estimate</h3>
                  <p className="fs">Takes 30 seconds. Written report with coating options + fixed-price quote within 24 hrs.</p>
                  <div className="fg"><label className="fl">Full Name</label><input type="text" className="fi" placeholder="John Smith" required /></div>
                  <div className="fg"><label className="fl">Email</label><input type="email" className="fi" placeholder="you@example.com" required /></div>
                  <div className="fg"><label className="fl">Full Address</label><input type="text" className="fi" placeholder="1234 Main Street" required /></div>
                  <div className="fg-row">
                    <div className="fg"><label className="fl">City</label><input type="text" className="fi" placeholder="City" required /></div>
                    <div className="fg"><label className="fl">Zip Code</label><input type="text" className="fi" placeholder="00000" inputMode="numeric" required /></div>
                  </div>
                  <div className="fg"><label className="fl">Square Footage / Notes <span className="fl-opt">(optional)</span></label><textarea className="fi fi-area" placeholder="Approx sq ft, roof age, known issues — if you have them" rows={3}></textarea></div>
                  <button className="btn-p btn-full" type="submit">
                    Get My Online Estimate <i className="fas fa-arrow-right" style={{ marginLeft: 8, fontSize: 12 }}></i>
                  </button>
                  <div className="hf-proof">
                    <div className="hf-stars"><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><strong>4.9</strong></div>
                    <span className="hf-proof-txt">Trusted by 1,200+ building owners</span>
                  </div>
                  <p className="fn"><i className="fas fa-lock" style={{ marginRight: 6, fontSize: 10 }}></i> Your info stays private &middot; No spam, no pressure</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="prob-s">
        <div className="wrap">
          <div className="prob-lay">
            <div className="prob-text">
              <div className="tag rv"><span>The Problem</span></div>
              <h2 className="h2 rv d1">Roof Leaking?<br />You Don't Need a $150,000 Replacement.</h2>
              <p className="body-t rv d2">Every time it rains, you hold your breath. Water stains on ceiling tiles. Buckets in the hallway. Tenants complaining. You called a roofer — they quoted six figures for a full tear-off.</p>
              <p className="body-t rv d3">But here's what most roofers won't tell you: if your roof deck is structurally sound, you don't need to replace it. You need to <strong>restore</strong> it.</p>
              <div className="pq rv d4">A professional-grade silicone roof coating creates a seamless, waterproof membrane over your existing roof. No tear-off. No dumpsters. No weeks of noise.</div>
            </div>
            <div className="prob-vis rv d2">
              <div className="ba">
                <div className="ba-g">
                  <div
                    className="ba-b"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(27,58,92,.5),rgba(27,58,92,.78)),url('https://ik.imagekit.io/qcvroy8xpd/8.png')",
                      backgroundSize: "200% 100%",
                      backgroundPosition: "left center",
                    }}
                  >
                    <div className="ba-lb">Before</div>
                    <div className="ba-ic"><i className="fas fa-exclamation-triangle"></i></div>
                    <div className="ba-d">Leaks &middot; Damage &middot; Aging</div>
                  </div>
                  <div
                    className="ba-a"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(245,243,239,.55),rgba(245,243,239,.8)),url('https://ik.imagekit.io/qcvroy8xpd/8.png')",
                      backgroundSize: "200% 100%",
                      backgroundPosition: "right center",
                    }}
                  >
                    <div className="ba-lb">After</div>
                    <div className="ba-ic"><i className="fas fa-check-circle"></i></div>
                    <div className="ba-d">Sealed &middot; Protected &middot; Warrantied</div>
                  </div>
                </div>
                <div className="ba-ft"><i className="fas fa-camera" style={{ marginRight: 6 }}></i> Actual project &middot; [City] commercial site</div>
              </div>
              <div className="sav-b"><strong>Save $127K</strong><span>vs. full replacement</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="ben-s" id="ben">
        <div className="wrap">
          <div className="tag rv"><span>Benefits</span></div>
          <h2 className="h2 rv d1">Why Building Owners Choose <em>Coating</em> Over Replacement</h2>
          <div className="bg">
            {benefits.map((b, i) => (
              <div key={i} className={`bc rv${i > 0 ? " d" + i : ""}`}>
                <div className="b-ic-wrap">
                  <div className="b-ic-ring"></div>
                  <div className="b-ic"><i className={`fas ${b.icon}`}></i></div>
                </div>
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </div>
            ))}
          </div>
          <div className="rv d3" style={{ textAlign: "center", marginTop: 48 }}>
            <a href="#hero-form" className="btn-pill btn-pill-red" onClick={smoothScroll}>
              Get Your Free Roof Inspection
            </a>
          </div>
        </div>
      </section>

      <section className="proc-s">
        <div className="wrap">
          <div className="tag rv"><span>Process</span></div>
          <h2 className="h2 rv d1">From Leaky Roof to <em>Lasting Protection</em></h2>
          <p className="body-t rv d2">1,200+ roofs coated. Here's exactly what happens — no surprises, no hidden steps.</p>
          <div className="proc-lay">
            <div className="proc-rail">
              {process.map((p, i) => (
                <div key={i} className={`ps rv${i > 0 ? " d" + i : ""}`}>
                  <div className="ps-n">{p.n}</div>
                  <div>
                    <div className="ps-h">
                      <h3 className="ps-t">{p.t}</h3>
                      <span className="ps-time"><i className="far fa-clock" style={{ marginRight: 4 }}></i> {p.time}</span>
                    </div>
                    <p className="ps-d">{p.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="proc-vis rv d2">
              <div className="proc-vis-glow"></div>
              <img src="https://ik.imagekit.io/qcvroy8xpd/generated-image%201.png?updatedAt=1776666090382" alt="Technician applying silicone roof coating" className="proc-vis-img" />
              <div className="proc-vis-cap">Certified crew &middot; Step 03</div>
            </div>
          </div>
          <div className="rv d4" style={{ marginTop: 40, paddingLeft: 90 }}>
            <a href="#hero-form" className="btn-pill btn-pill-red" onClick={smoothScroll}>Book Free Inspection</a>
          </div>
        </div>
      </section>

      <section className="case-s">
        <div className="wrap">
          <div className="tag tag-light rv"><span>Case Study</span></div>
          <h2 className="h2 h2-w rv d1">How One Property Manager Saved <em>$127,000</em></h2>
          <div className="cs-grid rv d2">
            <div className="cs-i"><div className="cs-lb">Building</div><div className="cs-v">45,000 ft²</div><div className="cs-sub">Commercial office</div></div>
            <div className="cs-i"><div className="cs-lb">Replacement Quote</div><div className="cs-v">$189,000</div><div className="cs-sub">Full tear-off</div></div>
            <div className="cs-i"><div className="cs-lb">Coating Cost</div><div className="cs-v">$62,000</div><div className="cs-sub">Silicone system</div></div>
            <div className="cs-i"><div className="cs-lb">Total Saved</div><div className="cs-v hl">$127,000</div><div className="cs-sub">Zero leaks since</div></div>
          </div>
          <div className="row rv d3">
            <div className="col-lg-6">
              <p className="body-t body-t-w"><strong style={{ color: "#fff" }}>The situation:</strong> 45,000 sq ft commercial office, 18-year-old flat TPO roof. Multiple leaks, interior damage. Replacement quote: $189,000.</p>
              <p className="body-t body-t-w"><strong style={{ color: "#fff" }}>Our solution:</strong> Full silicone coating with complete surface prep. 20-year manufacturer warranty. Total: $62,000. Done in 4 days.</p>
              <p className="body-t" style={{ color: "var(--amber)" }}><strong>Result:</strong> $127,000 saved. Zero leaks in 3 years. Warranty transfers with sale.</p>
            </div>
            <div className="col-lg-5 offset-lg-1">
              <div className="cq">
                <p>"We were ready to write a check for $189K. They saved us six figures and the roof has been bone dry since. I wish I'd called them first."</p>
                <cite>
                  <strong><i className="fas fa-user-tie" style={{ marginRight: 6, fontSize: 11, color: "var(--amber)" }}></i> Property Manager</strong>
                  <span>[City] Commercial Office Park</span>
                </cite>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cmp-s">
        <div className="wrap">
          <div className="cmp-lay">
            <div className="cmp-side">
              <div className="tag rv"><span>Comparison</span></div>
              <h2 className="h2 rv d1">Not All Roof Coaters Are <em>the Same</em></h2>
              <p className="body-t rv d2">Surface prep is 80% of the job. The difference between 20 years and 2 is the crew applying it.</p>
              <a href="#hero-form" className="btn-pill btn-pill-red rv d3" onClick={smoothScroll}>
                Get Your Free Inspection
              </a>
            </div>
            <div className="cmp-tbl rv d2">
              <div className="cmp-hdr">
                <div className="ch-u"><i className="fas fa-check" style={{ marginRight: 6 }}></i> What We Do</div>
                <div className="ch-t"><i className="fas fa-times" style={{ marginRight: 6 }}></i> What Others Do</div>
              </div>
              {comparison.map(([us, them], i) => (
                <div key={i} className="cmp-r">
                  <div className="cu"><i className="fas fa-check"></i> {us}</div>
                  <div className="ct"><i className="fas fa-times"></i> {them}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="test-s">
        <div className="wrap">
          <div className="tag rv"><span>Testimonials</span></div>
          <h2 className="h2 rv d1">What Our Clients Say</h2>
          <div className="test-g">
            {testimonials.map((t, i) => (
              <div key={i} className={`tc rv${i > 0 ? " d" + i : ""}`}>
                <div className="tc-stars">
                  <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                </div>
                <p className="tc-txt">{t.txt}</p>
                <div className="tc-ft">
                  <div className="tc-person">
                    <div className={`avatar ${t.av}`}>{t.initials}</div>
                    <div>
                      <div className="tc-nm">{t.nm}</div>
                      <div className="tc-rl">{t.rl}</div>
                    </div>
                  </div>
                  <span className="tc-tag">{t.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="work-s">
        <div className="wrap">
          <div className="work-head">
            <div>
              <div className="tag rv"><span>Recent Work</span></div>
              <h2 className="h2 rv d1">Projects Restored <em>This Year</em></h2>
              <p className="body-t rv d2">A small sample of commercial roofs we've coated in the last 12 months — zero tear-offs, zero tenant disruption.</p>
            </div>
          </div>

          <div className="work-grid">
            {["21", "14", "11", "19", "32", "12", "10", "9", "27", "24", "26", "29"].map((id, i) => (
              <div key={id} className={`work-card rv${i > 0 ? " d" + (i % 5 || 1) : ""}`}>
                <div className="work-img" style={{ backgroundImage: `url('https://ik.imagekit.io/qcvroy8xpd/${id}.png')` }}>
                  <span className="work-ba">Before / After</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-s">
        <div className="wrap">
          <div className="faq-lay">
            <div className="faq-side">
              <div className="tag rv"><span>FAQ</span></div>
              <h2 className="h2 rv d1">Common Questions</h2>
              <p className="rv d2" style={{ fontSize: 15, lineHeight: 1.72, color: "var(--ink-soft)", marginBottom: 24 }}>
                Can't find your answer? Send us the details and we'll write back within 24 hours.
              </p>
              <a href="#hero-form" className="btn-pill btn-pill-red rv d3" onClick={smoothScroll}>Book Free Inspection</a>
            </div>
            <div>
              {faqs.map((f, i) => (
                <div key={i} className={`faq-i${openFaq === i ? " open" : ""}`}>
                  <button className="faq-q" onClick={() => toggleFaq(i)} type="button" aria-expanded={openFaq === i}>
                    <span>{f.q}</span>
                    <div className="faq-tog">+</div>
                  </button>
                  {openFaq === i && (
                    <div className="faq-ans">
                      <p>{f.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ind-s">
        <div className="wrap">
          <div className="ind-head">
            <div>
              <div className="tag rv"><span>Commercial Focus</span></div>
              <h2 className="h2 rv d1">Built for the Buildings <em>You Manage</em></h2>
              <p className="body-t rv d2">Every commercial roof is different. We've coated 1,200+ across every category — from 5,000 sq ft storefronts to 150,000 sq ft distribution centers.</p>
            </div>
            <div className="ind-counter rv d2">
              <span className="ind-counter-n">1,200+</span>
              <span className="ind-counter-l">Commercial Roofs Coated</span>
              <span className="ind-counter-sub">Across 14 Industries · 8 States</span>
            </div>
          </div>

          <div className="ind-grid">
            <div className="ind-card rv">
              <div className="ind-ic"><i className="fas fa-building"></i></div>
              <h3>Office &amp; Corporate Parks</h3>
              <div className="ind-stat">180+ completed</div>
              <p>Downtown offices · Mid-rise buildings · Suburban corporate parks · Medical office buildings</p>
            </div>
            <div className="ind-card rv d1">
              <div className="ind-ic"><i className="fas fa-warehouse"></i></div>
              <h3>Warehouses &amp; Distribution</h3>
              <div className="ind-stat">310+ completed</div>
              <p>Logistics hubs · Fulfillment centers · Cold storage · Last-mile distribution</p>
            </div>
            <div className="ind-card rv d2">
              <div className="ind-ic"><i className="fas fa-industry"></i></div>
              <h3>Industrial &amp; Manufacturing</h3>
              <div className="ind-stat">240+ completed</div>
              <p>Production facilities · Assembly plants · Machine shops · Automotive &amp; fabrication</p>
            </div>
            <div className="ind-card rv d3">
              <div className="ind-ic"><i className="fas fa-store"></i></div>
              <h3>Retail &amp; Strip Malls</h3>
              <div className="ind-stat">220+ completed</div>
              <p>Shopping centers · Big-box retail · Restaurants · Grocery &amp; convenience</p>
            </div>
            <div className="ind-card rv d4">
              <div className="ind-ic"><i className="fas fa-home"></i></div>
              <h3>HOA &amp; Multi-Family</h3>
              <div className="ind-stat">140+ completed</div>
              <p>Condo associations · Apartment complexes · Townhouse communities · Senior living</p>
            </div>
            <div className="ind-card rv d5">
              <div className="ind-ic"><i className="fas fa-clinic-medical"></i></div>
              <h3>Healthcare &amp; Schools</h3>
              <div className="ind-stat">110+ completed</div>
              <p>Outpatient clinics · Assisted living · K-12 districts · Municipal &amp; public sector</p>
            </div>
          </div>

        </div>
      </section>

      <footer className="footer">
        <div className="ft-main">
          <div className="wrap">
            <div className="ft-grid">
              <div className="ft-col ft-brand-col">
                <div className="ft-brand-row">
                  <LogoMark size={40} />
                  <div className="ft-brand">Roof Coat</div>
                </div>
                <p className="ft-blurb">We restore commercial roofs across [State] for building owners, property managers, and facilities teams. Manufacturer-backed silicone and acrylic systems. No tear-offs, no tenant disruption.</p>
                <div className="ft-contact">
                  <a href="mailto:quotes@roofcoat.com" className="ft-c-item"><i className="fas fa-envelope"></i> quotes@roofcoat.com</a>
                  <div className="ft-c-item"><i className="fas fa-map-marker-alt"></i> 1234 Industry Ave, [City, ST] 00000</div>
                  <div className="ft-c-item"><i className="fas fa-clock"></i> Mon–Sat &middot; 7am–6pm</div>
                </div>
              </div>

              <div className="ft-col">
                <div className="ft-label">Coating Services</div>
                <ul className="ft-links">
                  <li><a href="#">Silicone Roof Coating</a></li>
                  <li><a href="#">Acrylic Roof Coating</a></li>
                  <li><a href="#">Metal Roof Restoration</a></li>
                  <li><a href="#">TPO / EPDM Restoration</a></li>
                  <li><a href="#">Modified Bitumen Coating</a></li>
                  <li><a href="#">Emergency Leak Repair</a></li>
                  <li><a href="#">Preventative Maintenance</a></li>
                </ul>
              </div>

              <div className="ft-col">
                <div className="ft-label">Commercial Buildings We Serve</div>
                <ul className="ft-links">
                  <li><a href="#">Office &amp; Corporate Parks</a></li>
                  <li><a href="#">Warehouses &amp; Distribution</a></li>
                  <li><a href="#">Industrial &amp; Manufacturing</a></li>
                  <li><a href="#">Retail &amp; Strip Malls</a></li>
                  <li><a href="#">HOA &amp; Multi-Family</a></li>
                  <li><a href="#">Schools &amp; Municipal</a></li>
                  <li><a href="#">Healthcare &amp; Assisted Living</a></li>
                </ul>
              </div>

            </div>
          </div>
        </div>

        <div className="ft-btm">
          <div className="wrap">
            <div className="ft-btm-i">
              <span className="footer-lg">© 2026 Roof Coat. All rights reserved.</span>
              <div className="ft-legal">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Accessibility</a>
                <a href="#">Sitemap</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className={`mob-s${showMobile ? " show" : ""}`} id="mobS">
        <a href="#hero-form" className="mob-cta" onClick={smoothScroll}>
          Get My Online Estimate <i className="fas fa-arrow-right" style={{ marginLeft: 6, fontSize: 11 }}></i>
        </a>
      </div>
    </>
  );
}
