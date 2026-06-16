"use client";

import Image from "next/image";
import { ArrowRight, ArrowDown } from "./Icons";
import { useDict } from "./LocaleProvider";

export function Hero({
  onBook,
  onNavigate,
}: {
  onBook: () => void;
  onNavigate: (t: string) => void;
}) {
  const { brand, heroImage, ui } = useDict();
  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-[100svh] max-w-site flex-col justify-center px-5 pb-16 pt-28 md:px-10 md:pt-32"
    >
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <p className="reveal label-eyebrow">{brand.type}</p>

          <h1 className="reveal mt-6 font-display text-[clamp(3rem,8.5vw,7rem)] leading-[0.92] text-ink">
            {ui.hero.titleTop}
            <br />
            <span className="italic text-emerald">{ui.hero.titleAccent}</span>
          </h1>

          <p className="reveal mt-8 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
            {brand.principle}
          </p>

          <div className="reveal mt-10 flex flex-wrap items-center gap-4">
            <button onClick={onBook} className="btn-primary">
              {ui.hero.bookCta}
              <ArrowRight className="h-4 w-4" />
            </button>
            <button onClick={() => onNavigate("services")} className="btn-ghost">
              {ui.hero.servicesCta}
            </button>
          </div>

          <div className="reveal mt-12 flex items-center gap-8 text-sm text-muted">
            <span>
              <span className="font-display text-2xl text-ink">
                {new Date().getFullYear() - brand.since}+
              </span>{" "}
              {ui.hero.statYears}
            </span>
            <span className="h-8 w-px bg-line" />
            <span>
              <span className="font-display text-2xl text-ink">6</span> {ui.hero.statAreas}
            </span>
            <span className="h-8 w-px bg-line" />
            <span className="max-w-[12rem] leading-snug">{ui.hero.statLicense}</span>
          </div>
        </div>

        <div className="reveal lg:col-span-5">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2px]">
              <Image
                src={heroImage}
                alt={ui.hero.imgAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 hidden border border-line bg-cream px-6 py-4 md:block">
              <p className="text-xs uppercase tracking-label text-muted">{brand.city}</p>
              <p className="mt-1 font-display text-lg text-ink">{ui.hero.cardStreet}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
        <ArrowDown className="h-5 w-5 animate-scroll-cue text-emerald" />
      </div>
    </section>
  );
}
