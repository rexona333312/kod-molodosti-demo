"use client";

import { useState } from "react";
import { MapPin } from "./Icons";
import { useDict } from "./LocaleProvider";

/**
 * Click-to-load facade for the Yandex map. The heavy third-party iframe is
 * only mounted on user interaction, so it never blocks initial load / TBT.
 */
export function MapEmbed() {
  const { contacts, ui } = useDict();
  const [show, setShow] = useState(false);

  if (show) {
    return (
      <div className="h-full min-h-[360px] overflow-hidden rounded-[2px] border border-line">
        <iframe
          src={contacts.mapSrc}
          title={ui.map.iframeTitle}
          className="h-full min-h-[360px] w-full grayscale-[0.2]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => setShow(true)}
      aria-label={ui.map.aria}
      className="group relative flex h-full min-h-[360px] w-full cursor-pointer flex-col items-center justify-center gap-4 overflow-hidden rounded-[2px] border border-line bg-sage/50 transition-colors duration-300 hover:bg-sage/70"
    >
      {/* subtle map-grid texture */}
      <span
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(#0f5d4912 1px, transparent 1px), linear-gradient(90deg, #0f5d4912 1px, transparent 1px)",
          backgroundSize: "38px 38px",
        }}
      />
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-emerald/30 bg-cream text-emerald transition-transform duration-300 group-hover:scale-110">
        <MapPin className="h-6 w-6" />
      </span>
      <span className="relative font-display text-xl text-ink">{contacts.address}</span>
      <span className="relative rounded-full bg-emerald px-6 py-2.5 text-xs uppercase tracking-label text-cream transition-colors duration-300 group-hover:bg-emerald-deep">
        {ui.map.showMap}
      </span>
    </button>
  );
}
