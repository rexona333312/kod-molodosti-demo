"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Monogram } from "./Logo";
import { portalCards, brand } from "@/lib/content";

type CardLayout = { pos: string; depth: number; rot: number };

const layout: Record<string, CardLayout> = {
  services: {
    pos: "left-[4%] top-[12%] w-[40vw] max-w-[215px] sm:left-[6%] sm:w-[20vw]",
    depth: 58,
    rot: -7,
  },
  specialists: {
    pos: "right-[4%] top-[9%] w-[36vw] max-w-[195px] sm:right-[6%] sm:w-[19vw]",
    depth: 90,
    rot: 6,
  },
  about: {
    pos: "left-[5%] bottom-[7%] w-[34vw] max-w-[185px] sm:left-[10%] sm:w-[17vw]",
    depth: 40,
    rot: 7,
  },
  contacts: {
    pos: "right-[5%] bottom-[8%] w-[38vw] max-w-[205px] sm:right-[8%] sm:w-[20vw]",
    depth: 100,
    rot: -6,
  },
};

export function Portal3D({ onEnter }: { onEnter: (target: string | null) => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const entering = useRef(false);
  const enterRef = useRef<(t: string | null) => void>(() => {});
  const enter = (t: string | null) => enterRef.current(t);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = cardRefs.current.filter(Boolean) as HTMLButtonElement[];
    const inners = innerRefs.current.filter(Boolean) as HTMLDivElement[];
    const centerKids = centerRef.current
      ? Array.from(centerRef.current.querySelectorAll<HTMLElement>(".portal-fade"))
      : [];

    const idleTweens: gsap.core.Tween[] = [];
    const ctx = gsap.context(() => {
      // base scatter rotation
      inners.forEach((el, i) => {
        const id = portalCards[i]?.id;
        gsap.set(el, { rotation: id ? layout[id].rot : 0 });
      });

      if (reduce) {
        gsap.set([...cards, ...centerKids], { clearProps: "all" });
        return;
      }

      // intro
      gsap.from(cards, {
        opacity: 0,
        scale: 0.82,
        z: -240,
        y: 50,
        duration: 1.3,
        stagger: 0.12,
        ease: "power3.out",
      });
      gsap.from(centerKids, {
        opacity: 0,
        y: 26,
        duration: 1,
        stagger: 0.09,
        delay: 0.35,
        ease: "power3.out",
      });

      // idle float
      inners.forEach((el, i) => {
        idleTweens.push(
          gsap.to(el, {
            y: 10 + i * 4,
            duration: 3.4 + i * 0.6,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            delay: i * 0.3,
          }),
        );
      });
    }, rootRef);

    // parallax setters
    const setters = cards.map((el) => ({
      x: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3" }),
      y: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3" }),
      ry: gsap.quickTo(el, "rotationY", { duration: 0.9, ease: "power3" }),
      rx: gsap.quickTo(el, "rotationX", { duration: 0.9, ease: "power3" }),
    }));
    const cx = gsap.quickTo(centerRef.current!, "x", { duration: 1, ease: "power3" });
    const cy = gsap.quickTo(centerRef.current!, "y", { duration: 1, ease: "power3" });

    const applyParallax = (nx: number, ny: number) => {
      if (reduce || entering.current) return;
      cards.forEach((_, i) => {
        const id = portalCards[i]?.id;
        const depth = id ? layout[id].depth : 60;
        setters[i].x(-nx * depth);
        setters[i].y(-ny * depth * 0.55);
        setters[i].ry(nx * 9);
        setters[i].rx(-ny * 9);
      });
      cx(-nx * 16);
      cy(-ny * 12);
    };

    const onMouse = (e: MouseEvent) => {
      applyParallax(
        (e.clientX / window.innerWidth - 0.5) * 2,
        (e.clientY / window.innerHeight - 0.5) * 2,
      );
    };
    const onOrient = (e: DeviceOrientationEvent) => {
      const gamma = (e.gamma ?? 0) / 35; // left-right
      const beta = ((e.beta ?? 0) - 45) / 35; // front-back
      applyParallax(
        Math.max(-1, Math.min(1, gamma)),
        Math.max(-1, Math.min(1, beta)),
      );
    };

    window.addEventListener("mousemove", onMouse);
    window.addEventListener("deviceorientation", onOrient);

    // expose enter handler via ref-bound closure
    enterRef.current = (target) => {
      if (entering.current) return;
      entering.current = true;
      idleTweens.forEach((t) => t.kill());

      if (reduce) {
        onEnter(target);
        return;
      }
      const tl = gsap.timeline({ onComplete: () => onEnter(target) });
      tl.to(centerKids, {
        opacity: 0,
        y: -28,
        duration: 0.45,
        stagger: 0.04,
        ease: "power2.in",
      })
        .to(
          cards,
          {
            z: 520,
            scale: 1.5,
            opacity: 0,
            duration: 0.85,
            stagger: 0.06,
            ease: "power2.in",
          },
          0,
        )
        .to(rootRef.current, { opacity: 0, duration: 0.6, ease: "power2.inOut" }, 0.45);
    };

    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("deviceorientation", onOrient);
      ctx.revert();
    };
  }, [onEnter]);

  return (
    <div
      ref={rootRef}
      className="scene-perspective fixed inset-0 z-50 overflow-hidden bg-porcelain"
    >
      {/* ambient light */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 42%, rgba(15,93,73,0.05), transparent 70%)",
        }}
      />

      {/* floating cards */}
      {portalCards.map((card, i) => (
        <button
          key={card.id}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          onClick={() => enter(card.target)}
          aria-label={`Перейти в раздел «${card.label}»`}
          className={`preserve-3d group absolute cursor-pointer ${layout[card.id].pos}`}
        >
          <div
            ref={(el) => {
              innerRefs.current[i] = el;
            }}
            className="preserve-3d"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-[2px] border border-line bg-gradient-to-br from-sage to-cream shadow-[0_30px_60px_-30px_rgba(20,40,32,0.45)] transition-shadow duration-500 group-hover:shadow-[0_40px_80px_-30px_rgba(15,93,73,0.5)]">
              <Image
                src={card.image}
                alt={card.label}
                fill
                sizes="(max-width: 640px) 40vw, 215px"
                className="object-cover transition-transform duration-700 ease-lux group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-emerald-deep/0 transition-colors duration-500 group-hover:bg-emerald-deep/10" />
            </div>
            <div className="mt-3">
              <span className="block font-display text-base leading-tight text-ink sm:text-lg">
                {card.label}
              </span>
              <span className="mt-0.5 block text-[0.58rem] uppercase tracking-label text-muted">
                {card.caption}
              </span>
            </div>
          </div>
        </button>
      ))}

      {/* center */}
      <div
        ref={centerRef}
        className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <Monogram className="portal-fade h-16 w-16 text-emerald sm:h-20 sm:w-20" />
        <h1 className="portal-fade mt-5 font-display text-[clamp(2.4rem,8vw,5.2rem)] leading-[0.95] text-ink">
          Код Молодости
        </h1>
        <p className="portal-fade mt-4 text-xs uppercase tracking-wide2 text-muted sm:text-sm">
          {brand.type} · {brand.city}
        </p>
        <p className="portal-fade mt-6 max-w-md text-base leading-relaxed text-muted/90">
          {brand.principle}
        </p>

        <div className="portal-fade pointer-events-auto mt-9 flex flex-wrap items-center justify-center gap-4">
          <button onClick={() => enter(null)} className="btn-primary">
            Войти на сайт
          </button>
          <button onClick={() => enter("booking")} className="btn-ghost">
            Записаться
          </button>
        </div>

        <p className="portal-fade mt-10 text-[0.65rem] uppercase tracking-label text-muted/60">
          Двигайте курсором · выберите раздел
        </p>
      </div>
    </div>
  );
}
