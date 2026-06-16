"use client";

import { useDict } from "./LocaleProvider";

/** Monogram — drawn with the display serif + a diagonal hairline. */
export function Monogram({ className = "" }: { className?: string }) {
  const { brand } = useDict();
  const [left, right] = brand.monogram;
  return (
    <svg
      viewBox="0 0 44 44"
      className={className}
      role="img"
      aria-label={`${brand.name} — monogram`}
      style={{ fontFamily: "var(--font-display), Georgia, serif" }}
    >
      <text x="12" y="25" textAnchor="middle" fontSize="21" fill="currentColor">
        {left}
      </text>
      <line x1="31" y1="9" x2="13" y2="35" stroke="currentColor" strokeWidth="0.9" />
      <text x="31" y="34" textAnchor="middle" fontSize="21" fill="currentColor">
        {right}
      </text>
    </svg>
  );
}

export function Logo({
  className = "",
  stacked = false,
}: {
  className?: string;
  stacked?: boolean;
}) {
  const { brand } = useDict();

  if (stacked) {
    return (
      <span className={`inline-flex flex-col items-center gap-1.5 ${className}`}>
        <Monogram className="h-12 w-12" />
        <span className="text-[0.62rem] uppercase tracking-wide2 text-current">
          {brand.name}
        </span>
      </span>
    );
  }
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Monogram className="h-9 w-9 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="text-[0.7rem] uppercase tracking-wide2">{brand.logoLine1}</span>
        <span className="text-[0.7rem] uppercase tracking-wide2">{brand.logoLine2}</span>
      </span>
    </span>
  );
}
