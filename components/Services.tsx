"use client";

import { useState } from "react";
import { Plus, ArrowRight } from "./Icons";
import { useDict } from "./LocaleProvider";

export function Services({ onBook }: { onBook: () => void }) {
  const { services, ui } = useDict();
  const [open, setOpen] = useState<string | null>(services[0].id);

  return (
    <section id="services" className="border-t border-line py-24 md:py-36">
      <div className="mx-auto max-w-site px-5 md:px-10">
        <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="label-eyebrow">{ui.services.eyebrow}</p>
            <h2 className="mt-6 font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.05] text-ink">
              {ui.services.titleTop}
              <br />
              {ui.services.titleBottom}
            </h2>
          </div>
          <p className="max-w-sm text-[0.95rem] leading-relaxed text-muted">
            {ui.services.intro}
          </p>
        </div>

        <div className="mt-14 border-t border-line">
          {services.map((cat) => {
            const isOpen = open === cat.id;
            return (
              <div key={cat.id} className="reveal border-b border-line">
                <button
                  onClick={() => setOpen(isOpen ? null : cat.id)}
                  className="group flex w-full items-center gap-5 py-7 text-left cursor-pointer md:gap-8 md:py-9"
                  aria-expanded={isOpen}
                  aria-controls={`panel-${cat.id}`}
                >
                  <span className="font-display text-sm text-emerald md:text-base">
                    {cat.index}
                  </span>
                  <span className="flex-1">
                    <span className="block font-display text-2xl text-ink transition-colors duration-300 group-hover:text-emerald md:text-4xl">
                      {cat.title}
                    </span>
                    <span className="mt-2 block text-sm text-muted">
                      {cat.summary}
                    </span>
                  </span>
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink transition-all duration-500 ease-lux group-hover:border-emerald group-hover:text-emerald ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    <Plus />
                  </span>
                </button>

                <div
                  id={`panel-${cat.id}`}
                  className={`grid transition-all duration-500 ease-lux ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <ul className="grid gap-x-12 gap-y-1 pb-9 md:grid-cols-2 md:pl-12">
                      {cat.items.map((item) => (
                        <li
                          key={item.name}
                          className="flex items-baseline gap-3 border-b border-line/60 py-3.5 last:border-0"
                        >
                          <span className="text-[0.97rem] text-graphite">
                            {item.name}
                          </span>
                          <span className="mx-1 flex-1 border-b border-dotted border-line" />
                          {item.price && (
                            <span className="whitespace-nowrap text-sm text-emerald">
                              {item.price}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="reveal mt-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="text-xs text-muted/80">{ui.services.priceNote}</p>
          <button onClick={onBook} className="btn-primary">
            {ui.services.cta}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
