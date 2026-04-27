"use client";

import { useEffect, useState, useRef, MouseEvent } from "react";

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
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
    { src: "https://ik.imagekit.io/qcvroy8xpd/Video.mp4", label: "Campaign Setup" },
    { src: "https://ik.imagekit.io/qcvroy8xpd/Video%202.mp4", label: "Lead Delivery" },
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
          setShockCount(Math.round(p * p * 40));
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
  const formContainerRef = useRef<HTMLDivElement | null>(null);

  const galleryItems = [
    { img: "https://ik.imagekit.io/qcvroy8xpd/34.png", stat: "3 jobs", label: "closed month one", name: "Michael P.", state: "FL" },
    { img: "https://ik.imagekit.io/qcvroy8xpd/20.png", stat: "8.2x", label: "ROI in 90 days", name: "Sarah J.", state: "TX" },
    { img: "https://ik.imagekit.io/qcvroy8xpd/35.png", stat: "40%", label: "lower cost per lead", name: "Robert G.", state: "CA" },
    { img: "https://ik.imagekit.io/qcvroy8xpd/22.png", stat: "$34", label: "avg cost per lead", name: "Karen L.", state: "AZ" },
    { img: "https://ik.imagekit.io/qcvroy8xpd/37.png", stat: "22%", label: "close rate", name: "David C.", state: "OH" },
    { img: "https://ik.imagekit.io/qcvroy8xpd/26.png", stat: "5.8x", label: "return on ad spend", name: "James W.", state: "GA" },
    { img: "https://ik.imagekit.io/qcvroy8xpd/30.png", stat: "100+", label: "contractors on the system", name: "Network Wide", state: "US" },
    { img: "https://ik.imagekit.io/qcvroy8xpd/23.png", stat: "<48h", label: "to first lead", name: "All Partners", state: "Avg" },
    { img: "https://ik.imagekit.io/qcvroy8xpd/29.png", stat: "40%", label: "lower CPA than Google", name: "System Average", state: "All States" },
    { img: "https://ik.imagekit.io/qcvroy8xpd/13.png", stat: "5-10x", label: "average ROI", name: "Partner Network", state: "US" },
  ];

  const scrollGallery = (dir: -1 | 1) => {
    const track = galleryRef.current;
    if (!track) return;
    const slide = track.querySelector(".wc-slide") as HTMLElement | null;
    const delta = slide ? slide.offsetWidth + 14 : 320;
    track.scrollBy({ left: delta * dir, behavior: "smooth" });
  };

  useEffect(() => {
    const container = formContainerRef.current;
    if (!container) return;
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://form.jotform.com/jsform/261163006523042";
    container.appendChild(script);
    return () => { script.remove(); };
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

  const faqs = [
    {
      q: "How much do pre-qualified roof coating leads cost?",
      a: "Our leads typically cost $30–$60 each, compared to $80–$150 for shared leads on HomeAdvisor. Because you're the only contractor receiving each lead, your close rate climbs to 20–35%, making your actual cost per closed job $150–$300.",
    },
    {
      q: "How quickly will I get my first lead?",
      a: "Most partners receive their first lead within 48 hours of campaign launch. We build and launch your campaign within 24 hours of your free strategy audit.",
    },
    {
      q: "How are the leads pre-qualified?",
      a: "Every lead goes through our proprietary qualification funnel before reaching you. We screen for property type, roof age, urgency, and budget. Price shoppers and tire kickers are filtered out — you only talk to prospects who are genuinely ready to move forward.",
    },
    {
      q: "Do I need to sign a long-term contract?",
      a: "No contracts. You set your budget, you control your spend, and you can pause or adjust anytime. We earn your business month by month.",
    },
    {
      q: "What types of contractors do you work with?",
      a: "We specialize exclusively in roof coating and restoration — both commercial (TPO, silicone, acrylic flat roofs) and residential. We do not work with general roofing or replacement contractors.",
    },
  ];

  const benefits = [
    { icon: "fa-magic", title: "Done-For-You. Period.", body: "We build, launch, and optimize everything. Ad copy, creative, targeting, qualification funnel — handled. You just answer the phone and close the job." },
    { icon: "fa-bolt", title: "First Lead in Under 48 Hours", body: "From your strategy audit to your first qualified lead in less than two days. Our streamlined onboarding gets campaigns live fast — no 60-day 'learning phase.'" },
    { icon: "fa-dollar-sign", title: "40% Lower Cost Per Lead", body: "Our precision targeting drives cost per lead to $30–$60, vs. $80–$150 on HomeAdvisor or Google Ads. Same budget. More jobs. Better margins." },
    { icon: "fa-shield-alt", title: "Pre-Qualified Prospects Only", body: "Every lead passes our 5-step qualification funnel — property type, roof age, urgency, and budget confirmed before you ever hear a name. No tire kickers." },
    { icon: "fa-laptop", title: "Free 5-Page Custom Website", body: "Sign up and get a professionally built, SEO-ready 5-page website for your business — at zero extra cost. No agency required, no strings attached." },
    { icon: "fa-times-circle", title: "No Contracts. Cancel Anytime.", body: "We earn your business every single month. No lock-ins, no minimums, no exit fees. If results stop, so do you. That's how confident we are in the system." },
  ];

  const process = [
    { n: "01", t: "Free Strategy Audit", time: "Day 0", d: "We analyze your market, service area, and ideal customer. You get a custom campaign blueprint — written report, no obligation, no pitch." },
    { n: "02", t: "Campaign Launch", time: "Day 0–1", d: "Our team builds your Facebook Ad campaign from scratch — copy, creative, targeting, and a dedicated landing page for your service area." },
    { n: "03", t: "Lead Qualification", time: "Ongoing", d: "Every lead passes our proprietary funnel: property type, roof age, urgency, and budget verified before the lead reaches you. No tire kickers." },
    { n: "04", t: "Exclusive Delivery", time: "Day 1–2", d: "Qualified leads land in your inbox and phone via real-time SMS and email. You're the only contractor who sees each lead — ever." },
  ];

  const comparison = [
    ["Pre-qualified leads — you only talk to buyers", "Unfiltered leads with tire kickers and price shoppers"],
    ["Done-for-you campaigns — zero ad management on your end", "Self-manage Google Ads or pay $2k–$5k/mo to a generic agency"],
    ["Niche-specific: built exclusively for roof coating", "Generic 'roofing' campaigns — not your specialty, not your buyer"],
    ["First qualified lead in under 48 hours", "60–90 days of 'optimization' before results appear"],
    ["Free 5-page custom website included at no charge", "Pay separately for website, ads, management, and tools"],
    ["$30–$60 cost per lead — 40% less than competitors", "$80–$150 per lead on HomeAdvisor; unpredictable on Google"],
  ];

  const included = [
    { icon: "fa-bullseye", title: "Custom Facebook Ad Campaigns", stat: "Fully Managed", body: "Copy, creative, targeting, and optimization — done for you. Campaigns built specifically for silicone, acrylic, metal, and TPO restoration." },
    { icon: "fa-filter", title: "Lead Pre-Qualification Funnel", stat: "5-Step Screening", body: "Our proprietary multi-step funnel screens every lead for property type, roof age, urgency, and budget before it reaches your phone." },
    { icon: "fa-star", title: "Pre-Qualified, High-Intent Leads", stat: "Exclusive to You", body: "Every lead is pre-screened and delivered exclusively. Full contact details, qualification answers, and real-time notification included." },
    { icon: "fa-bell", title: "Real-Time SMS + Email Notifications", stat: "Instant Alerts", body: "The moment a lead qualifies, you get an instant SMS and email with full lead details. Call in 60 seconds and your close rate doubles." },
    { icon: "fa-phone", title: "Follow-Up Script Support", stat: "+15% Close Rate", body: "Proven call and text scripts built for roof coating. Partners using our scripts see 15%+ higher close rates on the first call." },
    { icon: "fa-user-tie", title: "Dedicated Campaign Manager", stat: "Named Contact", body: "One person who knows your business, your territory, and your goals. Not a ticket queue — a real partner who picks up the phone." },
  ];

  return (
    <>
      <nav className={`nav-m${scrolled ? " sc" : ""}`} id="mainNav">
        <div className="nav-i">
          <a href="#" className="nav-br" onClick={smoothScroll}>
            <LogoMark size={34} />
            <span className="nav-br-txt">RoofCoat<small>Leads</small></span>
          </a>
          <div className="nav-act">
            <a href="#hero-form" className="btn-pill btn-pill-red nav-pill" onClick={smoothScroll}>
              <span>Claim Free Website</span>
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
                <span className="hero-stat-big">A Proven Lead System</span> Built
                <br />
                <span className="ul">Specifically for Roof Coating.</span>
              </h1>
              <p className="hero-sub rv d2">
                100+ contractors already on the system. Pre-qualified leads from day one. Sign up and get a free custom 5-page website for your business — no strings attached.
              </p>
              <ul className="hero-checks rv d3">
                <li><i className="fas fa-check"></i> First qualified lead in under 48 hours — guaranteed</li>
                <li><i className="fas fa-check"></i> Free 5-page custom website included at no cost</li>
                <li><i className="fas fa-check"></i> Pre-qualified leads &middot; No tire kickers &middot; No contracts</li>
              </ul>
              <div className="hero-trust rv d4">
                <div className="ht-stars" aria-hidden="true">
                  <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                </div>
                <div className="ht-facts">
                  <span><strong>4.9 / 5</strong> on Google</span>
                  <span className="ht-sep" />
                  <span><strong>100+</strong> Contractors</span>
                  <span className="ht-sep" />
                  <span><strong>&lt;48h</strong> First Lead</span>
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
                  <div ref={formContainerRef} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shock-s" ref={shockRef}>
        <div className="shock-grain" aria-hidden="true" />
        <div className="wrap shock-wrap">
          <p className="shock-eyebrow">The Number That Changes Everything</p>
          <div className="shock-counter">
            <span className="shock-num">{shockCount}</span>
            <span className="shock-sign">%</span>
          </div>
          <div className="shock-bar-track">
            <div className="shock-bar-fill" style={{ width: shockVisible ? '40%' : '0%' }} />
            <span className="shock-bar-label">40% lower cost per lead</span>
          </div>
          <p className="shock-stmt">
            Our system delivers pre-qualified roof coating leads for{' '}
            <em className="shock-highlight">40% less</em>{' '}
            than Google Ads and HomeAdvisor —{' '}
            <strong>without sharing your leads</strong>{' '}
            with 5 other contractors.
            <br className="shock-br" />
            Same budget. More jobs. Better margins.
          </p>
        </div>
      </section>

      <section className="work-s">
        <div className="wrap">
          <div className="work-head">
            <div>
              <div className="tag rv"><span>Partner Results</span></div>
              <h2 className="h2 rv d1">Real Contractors. Real Numbers. <em>This Year.</em></h2>
              <p className="body-t rv d2">100+ roof coating contractors have plugged into our proven lead system. Here's what happened when they stopped guessing and started closing.</p>
            </div>
          </div>

          <div className="work-carousel">
            <button className="wc-nav wc-prev" onClick={() => scrollGallery(-1)} aria-label="Previous partners" type="button"><i className="fas fa-chevron-left"></i></button>
            <div className="wc-track" ref={galleryRef}>
              {galleryItems.map((item, i) => (
                <div key={i} className="wc-slide" style={{ position: "relative", overflow: "hidden" }}>
                  <img src={item.img} alt={`Roof coating project — ${item.name}`} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(24,31,46,.92) 40%, rgba(24,31,46,.2) 100%)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "18px" }}>
                    <div style={{ fontSize: 28, fontWeight: 700, color: "var(--amber)", lineHeight: 1, fontFamily: "var(--font-d)" }}>{item.stat}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,.65)", marginTop: 2 }}>{item.label}</div>
                    <div style={{ marginTop: 8, fontSize: 13, fontWeight: 600, color: "#fff", fontFamily: "var(--font-d)" }}>{item.name}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,.5)" }}>{item.state}</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="wc-nav wc-next" onClick={() => scrollGallery(1)} aria-label="Next partners" type="button"><i className="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </section>

      <section className="prob-s">
        <div className="wrap">
          <div className="prob-lay">
            <div className="prob-text slide-left">
              <div className="tag"><span>The Problem</span></div>
              <h2 className="h2">Still Burning Cash on<br /><em>Agencies That Don't Get Roof Coating?</em></h2>
              <p className="body-t">Generic agencies charge $2k–$5k/month and take 60–90 days to "optimize." Meanwhile you're burning through budget on leads that never close — because those agencies run the same playbook they use for plumbers and HVAC guys.</p>
              <p className="body-t">Here's what most marketing agencies will <em>never</em> tell you: roof coating is a niche. The targeting, the ad creative, the qualification funnel — it all has to be <strong>built specifically for your buyer</strong>. Or it doesn't work.</p>
              <div className="pq">We've already cracked the code for 100+ roof coating contractors. Our targeting, our ad creative, our qualification funnel — refined across thousands of leads in your exact niche. You're not a guinea pig. You're plugging into a machine that's already running.</div>
            </div>
            <div className="prob-vis slide-right">
              <div className="ba">
                <div className="ba-full" style={{ backgroundImage: "url('https://ik.imagekit.io/qcvroy8xpd/Asyrc.png?updatedAt=1776008954670')" }}>
                  <div className="ba-card ba-card-b">
                    <div className="ba-lb">Generic Agency</div>
                    <div className="ba-d">$12,800 &middot; 4 Months &middot; 14 Leads</div>
                  </div>
                  <div className="ba-card ba-card-a">
                    <div className="ba-lb">RoofCoat Leads</div>
                    <div className="ba-d">48 hrs &middot; Pre-Qualified &middot; Exclusive</div>
                  </div>
                </div>
                <div className="ba-ft"><i className="fas fa-chart-line" style={{ marginRight: 6 }}></i> Real comparison &middot; Same market &middot; Same budget</div>
              </div>
              <div className="sav-b float-el"><strong>40% Less</strong><span>per qualified lead</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="ben-s" id="ben">
        <div className="wrap">
          <div className="tag rv"><span>Why It Works</span></div>
          <h2 className="h2 rv d1">The System <em>100+ Contractors</em> Are Already Running</h2>
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
              Claim Free Website + Audit
            </a>
          </div>
        </div>
      </section>

      <section className="proc-s">
        <div className="wrap">
          <div className="proc-head">
            <div className="tag rv"><span>Process</span></div>
            <h2 className="h2 rv d1">From Signup to First Lead <em>in 48 Hours Flat</em></h2>
            <p className="body-t rv d2">100+ contractors onboarded. The exact 4-step playbook we run on every partner — no surprises, no waiting, no wasted budget.</p>
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
              <div className="proc-vis-cap"><i className="fas fa-play-circle" style={{ color: "var(--amber)", marginRight: 6 }}></i>Watch how the system works</div>
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
            <a href="#hero-form" className="btn-pill btn-pill-red" onClick={smoothScroll}>Claim Free Website + Audit</a>
          </div>
        </div>
      </section>

      <section className="case-s">
        <div className="wrap">
          <div className="tag tag-light rv"><span>Case Study</span></div>
          <h2 className="h2 h2-w rv d1">How Michael Patterson Closed <em>3 Commercial Jobs</em> — In Month One</h2>
          <div className="cs-grid">
            <div className="cs-i zoom-in"><div className="cs-lb">Company</div><div className="cs-v">Summit Roof</div><div className="cs-sub">Tampa, FL</div></div>
            <div className="cs-i zoom-in d1"><div className="cs-lb">Previous CPA</div><div className="cs-v">$142</div><div className="cs-sub">Via HomeAdvisor</div></div>
            <div className="cs-i zoom-in d2"><div className="cs-lb">Our CPA</div><div className="cs-v">$34</div><div className="cs-sub">Pre-qualified leads</div></div>
            <div className="cs-i zoom-in d3"><div className="cs-lb">Month One</div><div className="cs-v hl">3 Jobs</div><div className="cs-sub">Commercial coating</div></div>
          </div>
          <div className="row rv d3">
            <div className="col-lg-6">
              <p className="body-t body-t-w"><strong style={{ color: "#fff" }}>The situation:</strong> Michael had been paying $142 per lead on HomeAdvisor — and sharing those leads with four other contractors. His close rate was under 8%. He was spending $3,000/month and booking one job.</p>
              <p className="body-t body-t-w"><strong style={{ color: "#fff" }}>Our solution:</strong> Custom Facebook Ad campaign targeting commercial property owners in the Tampa market. Pre-qualification funnel screening for property type, roof age, and urgency. Leads delivered exclusively — no competition.</p>
              <p className="body-t" style={{ color: "var(--amber)" }}><strong>Result:</strong> 3 commercial coating jobs closed in month one. Cost per lead dropped to $34. Close rate jumped to 22%. Same budget. 3x the output.</p>
            </div>
            <div className="col-lg-5 offset-lg-1">
              <div className="cq">
                <p>"Our cost per acquisition dropped by 40%. We booked 3 commercial coating jobs in the first month alone. The system was already proven — we just plugged in."</p>
                <cite>
                  <strong><i className="fas fa-user-tie" style={{ marginRight: 6, fontSize: 11, color: "var(--amber)" }}></i> Michael Patterson</strong>
                  <span>Summit Roof Coatings &middot; Tampa, FL</span>
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
              <h2 className="h2 rv d1">Why 100+ Contractors <em>Chose Us Over</em> Google &amp; HomeAdvisor</h2>
              <p className="body-t rv d2">Generic lead platforms give you scraps — shared leads, cold prospects, and zero support. Our system was built specifically for roof coating. That difference shows up in your close rate and your bank account.</p>
              <a href="#hero-form" className="btn-pill btn-pill-red rv d3" onClick={smoothScroll}>
                Claim Free Website + Audit
              </a>
            </div>
            <div className="cmp-tbl rv d2">
              <div className="cmp-hdr">
                <div className="ch-u"><i className="fas fa-check" style={{ marginRight: 6 }}></i> RoofCoat Leads</div>
                <div className="ch-t"><i className="fas fa-times" style={{ marginRight: 6 }}></i> Everyone Else</div>
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
              <a href="#hero-form" className="btn-pill btn-pill-red rv d3" onClick={smoothScroll}>Claim Free Audit</a>
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
              <div className="tag rv"><span>What&apos;s Included</span></div>
              <h2 className="h2 rv d1">Everything You Need to Grow — <em>One Plan</em></h2>
              <p className="body-t rv d2">One system. No piecemeal tools. Every component built to work together. $1,000/month — with optional add-ons for AI appointment setting (+$500) and live secretary calls (+$500).</p>
            </div>
            <div className="ind-counter rv d2">
              <span className="ind-counter-n">$1k</span>
              <span className="ind-counter-l">/month — All-Inclusive</span>
              <span className="ind-counter-sub">No contracts &middot; Cancel anytime &middot; Free website included</span>
            </div>
          </div>

          <div className="ind-grid">
            {included.map((item, i) => (
              <div key={i} className={`ind-card rv${i > 0 ? " d" + (i % 5 || 1) : ""}`}>
                <div className="ind-ic"><i className={`fas ${item.icon}`}></i></div>
                <h3>{item.title}</h3>
                <div className="ind-stat">{item.stat}</div>
                <p>{item.body}</p>
              </div>
            ))}
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
                  <div className="ft-brand">RoofCoat Leads</div>
                </div>
                <p className="ft-blurb">We generate pre-qualified, exclusive leads for roof coating contractors across the US — using a proven Facebook Ad system built specifically for your niche. No shared leads. No contracts. No guesswork.</p>
              </div>

              <div className="ft-col">
                <div className="ft-label">Lead Services</div>
                <ul className="ft-links">
                  <li><a href="#">Facebook Ad Campaigns</a></li>
                  <li><a href="#">Lead Pre-Qualification Funnel</a></li>
                  <li><a href="#">AI Appointment Setter</a></li>
                  <li><a href="#">Live Secretary Calls</a></li>
                  <li><a href="#">Real-Time Lead Delivery</a></li>
                  <li><a href="#">Free 5-Page Custom Website</a></li>
                  <li><a href="#">Campaign Reporting &amp; ROI Tracking</a></li>
                </ul>
              </div>

              <div className="ft-col">
                <div className="ft-label">Contractors We Serve</div>
                <ul className="ft-links">
                  <li><a href="#">Commercial Silicone Coating</a></li>
                  <li><a href="#">Acrylic Roof Restoration</a></li>
                  <li><a href="#">Metal Roof Coatings</a></li>
                  <li><a href="#">TPO &amp; EPDM Restoration</a></li>
                  <li><a href="#">Residential Flat Roofs</a></li>
                  <li><a href="#">Industrial &amp; Warehouse Roofing</a></li>
                  <li><a href="#">Modified Bitumen Systems</a></li>
                </ul>
              </div>

            </div>
          </div>
        </div>

        <div className="ft-btm">
          <div className="wrap">
            <div className="ft-btm-i">
              <span className="footer-lg">© 2026 RoofCoat Leads. All rights reserved.</span>
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
