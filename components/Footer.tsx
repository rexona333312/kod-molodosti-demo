import { brand, contacts, nav } from "@/lib/content";
import { Logo } from "./Logo";

export function Footer({ onNavigate }: { onNavigate: (t: string) => void }) {
  return (
    <footer className="border-t border-line bg-porcelain py-16 md:py-20">
      <div className="mx-auto max-w-site px-5 md:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">
              {brand.type} в Иванове. {brand.legalName}.
            </p>
            <p className="mt-4 text-xs leading-relaxed text-muted/70">
              {brand.license}
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-label text-muted">Разделы</p>
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
            <p className="text-xs uppercase tracking-label text-muted">Контакты</p>
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
            © {new Date().getFullYear()} {brand.name}. Все права защищены.
          </p>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="hover:text-emerald">
              Политика конфиденциальности
            </a>
            <span className="text-muted/50">Демо-концепт</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
