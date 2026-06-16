import { brand } from "@/lib/content";

/** К/М monogram — drawn with the display serif + a diagonal hairline. */
export function Monogram({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      className={className}
      role="img"
      aria-label={`${brand.name} — монограмма`}
      style={{ fontFamily: "var(--font-display), Georgia, serif" }}
    >
      <text
        x="12"
        y="25"
        textAnchor="middle"
        fontSize="21"
        fill="currentColor"
      >
        К
      </text>
      <line
        x1="31"
        y1="9"
        x2="13"
        y2="35"
        stroke="currentColor"
        strokeWidth="0.9"
      />
      <text
        x="31"
        y="34"
        textAnchor="middle"
        fontSize="21"
        fill="currentColor"
      >
        М
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
  if (stacked) {
    return (
      <span className={`inline-flex flex-col items-center gap-1.5 ${className}`}>
        <Monogram className="h-12 w-12" />
        <span className="text-[0.62rem] uppercase tracking-wide2 text-current">
          Код Молодости
        </span>
      </span>
    );
  }
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Monogram className="h-9 w-9 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="text-[0.7rem] uppercase tracking-wide2">Код</span>
        <span className="text-[0.7rem] uppercase tracking-wide2">Молодости</span>
      </span>
    </span>
  );
}
