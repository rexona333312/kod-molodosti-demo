# Код Молодости — клиника медицинской косметологии

Премиальный сайт клиники медицинской косметологии в Иванове.
Next.js 15 (App Router) · TypeScript · Tailwind CSS · GSAP.

Две версии входа:

- **`/`** — 3D-портал с параллаксом плавающих карточек.
- **`/v2`** — интро «написание кода» → 3D-пространство с вращением камеры по
  скроллу/свайпу, навигация снизу.

## Локальная разработка

```bash
npm install
npm run dev        # http://localhost:3000  (или --port 3200)
```

## Продакшен-сборка

```bash
npm run build
npm run start
```

## Деплой на Vercel

1. Запушить репозиторий в GitHub/GitLab и импортировать в Vercel.
   Фреймворк определится автоматически (Build: `next build`, Output: `.next`).
2. Задать переменную окружения:
   - `NEXT_PUBLIC_SITE_URL` = боевой домен (например `https://cod-molodosti.ru`).
     Используется для canonical, Open Graph, `sitemap.xml`, `robots.txt`.
3. Deploy. Оптимизация изображений (AVIF/WebP), кэширование и SSR работают
   на Vercel из коробки.

## Контент

- Тексты, услуги, цены и контакты: [`lib/content.ts`](lib/content.ts).
- Изображения: [`public/images/`](public/images) — **плейсхолдеры**, заменить на
  реальные фото клиники (имена файлов сохранить — менять код не нужно):
  `services.jpg`, `specialists.jpg`, `about.jpg`, `contacts.jpg`,
  `deco-1..3.jpg`, `hero.jpg`.
- Заявки формы записи приходят в [`app/api/booking/route.ts`](app/api/booking/route.ts)
  (сейчас логируются; подключить SMTP Яндекса или Telegram-бота перед запуском).

## Производительность

- Изображения через `next/image` (AVIF/WebP, lazy, без CLS).
- GSAP-порталы — `next/dynamic` (code-splitting, вне стартового бандла).
- Карта Яндекса — click-to-load (без стороннего JS до клика).
- Анимации уважают `prefers-reduced-motion`.
- SEO: JSON-LD (`MedicalClinic`), `sitemap.xml`, `robots.txt`, manifest, favicon.
