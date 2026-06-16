"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "km-cookie-consent";

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        const t = setTimeout(() => setShow(true), 1400);
        return () => clearTimeout(t);
      }
    } catch {
      /* storage unavailable — skip */
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      /* ignore */
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-x-3 bottom-3 z-[60] md:inset-x-auto md:right-6 md:bottom-6 md:max-w-md">
      <div className="rounded-[3px] border border-line bg-cream/95 p-5 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.3)] backdrop-blur-md">
        <p className="text-sm leading-relaxed text-graphite">
          Мы используем cookie, чтобы сайт работал корректно. Продолжая
          пользоваться сайтом, вы соглашаетесь с{" "}
          <a href="/privacy" className="text-emerald underline underline-offset-2">
            политикой конфиденциальности
          </a>
          .
        </p>
        <div className="mt-4 flex items-center gap-4">
          <button onClick={accept} className="btn-primary px-6 py-2.5 text-xs">
            Принять
          </button>
          <button
            onClick={() => setShow(false)}
            className="text-xs uppercase tracking-label text-muted hover:text-ink cursor-pointer"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}
