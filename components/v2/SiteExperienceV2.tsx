"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { IntroLoader } from "./IntroLoader";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Specialists } from "@/components/Specialists";
import { Contacts } from "@/components/Contacts";
import { BookingForm } from "@/components/BookingForm";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";

// GSAP-heavy portal is split into its own chunk (kept out of the initial JS)
// and prefetched while the intro plays, so it's ready by the time it mounts.
const SpacePortal = dynamic(
  () => import("./SpacePortal").then((m) => m.SpacePortal),
  { ssr: false, loading: () => <div className="fixed inset-0 z-50 bg-porcelain" aria-hidden /> },
);

const HEADER_OFFSET = 88;
type Phase = "intro" | "portal" | "site";

export function SiteExperienceV2() {
  const [phase, setPhase] = useState<Phase>("intro");

  useEffect(() => {
    document.body.classList.add("portal-locked");
    void import("./SpacePortal"); // warm the portal chunk during the intro
    return () => document.body.classList.remove("portal-locked");
  }, []);

  const scrollToId = useCallback((id: string) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, []);

  const handleEnter = useCallback(
    (target: string | null) => {
      document.body.classList.remove("portal-locked");
      setPhase("site");
      requestAnimationFrame(() => {
        if (target && target !== "top") {
          setTimeout(() => scrollToId(target), 120);
        } else {
          window.scrollTo({ top: 0, behavior: "auto" });
        }
      });
    },
    [scrollToId],
  );

  const onBook = useCallback(() => scrollToId("booking"), [scrollToId]);

  useEffect(() => {
    if (phase !== "site") return;
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [phase]);

  return (
    <>
      {phase === "intro" && <IntroLoader onDone={() => setPhase("portal")} />}
      {phase === "portal" && <SpacePortal onEnter={handleEnter} />}

      <Header onNavigate={scrollToId} onBook={onBook} />
      <main>
        <Hero onBook={onBook} onNavigate={scrollToId} />
        <About />
        <Services onBook={onBook} />
        <Specialists />
        <Contacts />
        <BookingForm />
      </main>
      <Footer onNavigate={scrollToId} />
      {phase === "site" && <CookieConsent />}
    </>
  );
}
