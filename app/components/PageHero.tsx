import Link from "next/link";

export default function PageHero({
  eyebrow,
  title,
  lead,
  image,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead: string;
  image: string;
}) {
  return (
    <header className="ph">
      <div className="ph-bg" style={{ backgroundImage: `url('${image}')` }} aria-hidden="true" />
      <div className="ph-veil" aria-hidden="true" />
      <div className="wrap ph-wrap">
        <div className="tag tag-light"><span>{eyebrow}</span></div>
        <h1 className="ph-h1">{title}</h1>
        <p className="ph-lead">{lead}</p>
        <Link href="/contact" className="btn-p ph-cta">Get My Free Inspection</Link>
      </div>
    </header>
  );
}
