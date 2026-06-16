"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Menu, Close, MapPin } from "./Icons";
import { nav, contacts } from "@/lib/content";

export function Header({
  onNavigate,
  onBook,
}: {
  onNavigate: (target: string) => void;
  onBook: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (target: string) => {
    setOpen(false);
    onNavigate(target);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ease-lux ${
          scrolled
            ? "bg-porcelain/85 backdrop-blur-md border-b border-line/70"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-site items-center justify-between px-5 py-4 md:px-10 md:py-5">
          <button
            onClick={() => go("top")}
            className="cursor-pointer text-ink transition-opacity hover:opacity-70"
            aria-label="Код Молодости — на главную"
          >
            <Logo />
          </button>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Основная навигация">
            {nav.map((item) => (
              <button
                key={item.target}
                onClick={() => go(item.target)}
                className="lux-link text-[0.82rem] uppercase tracking-label cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`https://yandex.ru/maps/?text=${encodeURIComponent(contacts.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors duration-300 hover:border-emerald hover:text-emerald md:flex"
              aria-label="Адрес на карте"
            >
              <MapPin />
            </a>
            <button onClick={onBook} className="btn-primary hidden sm:inline-flex">
              Записаться
            </button>
            <button
              onClick={() => setOpen(true)}
              className="flex h-11 w-11 items-center justify-center text-ink lg:hidden cursor-pointer"
              aria-label="Открыть меню"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-50 bg-porcelain transition-all duration-500 ease-lux lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="flex h-full flex-col px-6 py-5">
          <div className="flex items-center justify-between">
            <Logo />
            <button
              onClick={() => setOpen(false)}
              className="flex h-11 w-11 items-center justify-center text-ink cursor-pointer"
              aria-label="Закрыть меню"
            >
              <Close className="h-6 w-6" />
            </button>
          </div>

          <nav className="mt-16 flex flex-col gap-7" aria-label="Мобильная навигация">
            {nav.map((item, i) => (
              <button
                key={item.target}
                onClick={() => go(item.target)}
                className="text-left font-display text-4xl text-ink cursor-pointer"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto space-y-5">
            <button
              onClick={() => {
                setOpen(false);
                onBook();
              }}
              className="btn-primary w-full"
            >
              Записаться на приём
            </button>
            <a href={contacts.phoneHref} className="block text-center text-lg text-ink">
              {contacts.phone}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
