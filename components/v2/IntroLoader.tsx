"use client";

import { useEffect, useRef, useState } from "react";
import { Monogram } from "@/components/Logo";
import { useDict } from "@/components/LocaleProvider";

/**
 * Branded intro (~3.5s): the clinic name is "typed as code" — playing on
 * Код = code (RU) / { code: "Code of Youth" } (EN) — then resolves from
 * monospace into the elegant serif lockup.
 */
export function IntroLoader({ onDone }: { onDone: () => void }) {
  const { brand, ui } = useDict();
  const value = brand.name;
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<"typing" | "resolve">("typing");
  const done = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const finish = () => {
      if (done.current) return;
      done.current = true;
      onDone();
    };

    if (reduce) {
      setTyped(value);
      setPhase("resolve");
      timers.push(setTimeout(finish, 1100));
      return () => timers.forEach(clearTimeout);
    }

    // type the value character by character
    let i = 0;
    const step = () => {
      i += 1;
      setTyped(value.slice(0, i));
      if (i < value.length) {
        timers.push(setTimeout(step, 110 + (value[i - 1] === " " ? 80 : 0)));
      } else {
        timers.push(
          setTimeout(() => setPhase("resolve"), 650),
        );
        timers.push(setTimeout(finish, 650 + 1500));
      }
    };
    timers.push(setTimeout(step, 450));

    return () => timers.forEach(clearTimeout);
  }, [onDone, value]);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center overflow-hidden bg-porcelain px-6">
      {/* code line */}
      <div
        className={`absolute flex max-w-full flex-wrap items-center justify-center gap-x-1 font-mono text-[clamp(1.1rem,4.5vw,2rem)] transition-all duration-700 ease-lux ${
          phase === "resolve" ? "translate-y-[-10px] opacity-0 blur-[2px]" : "opacity-100"
        }`}
        aria-hidden={phase === "resolve"}
      >
        <span className="text-muted/70">{"{ "}</span>
        <span className="text-emerald">{ui.intro.codeKey}</span>
        <span className="text-muted/70">{" : "}</span>
        <span className="text-ink">
          &quot;{typed}
          {phase === "typing" && (
            <span className="caret ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.15em] bg-emerald align-middle" />
          )}
          &quot;
        </span>
        <span className="text-muted/70">{" }"}</span>
      </div>

      {/* resolved serif lockup */}
      <div
        className={`flex flex-col items-center text-center transition-all duration-1000 ease-lux ${
          phase === "resolve"
            ? "scale-100 opacity-100 blur-0"
            : "scale-[0.96] opacity-0 blur-[3px]"
        }`}
        aria-label={brand.name}
      >
        <Monogram className="h-14 w-14 text-emerald sm:h-16 sm:w-16" />
        <h1 className="mt-4 font-display text-[clamp(2.2rem,8vw,4rem)] leading-none text-ink">
          {brand.name}
        </h1>
        <p className="mt-3 text-[0.7rem] uppercase tracking-wide2 text-muted sm:text-xs">
          {brand.type}
        </p>
      </div>

      {/* progress hairline */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-line/60">
        <div
          className="h-full bg-emerald transition-[width] duration-[3500ms] ease-linear"
          style={{ width: phase === "resolve" ? "100%" : "8%" }}
        />
      </div>
    </div>
  );
}
