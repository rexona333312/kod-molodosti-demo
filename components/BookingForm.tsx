"use client";

import { useState } from "react";
import { services } from "@/lib/content";
import { ArrowRight, Check } from "./Icons";

type Status = "idle" | "loading" | "success" | "error";

export function BookingForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    if (!data.consent) {
      setError("Необходимо согласие на обработку персональных данных.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError("Не удалось отправить заявку. Позвоните нам по телефону.");
    }
  }

  return (
    <section id="booking" className="border-t border-line bg-emerald-deep py-24 text-cream md:py-36">
      <div className="mx-auto max-w-site px-5 md:px-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="reveal text-[0.72rem] uppercase tracking-label text-cream/70">
              Запись
            </p>
            <h2 className="reveal mt-6 font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.05]">
              Оставьте заявку — мы перезвоним
            </h2>
            <p className="reveal mt-7 max-w-md text-lg leading-relaxed text-cream/75">
              Администратор свяжется с вами, подберёт удобное время и ответит на
              вопросы о процедурах и подготовке.
            </p>
          </div>

          <div className="lg:col-span-7">
            {status === "success" ? (
              <div className="flex h-full flex-col items-start justify-center gap-5 rounded-[2px] border border-cream/20 p-10">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-cream/40">
                  <Check className="h-7 w-7" />
                </span>
                <h3 className="font-display text-3xl">Заявка отправлена</h3>
                <p className="max-w-md text-cream/75">
                  Спасибо! Мы свяжемся с вами в ближайшее время в рабочие часы
                  клиники.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 text-sm uppercase tracking-label text-cream/80 underline-offset-4 hover:underline cursor-pointer"
                >
                  Отправить ещё одну
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="reveal grid gap-7 sm:grid-cols-2" noValidate>
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs uppercase tracking-label text-cream/60">
                    Имя
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Как к вам обращаться"
                    className="field-input border-cream/25 text-cream placeholder:text-cream/40 focus:border-cream"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-xs uppercase tracking-label text-cream/60">
                    Телефон
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="+7 (___) ___-__-__"
                    className="field-input border-cream/25 text-cream placeholder:text-cream/40 focus:border-cream"
                  />
                </div>

                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label htmlFor="service" className="text-xs uppercase tracking-label text-cream/60">
                    Направление
                  </label>
                  <select
                    id="service"
                    name="service"
                    defaultValue=""
                    className="field-input border-cream/25 bg-emerald-deep text-cream focus:border-cream"
                  >
                    <option value="" className="text-ink">
                      Выберите направление (необязательно)
                    </option>
                    {services.map((s) => (
                      <option key={s.id} value={s.title} className="text-ink">
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label htmlFor="message" className="text-xs uppercase tracking-label text-cream/60">
                    Комментарий
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    placeholder="Удобное время, вопросы, пожелания"
                    className="field-input resize-none border-cream/25 text-cream placeholder:text-cream/40 focus:border-cream"
                  />
                </div>

                <label className="flex cursor-pointer items-start gap-3 text-sm text-cream/70 sm:col-span-2">
                  <input
                    type="checkbox"
                    name="consent"
                    className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-cream"
                  />
                  <span>
                    Я согласен(а) на обработку персональных данных в соответствии с{" "}
                    <a href="/privacy" className="underline underline-offset-2 hover:text-cream">
                      политикой конфиденциальности
                    </a>
                    .
                  </span>
                </label>

                {error && (
                  <p role="alert" className="text-sm text-rose-200 sm:col-span-2">
                    {error}
                  </p>
                )}

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-cream px-8 py-4 text-sm uppercase tracking-label text-emerald-deep transition-all duration-300 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                  >
                    {status === "loading" ? "Отправляем…" : "Отправить заявку"}
                    {status !== "loading" && <ArrowRight className="h-4 w-4" />}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
