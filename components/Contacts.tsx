import { contacts } from "@/lib/content";
import { MapPin, Phone, Mail, Clock } from "./Icons";
import { MapEmbed } from "./MapEmbed";

export function Contacts() {
  return (
    <section id="contacts" className="border-t border-line py-24 md:py-36">
      <div className="mx-auto max-w-site px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="reveal label-eyebrow">Контакты</p>
            <h2 className="reveal mt-6 font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.05] text-ink">
              Ждём вас
              <br />в&nbsp;Иванове
            </h2>

            <ul className="reveal mt-10 space-y-7">
              <li className="flex gap-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-emerald" />
                <div>
                  <p className="text-xs uppercase tracking-label text-muted">Адрес</p>
                  <p className="mt-1 text-lg text-ink">{contacts.address}</p>
                </div>
              </li>
              <li className="flex gap-4">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-emerald" />
                <div>
                  <p className="text-xs uppercase tracking-label text-muted">Телефон</p>
                  <a
                    href={contacts.phoneHref}
                    className="mt-1 block text-lg text-ink transition-colors hover:text-emerald"
                  >
                    {contacts.phone}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-emerald" />
                <div>
                  <p className="text-xs uppercase tracking-label text-muted">Почта</p>
                  <a
                    href={`mailto:${contacts.email}`}
                    className="mt-1 block break-all text-lg text-ink transition-colors hover:text-emerald"
                  >
                    {contacts.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <Clock className="mt-1 h-5 w-5 shrink-0 text-emerald" />
                <div>
                  <p className="text-xs uppercase tracking-label text-muted">Часы работы</p>
                  {contacts.hours.map((h) => (
                    <p key={h.days} className="mt-1 text-lg text-ink">
                      <span className="text-muted">{h.days}</span> &nbsp;{h.time}
                    </p>
                  ))}
                </div>
              </li>
            </ul>

            <div className="reveal mt-9 flex gap-3">
              {contacts.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="rounded-full border border-ink/15 px-5 py-2.5 text-xs uppercase tracking-label text-ink transition-colors duration-300 hover:border-emerald hover:text-emerald"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className="reveal lg:col-span-7">
            <MapEmbed />
          </div>
        </div>
      </div>
    </section>
  );
}
