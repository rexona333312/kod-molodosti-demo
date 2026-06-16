import { specialists } from "@/lib/content";
import { Monogram } from "./Logo";

export function Specialists() {
  return (
    <section id="specialists" className="border-t border-line bg-cream py-24 md:py-36">
      <div className="mx-auto max-w-site px-5 md:px-10">
        <div className="reveal max-w-2xl">
          <p className="label-eyebrow">Специалисты</p>
          <h2 className="mt-6 font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.05] text-ink">
            Врачи, которым
            <br />
            доверяют тысячи пациентов
          </h2>
          <p className="mt-7 text-lg leading-relaxed text-muted">
            Команда с высшим медицинским образованием и постоянным обучением.
            Каждый протокол выстраивается индивидуально и безопасно.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-[2px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {specialists.map((s, i) => (
            <article key={i} className="reveal group bg-cream">
              <div className="relative flex aspect-[3/4] items-center justify-center overflow-hidden bg-sage/60">
                <Monogram className="h-20 w-20 text-emerald/30 transition-transform duration-700 ease-lux group-hover:scale-110" />
                <span className="absolute bottom-4 left-4 rounded-full bg-cream/90 px-3 py-1 text-[0.65rem] uppercase tracking-label text-muted">
                  Фото будет добавлено
                </span>
              </div>
              <div className="p-7">
                <h3 className="font-display text-2xl text-ink">{s.name}</h3>
                <p className="mt-2 text-sm text-emerald">{s.role}</p>
                <p className="mt-1 text-sm text-muted">{s.exp}</p>
              </div>
            </article>
          ))}
        </div>

        <p className="reveal mt-8 text-xs text-muted/80">
          * Демонстрационный блок. Имена, фотографии и регалии врачей будут
          добавлены после согласования.
        </p>
      </div>
    </section>
  );
}
