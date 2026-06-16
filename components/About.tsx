"use client";

import { useDict } from "./LocaleProvider";

export function About() {
  const { advantages, brand, ui } = useDict();
  return (
    <section id="about" className="border-t border-line bg-cream py-24 md:py-36">
      <div className="mx-auto max-w-site px-5 md:px-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="reveal label-eyebrow">{ui.about.eyebrow}</p>
            <h2 className="reveal mt-6 font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.05] text-ink">
              {ui.about.title}
            </h2>
            <p className="reveal mt-7 text-lg leading-relaxed text-muted">
              {ui.about.body}
            </p>
            <p className="reveal mt-5 text-sm leading-relaxed text-muted/90">
              {brand.legalName}. {brand.license}.
            </p>
          </div>

          <div className="lg:col-span-7">
            <dl className="grid gap-px overflow-hidden rounded-[2px] border border-line bg-line sm:grid-cols-2">
              {advantages.map((a) => (
                <div
                  key={a.n}
                  className="reveal group bg-cream p-7 transition-colors duration-500 hover:bg-sage/50 md:p-9"
                >
                  <span className="font-display text-sm text-emerald">{a.n}</span>
                  <dt className="mt-4 font-display text-2xl text-ink">{a.title}</dt>
                  <dd className="mt-3 text-[0.95rem] leading-relaxed text-muted">
                    {a.text}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
