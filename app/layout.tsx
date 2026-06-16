import type { Metadata, Viewport } from "next";
import { Prata, Inter } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import { brand, contacts } from "@/lib/content";
import "./globals.css";

const display = Prata({
  subsets: ["latin", "cyrillic"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
  display: "swap",
});

const description =
  "Премиальная клиника медицинской косметологии «Код Молодости» в Иванове. Инъекционная и аппаратная косметология, контурная пластика, лазерная эпиляция. Запись онлайн.";

const ogImage =
  "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1200&h=630&q=80";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Код Молодости — клиника медицинской косметологии в Иванове",
    template: "%s — Код Молодости",
  },
  description,
  applicationName: brand.name,
  keywords: [
    "косметология Иваново",
    "клиника косметологии Иваново",
    "контурная пластика губ",
    "лазерная эпиляция",
    "биоревитализация",
    "SMAS-лифтинг",
    "Код Молодости",
  ],
  authors: [{ name: brand.name }],
  creator: brand.name,
  publisher: brand.legalName,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_URL,
    siteName: brand.name,
    title: "Код Молодости — клиника медицинской косметологии",
    description: "Премиальная косметология в Иванове. Запись онлайн.",
    images: [{ url: ogImage, width: 1200, height: 630, alt: brand.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Код Молодости — клиника медицинской косметологии",
    description: "Премиальная косметология в Иванове. Запись онлайн.",
    images: [ogImage],
  },
  formatDetection: { telephone: true, address: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F6F4EF",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: brand.name,
  legalName: brand.legalName,
  description,
  url: SITE_URL,
  image: ogImage,
  telephone: contacts.phone,
  email: contacts.email,
  priceRange: "₽₽₽",
  foundingDate: String(brand.since),
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Сакко, 33",
    addressLocality: "Иваново",
    addressCountry: "RU",
  },
  geo: { "@type": "GeoCoordinates", latitude: 56.999, longitude: 40.974 },
  areaServed: "Иваново",
  medicalSpecialty: "DermatologicSurgery",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "21:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "09:00",
      closes: "19:00",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${display.variable} ${body.variable}`}>
      <body className="bg-porcelain font-sans text-ink antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
