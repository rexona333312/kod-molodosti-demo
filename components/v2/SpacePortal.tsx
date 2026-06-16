"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Monogram } from "@/components/Logo";
import { portalCards, brand, contacts } from "@/lib/content";

// ---------------------------------------------------------------------------
// Nav cards (the 4 real sections) sit on a ring; decorative cards float
// further out as ambiance. Scroll / swipe rotates the whole world (camera
// orbit), the front-facing card is "selected", click to enter.
// ---------------------------------------------------------------------------

const NAV_RADIUS = 470;
const DECO_RADIUS = 720;

type NavCard = (typeof portalCards)[number] & {
  base: number;
  scatterY: number;
  roll: number;
};

const navLayout: Record<string, { base: number; scatterY: number; roll: number }> = {
  services: { base: 0, scatterY: -22, roll: -4 },
  specialists: { base: 90, scatterY: 28, roll: 5 },
  about: { base: 180, scatterY: -30, roll: 4 },
  contacts: { base: 270, scatterY: 22, roll: -5 },
};

const navCards: NavCard[] = portalCards.map((c) => ({ ...c, ...navLayout[c.id] }));

const decoCards = [
  { base: 50, scatterY: -150, roll: 8, image: "/images/deco-1.jpg" },
  { base: 170, scatterY: 150, roll: -7, image: "/images/deco-2.jpg" },
  { base: 290, scatterY: -120, roll: 6, image: "/images/deco-3.jpg" },
];

export function SpacePortal({ onEnter }: { onEnter: (target: string | null) => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const navRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const decoRefs = useRef<(HTMLDivElement | null)[]>([]);

  const current = useRef(0);
  const target = useRef(0);
  const frontIndex = useRef(0);
  const entering = useRef(false);

  const [front, setFront] = useState(0);
  const [isTouch, setIsTouch] = useState(false);

  // imperative enter, bound in effect
  const enterRef = useRef<(t: string | null) => void>(() => {});
  const enter = (t: string | null) => enterRef.current(t);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsTouch(
      window.matchMedia("(pointer: coarse)").matches ||
        (navigator.maxTouchPoints || 0) > 0 ||
        "ontouchstart" in window,
    );

    const world = worldRef.current!;
    const navEls = navRefs.current.filter(Boolean) as HTMLButtonElement[];
    const decoEls = decoRefs.current.filter(Boolean) as HTMLDivElement[];

    gsap.config({ force3D: true });
    const coarse =
      window.matchMedia("(pointer: coarse)").matches ||
      (navigator.maxTouchPoints || 0) > 0 ||
      "ontouchstart" in window;
    const blurEnabled = !coarse && !reduce; // blur filter is costly on mobile

    type Item = { el: HTMLElement; base: number; deco: boolean };
    const items: Item[] = [
      ...navEls.map((el, i) => ({ el, base: navCards[i].base, deco: false })),
      ...decoEls.map((el, i) => ({ el, base: decoCards[i].base, deco: true })),
    ];
    const cache = items.map(() => ({ op: -1, bl: -1, z: -1 }));

    let raf = 0;
    let running = false;
    let snapTimer: ReturnType<typeof setTimeout> | null = null;

    const render = () => {
      world.style.transform = `rotateY(${current.current}deg)`;
      for (let i = 0; i < items.length; i++) {
        const { el, base, deco } = items[i];
        const eff = (((base + current.current) % 360) + 540) % 360 - 180;
        const f = Math.cos((eff * Math.PI) / 180); // 1 front .. -1 back
        const base01 = 0.1 + 0.9 * Math.pow((f + 1) / 2, 1.7);
        const op = Math.round((deco ? base01 * 0.5 : base01) * 1000) / 1000;
        const bl = blurEnabled && f <= 0.25 ? Math.round((0.25 - f) * 30) / 10 : 0;
        const z = Math.round((f + 1) * 100);
        const c = cache[i];
        // only touch the DOM when a value actually changed
        if (op !== c.op) { el.style.opacity = String(op); c.op = op; }
        if (bl !== c.bl) { el.style.filter = bl ? `blur(${bl}px)` : "none"; c.bl = bl; }
        if (z !== c.z) { el.style.zIndex = String(z); c.z = z; }
      }
      const fi = ((((Math.round(-current.current / 90)) % 4) + 4) % 4);
      if (fi !== frontIndex.current) {
        frontIndex.current = fi;
        setFront(fi);
      }
    };

    // Loop parks itself when settled (no idle CPU/GPU burn) and is woken on input.
    const tick = () => {
      const lerp = reduce ? 1 : 0.09;
      current.current += (target.current - current.current) * lerp;
      if (Math.abs(target.current - current.current) < 0.02) {
        current.current = target.current;
        render();
        running = false;
        raf = 0;
        return;
      }
      render();
      raf = requestAnimationFrame(tick);
    };
    const wake = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };
    render();
    wake();

    const snap = () => {
      target.current = Math.round(target.current / 90) * 90;
      wake();
    };
    const queueSnap = () => {
      if (snapTimer) clearTimeout(snapTimer);
      snapTimer = setTimeout(snap, 170);
    };

    const onWheel = (e: WheelEvent) => {
      if (entering.current) return;
      e.preventDefault();
      target.current += e.deltaY * 0.16;
      wake();
      queueSnap();
    };

    let lastX = 0;
    let lastY = 0;
    const onTouchStart = (e: TouchEvent) => {
      setIsTouch(true); // definitive: a real touch occurred → swipe wording
      lastX = e.touches[0].clientX;
      lastY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (entering.current) return;
      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;
      const dx = x - lastX;
      const dy = y - lastY;
      // horizontal or vertical swipe both rotate
      target.current -= (Math.abs(dx) > Math.abs(dy) ? dx : -dy) * 0.4;
      lastX = x;
      lastY = y;
      wake();
      queueSnap();
      e.preventDefault();
    };

    const onKey = (e: KeyboardEvent) => {
      if (entering.current) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") target.current += 90;
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") target.current -= 90;
      else return;
      snap();
    };

    const root = rootRef.current!;
    root.addEventListener("wheel", onWheel, { passive: false });
    root.addEventListener("touchstart", onTouchStart, { passive: true });
    root.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKey);

    // intro reveal — fromTo with explicit targets + context so React Strict
    // Mode's double-invoke can't capture a mid-animation value as the target.
    const ctx = gsap.context(() => {
      if (!reduce) {
        gsap.fromTo(
          stageRef.current,
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 1.3, ease: "power3.out" },
        );
        gsap.fromTo(
          ".v2-ui",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.08, delay: 0.4, ease: "power3.out" },
        );
      }
    }, rootRef);

    enterRef.current = (t) => {
      if (entering.current) return;
      entering.current = true;
      if (reduce) {
        onEnter(t);
        return;
      }
      const tl = gsap.timeline({ onComplete: () => onEnter(t) });
      tl.to(".v2-ui", { opacity: 0, y: 12, duration: 0.4, ease: "power2.in" })
        .to(stageRef.current, { scale: 1.45, duration: 0.9, ease: "power2.in" }, 0)
        .to(rootRef.current, { opacity: 0, duration: 0.6, ease: "power2.inOut" }, 0.4);
    };

    return () => {
      cancelAnimationFrame(raf);
      if (snapTimer) clearTimeout(snapTimer);
      ctx.revert();
      root.removeEventListener("wheel", onWheel);
      root.removeEventListener("touchstart", onTouchStart);
      root.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKey);
    };
  }, [onEnter]);

  const cardSize =
    "w-[clamp(140px,19vw,224px)] aspect-[3/4]";

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-50 touch-none select-none overflow-hidden bg-porcelain"
    >
      {/* ambient light */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(60% 55% at 50% 45%, rgba(15,93,73,0.05), transparent 72%)" }}
      />

      {/* 3D scene */}
      <div className="absolute inset-0" style={{ perspective: "1200px", perspectiveOrigin: "50% 48%" }}>
        <div ref={stageRef} className="preserve-3d absolute inset-0">
          <div ref={worldRef} className="preserve-3d absolute inset-0">
            {/* decorative cards */}
            {decoCards.map((c, i) => (
              <div
                key={`deco-${i}`}
                ref={(el) => { decoRefs.current[i] = el; }}
                className={`absolute left-1/2 top-1/2 overflow-hidden rounded-[2px] border border-line bg-sage/40 ${cardSize}`}
                style={{
                  transform: `translate(-50%,-50%) rotateY(${c.base}deg) translateZ(${DECO_RADIUS}px) translateY(${c.scatterY}px) rotateZ(${c.roll}deg)`,
                }}
                aria-hidden
              >
                <Image
                  src={c.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 40vw, 220px"
                  className="object-cover"
                />
              </div>
            ))}

            {/* navigable cards */}
            {navCards.map((c, i) => (
              <button
                key={c.id}
                ref={(el) => { navRefs.current[i] = el; }}
                onClick={() => enter(c.target)}
                aria-label={`Открыть раздел «${c.label}»`}
                className={`group absolute left-1/2 top-1/2 cursor-pointer ${cardSize}`}
                style={{
                  transform: `translate(-50%,-50%) rotateY(${c.base}deg) translateZ(${NAV_RADIUS}px) translateY(${c.scatterY}px) rotateZ(${c.roll}deg)`,
                }}
              >
                <span className="relative block h-full w-full overflow-hidden rounded-[2px] border border-line bg-gradient-to-br from-sage to-cream shadow-[0_30px_60px_-30px_rgba(20,40,32,0.5)] transition-shadow duration-500 group-hover:shadow-[0_42px_80px_-28px_rgba(15,93,73,0.55)]">
                  <Image
                    src={c.image}
                    alt={c.label}
                    fill
                    sizes="(max-width: 640px) 45vw, 230px"
                    className="object-cover transition-transform duration-700 ease-lux group-hover:scale-105"
                  />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ---- top UI ---- */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between px-5 py-5 md:px-9">
        <p className="v2-ui hidden text-[0.62rem] uppercase tracking-label text-muted sm:block">
          Иваново · с {brand.since}
        </p>
        <div className="v2-ui flex flex-col items-center">
          <Monogram className="h-9 w-9 text-emerald" />
          <span className="mt-1 text-[0.55rem] uppercase tracking-wide2 text-muted">
            Код Молодости
          </span>
        </div>
        <a
          href={contacts.phoneHref}
          className="v2-ui pointer-events-auto hidden text-[0.62rem] uppercase tracking-label text-ink transition-colors hover:text-emerald sm:block"
        >
          {contacts.phone}
        </a>
      </div>

      {/* ---- hint ---- */}
      <div className="v2-ui pointer-events-none absolute inset-x-0 bottom-[236px] flex flex-col items-center gap-2 px-6 text-center sm:bottom-[160px]">
        {isTouch ? <SwipeGlyph /> : <WheelGlyph />}
        <p className="max-w-[80vw] text-[0.6rem] uppercase tracking-[0.16em] text-muted sm:text-[0.66rem] sm:tracking-label">
          {isTouch ? "Проведите пальцем — выберите раздел" : "Листайте колёсиком — выберите раздел"}
        </p>
      </div>

      {/* ---- bottom menu: desktop scattered ---- */}
      <nav className="absolute inset-x-0 bottom-9 z-10 hidden sm:block" aria-label="Навигация по разделам">
        <div className="relative mx-auto h-[92px] max-w-2xl px-4">
          <MenuItem className="absolute left-[8%] top-[44px] -rotate-2 text-lg md:text-2xl" active={front === 0} onClick={() => enter("services")}>
            Услуги
          </MenuItem>
          <MenuItem className="absolute left-[24%] top-[2px] rotate-1 text-lg md:text-2xl" active={front === 2} onClick={() => enter("about")}>
            О клинике
          </MenuItem>
          <MenuItem className="absolute right-[24%] top-[2px] -rotate-1 text-lg md:text-2xl" active={front === 1} onClick={() => enter("specialists")}>
            Специалисты
          </MenuItem>
          <MenuItem className="absolute right-[8%] top-[44px] rotate-2 text-lg md:text-2xl" active={front === 3} onClick={() => enter("contacts")}>
            Контакты
          </MenuItem>
          <button
            onClick={() => enter("booking")}
            className="v2-ui absolute left-1/2 top-[34px] -translate-x-1/2 cursor-pointer rounded-full bg-emerald px-7 py-3 text-xs uppercase tracking-label text-cream transition-colors duration-300 hover:bg-emerald-deep"
          >
            Записаться
          </button>
        </div>
      </nav>

      {/* ---- bottom menu: mobile clean ---- */}
      <nav className="absolute inset-x-0 bottom-7 z-10 px-6 sm:hidden" aria-label="Навигация по разделам">
        <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-1">
          <MenuItem className="px-1 py-1.5 text-xl" active={front === 0} onClick={() => enter("services")}>Услуги</MenuItem>
          <MenuItem className="px-1 py-1.5 text-xl" active={front === 1} onClick={() => enter("specialists")}>Специалисты</MenuItem>
          <MenuItem className="px-1 py-1.5 text-xl" active={front === 2} onClick={() => enter("about")}>О клинике</MenuItem>
          <MenuItem className="px-1 py-1.5 text-xl" active={front === 3} onClick={() => enter("contacts")}>Контакты</MenuItem>
        </div>
        <button
          onClick={() => enter("booking")}
          className="v2-ui mt-4 w-full cursor-pointer rounded-full bg-emerald px-7 py-3.5 text-xs uppercase tracking-label text-cream transition-colors duration-300 hover:bg-emerald-deep"
        >
          Записаться
        </button>
      </nav>

      {/* copyright corners */}
      <span className="v2-ui pointer-events-none absolute bottom-4 left-5 hidden text-[0.6rem] text-muted/70 md:block">
        © {new Date().getFullYear()} Код Молодости
      </span>
    </div>
  );
}

function MenuItem({
  children,
  onClick,
  active,
  className = "",
}: {
  children: React.ReactNode;
  onClick: () => void;
  active: boolean;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`v2-ui cursor-pointer font-display leading-none transition-colors duration-300 ${
        active ? "text-emerald" : "text-ink/35 hover:text-ink"
      } ${className}`}
    >
      {children}
    </button>
  );
}

function WheelGlyph() {
  return (
    <span className="flex h-9 w-6 items-start justify-center rounded-full border border-muted/40 p-1.5">
      <span className="h-2 w-1 animate-scroll-cue rounded-full bg-emerald" />
    </span>
  );
}

function SwipeGlyph() {
  return (
    <svg width="34" height="22" viewBox="0 0 34 22" fill="none" className="text-emerald" aria-hidden>
      <path d="M5 11h24" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M24 5l6 6-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 5l-6 6 6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
    </svg>
  );
}
