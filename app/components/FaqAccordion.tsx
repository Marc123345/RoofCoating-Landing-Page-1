"use client";

import { useState } from "react";

export default function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div>
      {items.map((f, i) => (
        <div key={f.q} className={`faq-i${open === i ? " open" : ""}`}>
          <button
            className="faq-q"
            type="button"
            aria-expanded={open === i}
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span>{f.q}</span>
            <div className="faq-tog">+</div>
          </button>
          {open === i && (
            <div className="faq-ans">
              <p>{f.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
