"use client";

import { useEffect, useState, useRef, MouseEvent } from "react";

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [heroSlide, setHeroSlide] = useState(0);
  const [shockVisible, setShockVisible] = useState(false);
  const [shockCount, setShockCount] = useState(0);
  const shockRef = useRef<HTMLDivElement>(null);

  const heroSlides = [
    "https://images.unsplash.com/photo-1632759145351-1d592919f522?w=1920&q=80",
    "https://ik.imagekit.io/qcvroy8xpd/Asyrc.png?updatedAt=1776008954670",
    "https://ik.imagekit.io/qcvroy8xpd/Sylicone.jpeg?updatedAt=1776009369481",
    "https://ik.imagekit.io/qcvroy8xpd/34.png",
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

  // Animated counters
  const [roofsCount, setRoofsCount] = useState(0);
  const [savingsCount, setSavingsCount] = useState(0);
  const [maxSavingsCount, setMaxSavingsCount] = useState(0);
  const [warrantyCount, setWarrantyCount] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);
  const [whyRoofsCount, setWhyRoofsCount] = useState(0);

  useEffect(() => {
    const el = shockRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShockVisible(true);
        const duration = 2000;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          setShockCount(Math.round(p * p * 91));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const duration = 2000;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const ease = p * p;
          setRoofsCount(Math.round(ease * 1200));
          setSavingsCount(Math.round(ease * 127));
          setMaxSavingsCount(Math.round(ease * 75));
          setWarrantyCount(Math.round(ease * 20));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = whyRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const duration = 2000;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          setWhyRoofsCount(Math.round(p * p * 1200));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

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
    const s1 = document.createElement("script");
    s1.src = "https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js";
    s1.onload = () => {
      const s2 = document.createElement("script");
      s2.innerHTML = `window.jotformEmbedHandler("iframe[id='JotFormIFrame-261243544700045']", "https://form.jotform.com/")`;
      document.body.appendChild(s2);
    };
    document.body.appendChild(s1);
    return () => s1.remove();
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
    const onScroll = () => setScrolled(window.scrollY > 60);
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

  const benefits = [
    { icon: "fa-dollar-sign", title: "Save Up To 75% — Period.", body: "Replacement: $8–$14/sq ft. Coating: $3–$5. On a 20,000 sq ft roof, you keep $100K+ in your pocket. Same waterproofing. Better warranty." },
    { icon: "fa-volume-mute", title: "Zero Disruption — Tenants Won't Know", body: "No tear-off. No dumpsters. No closed parking. No noise. We're in and out before your tenants notice anything changed." },
    { icon: "fa-shield-alt", title: "20-Year Manufacturer Warranty", body: "Backed in writing by the manufacturer — not a contractor handshake. Fully transferable when you sell the building." },
    { icon: "fa-thermometer-quarter", title: "Cooling Bills Drop 25% — Day One", body: "Reflective coatings cut rooftop temps by up to 60°F. Your HVAC stops fighting the sun. Energy savings start the day we leave." },
    { icon: "fa-leaf", title: "Keep 20+ Tons Out Of The Landfill", body: "Tear-offs send a mountain of debris to the dump. Coating restores what's already there — and your tenants love the green credentials." },
    { icon: "fa-clock", title: "Bone-Dry In 3 Days Flat", body: "Most commercial roofs fully coated in 1–3 working days. Sealed, warrantied, and leak-free by the end of the week. No exceptions." },
  ];

  const process = [
    { n: "01", t: "Free Inspection — No Pressure", time: "1–2 hrs", d: "We inspect, measure, and tell you straight up if coating is right. Written report in your inbox same week. Zero obligation." },
    { n: "02", t: "Fixed Quote — Zero Surprises", time: "24–48 hrs", d: "Silicone, acrylic, or hybrid — we recommend the smartest system for your roof, climate, and budget. Locked-in price. No change orders." },
    { n: "03", t: "Enjoy a 20-Year Bone-Dry Roof", time: "1–3 days", d: "Certified crew cleans, primes, coats. You get manufacturer warranty docs in hand and the smartest decision you'll make this year." },
  ];

  const roofTypes = [
    { icon: "fa-layer-group", title: "TPO", sub: "Single-Ply Thermoplastic", stat: "Most common flat roof" },
    { icon: "fa-circle", title: "EPDM", sub: "Synthetic Rubber Membrane", stat: "Ideal for cold climates" },
    { icon: "fa-square", title: "PVC", sub: "Durable Polyvinyl Membrane", stat: "Chemical-resistant" },
    { icon: "fa-hammer", title: "Metal", sub: "Standing Seam & R-Panel", stat: "Stops rust & leaks" },
    { icon: "fa-layer-group", title: "Modified Bitumen", sub: "Asphalt-Based Membrane", stat: "High-traffic roofs" },
    { icon: "fa-th", title: "Built-Up", sub: "Traditional Tar & Gravel", stat: "Multi-layer system" },
  ];

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

  const navLinks = ["About", "Benefits", "Projects", "Insights", "Contact"];

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
        {heroSlides.map((src, i) => (
          <div
            key={i}
            className={`hero-bg-slide${i === heroSlide ? " active" : ""}`}
            style={{ backgroundImage: `url('${src}')` }}
            aria-hidden="true"
          />
        ))}
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
          <div className="hero-stack">
            <div className="hero-stack-text">
              <div className="hero-badge rv d1">
                <span className="dot" />
                <span>Free Commercial Roof Assessment</span>
              </div>
              <h1 className="rv d1 hero-h1-stat">
                Restore Your Roof for <span className="hero-stat-big">75% Less</span>
                <br />
                <span className="ul">with a Roof Coating.</span>
              </h1>
            </div>
            <div className="hero-arrow-wrap" aria-hidden="true">
              <div className="hero-arrow">
                <svg width="38" height="24" viewBox="0 0 38 24" fill="none"><path d="M3 3L19 21L35 3" stroke="white" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
            <div className="form-embed">
              <iframe
                id="JotFormIFrame-261243544700045"
                title="Roof Coating Deal Request"
                onLoad={() => window.parent.scrollTo(0, 0)}
                allowTransparency={true}
                allow="geolocation; microphone; camera; fullscreen; payment"
                src="https://form.jotform.com/261243544700045"
                frameBorder={0}
                style={{ minWidth: "100%", maxWidth: "100%", height: "539px", border: "none" }}
                scrolling="no"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="shock-s" ref={shockRef}>
        <div className="shock-grain" aria-hidden="true" />
        <div className="wrap shock-wrap">
          <p className="shock-eyebrow">The Statistic That Changes Everything</p>
          <div className="shock-counter">
            <span className="shock-num">{shockCount}</span>
            <span className="shock-sign">%</span>
          </div>
          <div className="shock-bar-track">
            <div className="shock-bar-fill" style={{ width: shockVisible ? '91%' : '0%' }} />
            <span className="shock-bar-label">91% of owners</span>
          </div>
          <p className="shock-stmt">
            of commercial roof owners{' '}
            <strong>don&apos;t know</strong> they can restore
            <br className="shock-br" />
            their roof for{' '}
            <em className="shock-highlight">75% less</em>{' '}
            than a full replacement.
          </p>
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
                  <img src={`https://ik.imagekit.io/qcvroy8xpd/${file}`} alt="Commercial roof coating project" loading="lazy" />
                </div>
              ))}
            </div>
            <button className="wc-nav wc-next" onClick={() => scrollGallery(1)} aria-label="Next projects" type="button"><i className="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </section>

      <section className="prob-s" id="about" ref={whyRef}>
        <div className="wrap">
          <div className="prob-lay">
            <div className="prob-text slide-left">
              <div className="tag"><span>Why Coat, Not Replace</span></div>
              <h2 className="h2">The 20-Year Roof Upgrade <em>Smart Owners Already Know About</em></h2>
              <p className="body-t">Most commercial roofs don't need a tear-off. If the deck is structurally sound, a professional-grade silicone system seals every seam, blister, and pinhole — restoring the roof for decades at a fraction of replacement cost.</p>
              <p className="body-t">Our applications are backed by manufacturer warranties up to 20 years, transferable on sale, and installed in 1–3 working days. Tenants won't even know we were there.</p>
              <p className="body-t">Over 1,200 commercial owners across 14 industries have already made the smarter decision. Here's your chance to skip the six-figure quote — and keep that money in your operating budget.</p>
              <div style={{ display: "flex", gap: 32, marginTop: 24 }}>
                <div>
                  <div style={{ fontFamily: "var(--font-d)", fontSize: 38, fontWeight: 700, color: "var(--amber)", lineHeight: 1 }}>{whyRoofsCount.toLocaleString()}+</div>
                  <div style={{ fontSize: 12, color: "var(--ink-muted)", marginTop: 4, textTransform: "uppercase", letterSpacing: ".08em" }}>Commercial Roofs Restored</div>
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-d)", fontSize: 38, fontWeight: 700, color: "var(--amber)", lineHeight: 1 }}>20 yr</div>
                  <div style={{ fontSize: 12, color: "var(--ink-muted)", marginTop: 4, textTransform: "uppercase", letterSpacing: ".08em" }}>Maximum Warranty</div>
                </div>
              </div>
            </div>
            <div className="prob-vis slide-right">
              <div className="ba">
                <div className="ba-full" style={{ backgroundImage: "url('https://ik.imagekit.io/qcvroy8xpd/Sylicone.jpeg?updatedAt=1776009369481')" }}>
                  <div className="ba-card ba-card-b">
                    <div className="ba-lb">Silicone roof coating application</div>
                    <div className="ba-d">Applied in 1–3 days</div>
                  </div>
                  <div className="ba-card ba-card-a">
                    <div className="ba-lb">Roof before and after coating</div>
                    <div className="ba-d">Sealed &middot; Protected &middot; Warrantied</div>
                  </div>
                </div>
                <div className="ba-ft"><i className="fas fa-camera" style={{ marginRight: 6 }}></i> Actual project &middot; Manufacturer-certified applicators</div>
              </div>
              <div className="sav-b float-el"><strong>Save $127K</strong><span>vs. full replacement</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="proc-s" id="projects">
        <div className="wrap">
          <div className="proc-head">
            <div className="tag rv"><span>The Process</span></div>
            <h2 className="h2 rv d1">Leaky Roof to <em>Bone-Dry</em> in 3 Days Flat</h2>
            <p className="body-t rv d2">1,200+ roofs coated. Three steps. Zero surprises. Zero change orders. Done by the end of the week.</p>
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
        </div>
      </section>

      <section className="ben-s" id="benefits">
        <div className="wrap">
          <div className="tag rv"><span>Why Smart Owners Choose Coating</span></div>
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
        </div>
      </section>

      <section className="ind-s" id="insights">
        <div className="wrap">
          <div className="ind-head">
            <div>
              <div className="tag rv"><span>What We Coat</span></div>
              <h2 className="h2 rv d1">Every Roof System — <em>Restored, Not Replaced</em></h2>
              <p className="body-t rv d2">If your commercial roof is one of these, coating is almost certainly the smarter decision — and we've sealed thousands of them.</p>
            </div>
            <div className="ind-counter rv d2">
              <span className="ind-counter-n">1,200+</span>
              <span className="ind-counter-l">Roofs Coated</span>
              <span className="ind-counter-sub">Across 14 industries &middot; 8 states</span>
            </div>
          </div>

          <div className="ind-grid">
            {roofTypes.map((r, i) => (
              <div key={i} className={`ind-card rv${i > 0 ? " d" + (i % 5 || 1) : ""}`}>
                <div className="ind-ic"><i className={`fas ${r.icon}`}></i></div>
                <h3>{r.title}</h3>
                <div className="ind-stat">{r.stat}</div>
                <p>{r.sub}</p>
              </div>
            ))}
          </div>

          <p className="rv d3" style={{ textAlign: "center", marginTop: 24, fontSize: 14, color: "var(--ink-muted)" }}>
            Not sure what you have? Send a photo when you book — we'll confirm during the inspection.
          </p>

          <div ref={statsRef} style={{ display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap", marginTop: 48 }}>
            {[
              { val: `${roofsCount.toLocaleString()}+`, label: "Roofs Coated" },
              { val: `$${savingsCount}K`, label: "Avg. Project Savings" },
              { val: `${maxSavingsCount}%`, label: "Max Savings vs. Replacement" },
              { val: `${warrantyCount} yr`, label: "Manufacturer Warranty" },
            ].map((s) => (
              <div key={s.label} className="rv" style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-d)", fontSize: 36, fontWeight: 700, color: "var(--amber)" }}>{s.val}</div>
                <div style={{ fontSize: 12, color: "var(--ink-muted)", marginTop: 4, textTransform: "uppercase", letterSpacing: ".08em" }}>{s.label}</div>
              </div>
            ))}
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
                  <span>Property Manager &middot; Commercial Office Park</span>
                </cite>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-s" id="contact">
        <div className="wrap">
          <div className="faq-lay">
            <div className="faq-side">
              <div className="tag rv"><span>FAQ</span></div>
              <h2 className="h2 rv d1">Common Questions</h2>
              <p className="rv d2" style={{ fontSize: 15, lineHeight: 1.72, color: "var(--ink-soft)", marginBottom: 24 }}>
                Can't find your answer? Send us the details and we'll write back within 24 hours.
              </p>
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

      <footer className="footer">
        <div className="ft-btm">
          <div className="wrap">
            <div className="ft-btm-i">
              <span className="footer-lg">© 2026 Roof Coat. All Rights Reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
