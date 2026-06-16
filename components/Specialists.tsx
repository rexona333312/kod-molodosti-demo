"use client";

import { Monogram } from "./Logo";
import { useDict } from "./LocaleProvider";

export function Specialists() {
  const { specialists, ui } = useDict();
  return (
    <section id="specialists" className="border-t border-line bg-cream py-24 md:py-36">
      <div className="mx-auto max-w-site px-5 md:px-10">
        <div className="reveal max-w-2xl">
          <p className="label-eyebrow">{ui.specialists.eyebrow}</p>
          <h2 className="mt-6 font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.05] text-ink">
            {ui.specialists.titleTop}
            <br />
            {ui.specialists.titleBottom}
          </h2>
          <p className="mt-7 text-lg leading-relaxed text-muted">
            {ui.specialists.body}
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-[2px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {specialists.map((s, i) => (
            <article key={i} className="reveal group bg-cream">
              <div className="relative flex aspect-[3/4] items-center justify-center overflow-hidden bg-sage/60">
                <Monogram className="h-20 w-20 text-emerald/30 transition-transform duration-700 ease-lux group-hover:scale-110" />
                <span className="absolute bottom-4 left-4 rounded-full bg-cream/90 px-3 py-1 text-[0.65rem] uppercase tracking-label text-muted">
                  {ui.specialists.photoBadge}
                </span>
              </div>
              <div className="p-7">
                <h3 className="font-display text-2xl text-ink">{s.name}</h3>
                <p className="mt-2 text-sm text-emerald">{s.role}</p>
                <p className="mt-1 text-sm text-muted">{s.exp}</p>
              </div>
            </article>
          ))}
        </div>

        <p className="reveal mt-8 text-xs text-muted/80">{ui.specialists.note}</p>
      </div>
    </section>
  );
}
