import Link from "next/link";
import { brand, contacts } from "@/lib/content";
import { Logo } from "@/components/Logo";

export const metadata = {
  title: "Политика конфиденциальности — Код Молодости",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16 md:px-10 md:py-24">
      <Link href="/" className="inline-block text-ink transition-opacity hover:opacity-70">
        <Logo />
      </Link>

      <h1 className="mt-12 font-display text-[clamp(2rem,5vw,3rem)] leading-tight text-ink">
        Политика конфиденциальности
      </h1>
      <p className="mt-4 text-sm text-muted">
        Обработка персональных данных в соответствии с Федеральным законом
        № 152-ФЗ «О персональных данных».
      </p>

      <div className="mt-10 space-y-8 text-[0.97rem] leading-relaxed text-graphite">
        <section>
          <h2 className="font-display text-xl text-ink">1. Общие положения</h2>
          <p className="mt-3">
            Настоящая Политика определяет порядок обработки и защиты персональных
            данных физических лиц (далее — Пользователи), оставляющих заявку на
            сайте клиники «{brand.name}» ({brand.legalName}).
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">2. Какие данные мы собираем</h2>
          <p className="mt-3">
            Имя, номер телефона и комментарий, добровольно указанные в форме
            записи, а также технические данные (cookie, IP-адрес) для корректной
            работы сайта.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">3. Цели обработки</h2>
          <p className="mt-3">
            Связь с Пользователем для записи на приём, консультирования и
            информирования об услугах клиники. Данные не передаются третьим лицам,
            за исключением случаев, предусмотренных законодательством РФ.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">4. Согласие и отзыв</h2>
          <p className="mt-3">
            Отправляя форму, Пользователь даёт согласие на обработку своих
            персональных данных. Согласие может быть отозвано путём обращения по
            контактным данным, указанным ниже.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">5. Контакты оператора</h2>
          <p className="mt-3">
            {contacts.address}
            <br />
            Телефон: {contacts.phone}
            <br />
            E-mail: {contacts.email}
          </p>
        </section>

        <p className="text-xs text-muted/70">
          Демонстрационный текст. Перед публикацией требуется юридическая проверка
          и согласование с оператором персональных данных.
        </p>
      </div>

      <Link
        href="/"
        className="mt-12 inline-block text-sm uppercase tracking-label text-emerald hover:text-emerald-deep"
      >
        ← Вернуться на сайт
      </Link>
    </main>
  );
}
