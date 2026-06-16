"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { About } from "./About";
import { Services } from "./Services";
import { Specialists } from "./Specialists";
import { Contacts } from "./Contacts";
import { BookingForm } from "./BookingForm";
import { Footer } from "./Footer";
import { CookieConsent } from "./CookieConsent";

const Portal3D = dynamic(
  () => import("./Portal3D").then((m) => m.Portal3D),
  { ssr: false, loading: () => <div className="fixed inset-0 z-50 bg-porcelain" aria-hidden /> },
);

const HEADER_OFFSET = 88;

export function SiteExperience() {
  const [entered, setEntered] = useState(false);

  // lock scroll while the portal overlay is up
  useEffect(() => {
    document.body.classList.add("portal-locked");
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
      setEntered(true);
      // wait for layout to settle, then move to the requested section
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

  // scroll-reveal once the site is visible
  useEffect(() => {
    if (!entered) return;
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
  }, [entered]);

  return (
    <>
      {!entered && <Portal3D onEnter={handleEnter} />}

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
      <CookieConsent />
    </>
  );
}
