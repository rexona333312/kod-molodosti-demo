"use client";

import { Logo } from "./Logo";
import { useDict } from "./LocaleProvider";

export function Footer({ onNavigate }: { onNavigate: (t: string) => void }) {
  const { brand, contacts, nav, ui } = useDict();
  return (
    <footer className="border-t border-line bg-porcelain py-16 md:py-20">
      <div className="mx-auto max-w-site px-5 md:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">
              {ui.footer.tagline}
            </p>
            <p className="mt-4 text-xs leading-relaxed text-muted/70">
              {brand.license}
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-label text-muted">{ui.footer.sections}</p>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.target}>
                  <button
                    onClick={() => onNavigate(item.target)}
                    className="lux-link text-sm cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-5">
            <p className="text-xs uppercase tracking-label text-muted">{ui.footer.contacts}</p>
            <ul className="mt-5 space-y-3 text-sm text-ink">
              <li>{contacts.address}</li>
              <li>
                <a href={contacts.phoneHref} className="hover:text-emerald">
                  {contacts.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contacts.email}`} className="hover:text-emerald">
                  {contacts.email}
                </a>
              </li>
              {contacts.hours.map((h) => (
                <li key={h.days} className="text-muted">
                  {h.days}: {h.time}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-7 text-xs text-muted sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {brand.name}. {ui.footer.rights}
          </p>
          <div className="flex items-center gap-6">
            <a href={ui.privacyHref} className="hover:text-emerald">
              {ui.footer.privacy}
            </a>
            <span className="text-muted/50">{ui.footer.demo}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
