/**
 * Shared content for the Roof Coat Pros site (lp1.heyroof.org / heyroof.org).
 *
 * The per-client brand pages (bcs, summit-roofing, brightshield, 5starroofing,
 * lux-roofing) render LandingPage on its own and deliberately do NOT use any of
 * this — they stay single-page, because middleware rewrites every path under
 * their subdomain into /<brand>/… and the multi-page routes do not exist there.
 */

export const SITE = {
  brand: "Roof Coat Pros",
  tagline: "Commercial Roof Coating Specialists",
  phone: "(555) 012-3456",
  phoneHref: "tel:+15550123456",
  email: "hello@heyroof.org",
  hours: "Mon–Fri, 7am–6pm",
  formId: "262455881771063",
};

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/roof-coating", label: "Roof Coating" },
  { href: "/why-coating", label: "Why Coating" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export const heroSlides = [
  "https://images.unsplash.com/photo-1632759145351-1d592919f522?w=1920&q=80",
  "https://ik.imagekit.io/qcvroy8xpd/Asyrc.png?updatedAt=1776008954670",
  "https://ik.imagekit.io/qcvroy8xpd/Sylicone.jpeg?updatedAt=1776009369481",
  "https://ik.imagekit.io/qcvroy8xpd/34.png",
  "https://ik.imagekit.io/qcvroy8xpd/580c524e-ceaa-4322-801d-0e8c216bebdd.png?updatedAt=1776666137369",
];

export const workImages = [
  "34.png", "20.png", "35.png", "22.png", "37.png",
  "26.png", "30.png", "23.png", "29.png", "13.png",
];

export const videos = [
  { src: "https://ik.imagekit.io/qcvroy8xpd/Video.mp4", label: "Coating Application" },
  { src: "https://ik.imagekit.io/qcvroy8xpd/Video%202.mp4", label: "Finished Roof" },
];

export const benefits = [
  { icon: "fa-dollar-sign", title: "Save Up To 75% — Period.", body: "Replacement: $8–$14/sq ft. Coating: $3–$5. On a 20,000 sq ft roof, you keep $100K+ in your pocket. Same waterproofing. Better warranty." },
  { icon: "fa-volume-mute", title: "Zero Disruption — Tenants Won't Know", body: "No tear-off. No dumpsters. No closed parking. No noise. We're in and out before your tenants notice anything changed." },
  { icon: "fa-shield-alt", title: "20-Year Manufacturer Warranty", body: "Backed in writing by the manufacturer — not a contractor handshake. Fully transferable when you sell the building." },
  { icon: "fa-thermometer-quarter", title: "Cooling Bills Drop 25% — Day One", body: "Reflective coatings cut rooftop temps by up to 60°F. Your HVAC stops fighting the sun. Energy savings start the day we leave." },
  { icon: "fa-leaf", title: "Keep 20+ Tons Out Of The Landfill", body: "Tear-offs send a mountain of debris to the dump. Coating restores what's already there — and your tenants love the green credentials." },
  { icon: "fa-clock", title: "Bone-Dry In 3 Days Flat", body: "Most commercial roofs fully coated in 1–3 working days. Sealed, warrantied, and leak-free by the end of the week. No exceptions." },
];

export const process = [
  { n: "01", t: "Free Inspection — No Pressure", time: "1–2 hrs", d: "We inspect, measure, and tell you straight up if coating is right. Written report in your inbox same week. Zero obligation." },
  { n: "02", t: "Fixed Quote — Zero Surprises", time: "24–48 hrs", d: "Silicone, acrylic, or hybrid — we recommend the smartest system for your roof, climate, and budget. Locked-in price. No change orders." },
  { n: "03", t: "Enjoy a 20-Year Bone-Dry Roof", time: "1–3 days", d: "Certified crew cleans, primes, coats. You get manufacturer warranty docs in hand and the smartest decision you'll make this year." },
];

export const roofTypes = [
  { icon: "fa-layer-group", title: "TPO", sub: "Single-Ply Thermoplastic", stat: "Most common flat roof" },
  { icon: "fa-circle", title: "EPDM", sub: "Synthetic Rubber Membrane", stat: "Ideal for cold climates" },
  { icon: "fa-square", title: "PVC", sub: "Durable Polyvinyl Membrane", stat: "Chemical-resistant" },
  { icon: "fa-hammer", title: "Metal", sub: "Standing Seam & R-Panel", stat: "Stops rust & leaks" },
  { icon: "fa-layer-group", title: "Modified Bitumen", sub: "Asphalt-Based Membrane", stat: "High-traffic roofs" },
  { icon: "fa-th", title: "Built-Up", sub: "Traditional Tar & Gravel", stat: "Multi-layer system" },
];

/** Coating systems we install, for the Roof Coating page. */
export const systems = [
  {
    name: "Silicone",
    best: "Flat roofs that pond water",
    life: "15–20 years",
    body: "The workhorse for commercial flat roofs. Silicone shrugs off standing water and UV without chalking or getting brittle, which is exactly where cheaper systems fail. It is the system we specify most often.",
    points: ["Handles ponding water indefinitely", "No annual recoat needed", "Highest reflectivity retention"],
  },
  {
    name: "Acrylic",
    best: "Sloped metal roofs on a budget",
    life: "10–15 years",
    body: "Water-based, lower cost per square foot, and excellent on roofs that drain properly. On a sloped metal building it delivers most of the benefit of silicone for meaningfully less money.",
    points: ["Lowest cost per sq ft", "Excellent on metal and sloped decks", "Easy to recoat later"],
  },
  {
    name: "Hybrid / Polyurethane",
    best: "High-traffic and impact-prone roofs",
    life: "15–20 years",
    body: "Where crews, carts, and equipment live on the roof, a polyurethane topcoat takes the abuse that a straight silicone would not. We use it around rooftop plant and service walkways.",
    points: ["Highest impact and foot-traffic resistance", "Pairs with silicone as a topcoat", "Ideal around HVAC plant"],
  },
];

export const faqs = [
  { q: "How long does a roof coating last?", a: "A properly applied silicone coating lasts 15–20 years. With a maintenance recoat, you can extend indefinitely — without ever tearing it off." },
  { q: "Is my roof a good candidate?", a: "Most flat and low-slope roofs qualify if the deck is structurally sound. We determine this during our free inspection. If coating isn't right, we'll tell you." },
  { q: "Silicone vs. acrylic — what's the difference?", a: "Silicone handles ponding water and UV better — ideal for flat roofs. Acrylic is more affordable for sloped metal roofs. We recommend based on your situation." },
  { q: "Will coating fix my current leaks?", a: "Yes. We repair all damage before applying the coating. The system then seals the entire roof surface." },
  { q: "Do I need to vacate during application?", a: "No. No tear-off, minimal noise, no structural work. Business continues as normal." },
  { q: "What does it cost?", a: "Coating runs roughly $3–$5 per square foot against $8–$14 for replacement. Your inspection comes back with a fixed number for your roof, not a range." },
  { q: "Does the warranty transfer if I sell the building?", a: "Yes. The manufacturer warranty is written against the roof, not the owner, and transfers with the sale." },
];

export const caseStudy = {
  size: "45,000 ft²",
  replacement: "$189,000",
  coating: "$62,000",
  saved: "$127,000",
  situation: "45,000 sq ft commercial office, 18-year-old flat TPO roof. Multiple leaks, interior damage. Replacement quote: $189,000.",
  solution: "Full silicone coating with complete surface prep. 20-year manufacturer warranty. Total: $62,000. Done in 4 days.",
  result: "$127,000 saved. Zero leaks in 3 years. Warranty transfers with sale.",
  quote: "We were ready to write a check for $189K. They saved us six figures and the roof has been bone dry since. I wish I'd called them first.",
  author: "Michael Hartman",
  role: "Property Manager · Commercial Office Park",
};

/** Replacement vs coating, line by line — the Why Coating page. */
export const comparison = [
  { label: "Cost per sq ft", replace: "$8 – $14", coat: "$3 – $5" },
  { label: "Time on site", replace: "3 – 6 weeks", coat: "1 – 3 days" },
  { label: "Tear-off debris", replace: "20+ tons to landfill", coat: "None" },
  { label: "Tenant disruption", replace: "Noise, dumpsters, closed parking", coat: "Business as usual" },
  { label: "Warranty", replace: "10 – 20 years", coat: "Up to 20 years, transferable" },
  { label: "Cooling load", replace: "Unchanged", coat: "Down ~25% from day one" },
  { label: "Repeatable", replace: "Full tear-off again", coat: "Recoat, no tear-off" },
];

export const stats = [
  { val: "1,200+", label: "Roofs Coated" },
  { val: "$127K", label: "Avg. Project Savings" },
  { val: "75%", label: "Max Savings vs. Replacement" },
  { val: "20 yr", label: "Manufacturer Warranty" },
];
