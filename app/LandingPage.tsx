"use client";

import { useEffect, useState, useRef, MouseEvent } from "react";

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [showMobile, setShowMobile] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [heroSlide, setHeroSlide] = useState(0);
  const heroSlides = [
    "https://ik.imagekit.io/qcvroy8xpd/Asyrc.png?updatedAt=1776008954670",
    "https://ik.imagekit.io/qcvroy8xpd/Sylicone.jpeg?updatedAt=1776009369481",
    "https://ik.imagekit.io/qcvroy8xpd/580c524e-ceaa-4322-801d-0e8c216bebdd.png?updatedAt=1776666137369",
  ];
  useEffect(() => {
    const t = setInterval(() => setHeroSlide((s) => (s + 1) % heroSlides.length), 6500);
    return () => clearInterval(t);
  }, [heroSlides.length]);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const videos = [
    { src: "https://ik.imagekit.io/qcvroy8xpd/Video.mp4", label: "Coating Application" },
    { src: "https://ik.imagekit.io/qcvroy8xpd/Video%202.mp4", label: "Finished Roof" },
  ];

  const playVid = (idx: number) => {
    videoRefs.current.forEach((v, i) => { if (i !== idx && v) { v.pause(); v.currentTime = 0; } });
    const v = videoRefs.current[idx];
    if (v) { v.play(); setPlayingVideo(idx); }
  };
  const switchVid = (idx: number) => {
    if (playingVideo !== null && videoRefs.current[playingVideo]) {
      videoRefs.current[playingVideo]!.pause();
      videoRefs.current[playingVideo]!.currentTime = 0;
    }
    setPlayingVideo(null);
    setCurrentVideo(idx);
  };
  const prevVid = () => switchVid(currentVideo === 0 ? videos.length - 1 : currentVideo - 1);
  const nextVid = () => switchVid((currentVideo + 1) % videos.length);

  const galleryRef = useRef<HTMLDivElement | null>(null);
  const workImages = ["34.png", "20.png", "35.png", "22.png", "37.png", "26.png", "30.png", "23.png", "29.png", "13.png"];
  const scrollGallery = (dir: -1 | 1) => {
    const track = galleryRef.current;
    if (!track) return;
    const slide = track.querySelector(".wc-slide") as HTMLElement | null;
    const delta = slide ? slide.offsetWidth + 14 : 320;
    track.scrollBy({ left: delta * dir, behavior: "smooth" });
  };

  useEffect(() => {
    const jf = document.createElement("script");
    jf.src = "https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js";
    jf.async = true;
    jf.onload = () => {
      const w = window as unknown as { jotformEmbedHandler?: (sel: string, base: string) => void };
      if (w.jotformEmbedHandler) {
        w.jotformEmbedHandler("iframe[id='JotFormIFrame-261093407189057']", "https://form.jotform.com/");
      }
    };
    document.body.appendChild(jf);
    return () => {
      if (jf.parentNode) jf.parentNode.removeChild(jf);
    };
  }, []);

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
    document.querySelectorAll(".rv, .zoom-in, .slide-left, .slide-right").forEach((el) => io.observe(el));

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
    { icon: "fa-dollar-sign", title: "Save Up To 75% — Period.", body: "Replacement: $8–$14/sq ft. Coating: $3–$5. On a 20,000 sq ft roof, you keep $100K+ in your pocket. Same waterproofing. Better warranty." },
    { icon: "fa-volume-mute", title: "Zero Disruption — Tenants Won't Know", body: "No tear-off. No dumpsters. No closed parking. No noise. We're in and out before your tenants notice anything changed." },
    { icon: "fa-shield-alt", title: "20-Year Manufacturer Warranty", body: "Backed in writing by the manufacturer — not a contractor handshake. Fully transferable when you sell the building." },
    { icon: "fa-thermometer-quarter", title: "Cooling Bills Drop 25% — Day One", body: "Reflective coatings cut rooftop temps by up to 60°F. Your HVAC stops fighting the sun. Energy savings start the day we leave." },
    { icon: "fa-leaf", title: "Keep 20+ Tons Out Of The Landfill", body: "Tear-offs send a mountain of debris to the dump. Coating restores what's already there — and your tenants love the green credentials." },
    { icon: "fa-clock", title: "Bone-Dry In 3 Days Flat", body: "Most commercial roofs fully coated in 1–3 working days. Sealed, warrantied, and leak-free by the end of the week. No exceptions." },
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
          <div className="nav-act">
            <a href="#hero-form" className="btn-pill btn-pill-red nav-pill" onClick={smoothScroll}>
              <span>Book Free Assessment</span>
            </a>
          </div>
        </div>
      </nav>

      <section className="hero" id="hero">
        {heroSlides.map((src, i) => (
          <div
            key={i}
            className={`hero-bg-slide${i === heroSlide ? " active" : ""}`}
            style={{ backgroundImage: `url('${src}')` }}
            aria-hidden="true"
          />
        ))}
        <div className="hero-bg-dots" role="tablist" aria-label="Hero background">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              className={i === heroSlide ? "active" : ""}
              onClick={() => setHeroSlide(i)}
              aria-label={`Background ${i + 1}`}
              aria-selected={i === heroSlide}
              type="button"
            />
          ))}
        </div>
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
            <div className="col-lg-6">
              <h1 className="rv d1 hero-h1-stat">
                <span className="hero-stat-big">75% Less</span> Than a
                <br />
                <span className="ul">Full Roof Replacement.</span>
              </h1>
              <p className="hero-sub rv d2">
                Smart commercial owners are coating, not replacing. Seal every leak, slash cooling bills 25%, and lock in a 20-year manufacturer warranty — without one tear-off, one dumpster, or one disrupted tenant.
              </p>
              <ul className="hero-checks rv d3">
                <li><i className="fas fa-check"></i> Save up to 75% — keep that six-figure budget</li>
                <li><i className="fas fa-check"></i> 20-year manufacturer warranty (transferable on sale)</li>
                <li><i className="fas fa-check"></i> Bone-dry in 3 days flat &middot; Zero tenant disruption</li>
              </ul>
              <div className="hero-trust rv d4">
                <div className="ht-stars" aria-hidden="true">
                  <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                </div>
                <div className="ht-facts">
                  <span><strong>4.9 / 5</strong> on Google</span>
                  <span className="ht-sep" />
                  <span><strong>1,200+</strong> Roofs Coated</span>
                  <span className="ht-sep" />
                  <span><strong>20-yr</strong> Warranty</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hf-wrap">
                <div className="hero-arrow rv" aria-hidden="true">
                  <span className="hero-arrow-txt">Start here</span>
                  <svg className="hero-arrow-svg" viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 10 12 C 30 12, 80 14, 95 78" stroke="var(--amber)" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M 82 64 L 96 82 L 108 60" stroke="var(--amber)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                </div>
                <div className="hf-bare slide-right" id="hero-form">
                  <iframe
                    id="JotFormIFrame-261093407189057"
                    title="Free Roof Coating Assessment Form"
                    allow="geolocation; microphone; camera; fullscreen"
                    src="https://form.jotform.com/261093407189057"
                    className="hf-iframe"
                    scrolling="no"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="work-s">
        <div className="wrap">
          <div className="work-head">
            <div>
              <div className="tag rv"><span>Recent Work</span></div>
              <h2 className="h2 rv d1">Real Roofs. Real Results. <em>Restored This Year.</em></h2>
              <p className="body-t rv d2">1,200+ commercial roofs sealed and warrantied in the last 12 months. Zero tear-offs. Zero tenant disruption. Just bone-dry roofs and six-figure savings.</p>
            </div>
          </div>

          <div className="work-carousel">
            <button className="wc-nav wc-prev" onClick={() => scrollGallery(-1)} aria-label="Previous projects" type="button"><i className="fas fa-chevron-left"></i></button>
            <div className="wc-track" ref={galleryRef}>
              {workImages.map((file, i) => (
                <div key={i} className="wc-slide">
                  <img src={`https://ik.imagekit.io/qcvroy8xpd/${file}`} alt="Before and after roof coating project" loading="lazy" />
                </div>
              ))}
            </div>
            <button className="wc-nav wc-next" onClick={() => scrollGallery(1)} aria-label="Next projects" type="button"><i className="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </section>

      <section className="prob-s">
        <div className="wrap">
          <div className="prob-lay">
            <div className="prob-text slide-left">
              <div className="tag"><span>The Problem</span></div>
              <h2 className="h2">Don't Sign That<br /><em>$150,000 Replacement Quote.</em></h2>
              <p className="body-t">Every rainstorm is a panic attack. Water stains on the ceiling. Buckets in the hallway. Angry tenants on the phone. You call a roofer — they hand you a six-figure quote for a full tear-off you can't afford.</p>
              <p className="body-t">Here's what most roofers will <em>never</em> tell you: if your roof deck is structurally sound, replacement is overkill. You don't need to <strong>tear it off</strong> — you need to <strong>restore it</strong>. For a fraction of the cost.</p>
              <div className="pq">A professional-grade silicone coating creates one seamless, waterproof membrane over your existing roof. No tear-off. No dumpsters. No weeks of noise. Just a bone-dry roof, sealed and warrantied for the next 20 years.</div>
            </div>
            <div className="prob-vis slide-right">
              <div className="ba">
                <div className="ba-full" style={{ backgroundImage: "url('https://ik.imagekit.io/qcvroy8xpd/580c524e-ceaa-4322-801d-0e8c216bebdd.png?updatedAt=1776666137369')" }}>
                  <div className="ba-card ba-card-b">
                    <div className="ba-lb">Before</div>
                    <div className="ba-d">Leaks &middot; Damage &middot; Aging</div>
                  </div>
                  <div className="ba-card ba-card-a">
                    <div className="ba-lb">After</div>
                    <div className="ba-d">Sealed &middot; Protected &middot; Warrantied</div>
                  </div>
                </div>
                <div className="ba-ft"><i className="fas fa-camera" style={{ marginRight: 6 }}></i> Actual project &middot; [City] commercial site</div>
              </div>
              <div className="sav-b float-el"><strong>Save $127K</strong><span>vs. full replacement</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="ben-s" id="ben">
        <div className="wrap">
          <div className="tag rv"><span>Benefits</span></div>
          <h2 className="h2 rv d1">The 20-Year Roof Upgrade <em>Smart Owners</em> Already Know About</h2>
          <div className="bg">
            {benefits.map((b, i) => (
              <div key={i} className={`bc zoom-in${i > 0 ? " d" + (i % 5 || 1) : ""}`}>
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
          <div className="proc-head">
            <div className="tag rv"><span>Process</span></div>
            <h2 className="h2 rv d1">Leaky Roof to <em>Bone-Dry</em> in 3 Days Flat</h2>
            <p className="body-t rv d2">1,200+ roofs coated. The exact 4-step playbook we run on every job — no surprises, no hidden steps, no change orders.</p>
          </div>
          <div className="proc-lay">
            <div className="proc-vis rv">
              <div className="proc-carousel">
                <div className="pc-track" style={{ transform: `translateX(-${currentVideo * 100}%)` }}>
                  {videos.map((v, i) => (
                    <div key={i} className="pc-slide">
                      <video
                        ref={(el) => { videoRefs.current[i] = el; }}
                        src={v.src}
                        playsInline
                        preload="metadata"
                        controls={playingVideo === i}
                        className="pc-video"
                        onEnded={() => setPlayingVideo(null)}
                      />
                      {playingVideo !== i && (
                        <button className="pc-play" onClick={() => playVid(i)} aria-label={`Play ${v.label}`} type="button">
                          <i className="fas fa-play"></i>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button className="pc-nav pc-prev" onClick={prevVid} aria-label="Previous video" type="button"><i className="fas fa-chevron-left"></i></button>
                <button className="pc-nav pc-next" onClick={nextVid} aria-label="Next video" type="button"><i className="fas fa-chevron-right"></i></button>
                <div className="pc-dots">
                  {videos.map((_, i) => (
                    <button key={i} className={`pc-dot${currentVideo === i ? " active" : ""}`} onClick={() => switchVid(i)} aria-label={`Go to video ${i + 1}`} type="button" />
                  ))}
                </div>
              </div>
              <div className="proc-vis-cap"><i className="fas fa-play-circle" style={{ color: "var(--amber)", marginRight: 6 }}></i>Watch real project footage</div>
            </div>
            <ol className="proc-steps">
              {process.map((p, i) => (
                <li key={i} className={`psc rv${i > 0 ? " d" + i : ""}`}>
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
          </div>
          <div className="proc-cta rv d2">
            <a href="#hero-form" className="btn-pill btn-pill-red" onClick={smoothScroll}>Book Free Assessment</a>
          </div>
        </div>
      </section>

      <section className="case-s">
        <div className="wrap">
          <div className="tag tag-light rv"><span>Case Study</span></div>
          <h2 className="h2 h2-w rv d1">How One Smart Property Manager Saved <em>$127,000</em> — In One Phone Call</h2>
          <div className="cs-grid">
            <div className="cs-i zoom-in"><div className="cs-lb">Building</div><div className="cs-v">45,000 ft²</div><div className="cs-sub">Commercial office</div></div>
            <div className="cs-i zoom-in d1"><div className="cs-lb">Replacement Quote</div><div className="cs-v">$189,000</div><div className="cs-sub">Full tear-off</div></div>
            <div className="cs-i zoom-in d2"><div className="cs-lb">Coating Cost</div><div className="cs-v">$62,000</div><div className="cs-sub">Silicone system</div></div>
            <div className="cs-i zoom-in d3"><div className="cs-lb">Total Saved</div><div className="cs-v hl">$127,000</div><div className="cs-sub">Zero leaks since</div></div>
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
                  <strong><i className="fas fa-user-tie" style={{ marginRight: 6, fontSize: 11, color: "var(--amber)" }}></i> Michael Hartman</strong>
                  <span>Property Manager &middot; [City] Commercial Office Park</span>
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
              <h2 className="h2 rv d1">Why 9 Out of 10 Roof Coaters Will <em>Cost You Twice</em></h2>
              <p className="body-t rv d2">Surface prep is 80% of the job. The difference between a 20-year coating and a 2-year peel-off mess is the crew applying it. Pick wrong once and you'll pay for both.</p>
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
              <h2 className="h2 rv d1">Built for <em>Every</em> Building You Manage</h2>
              <p className="body-t rv d2">1,200+ commercial roofs across 14 industries and 8 states. From 5,000 sq ft storefronts to 150,000 sq ft distribution centers — we've sealed every roof type the market has thrown at us.</p>
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

    </>
  );
}
