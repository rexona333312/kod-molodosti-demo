// ============================================================================
//  JSON-LD structured data (MedicalClinic)
//  ----------------------------------------------------------------------------
//  Moved out of the global layout so each locale can ship its own schema:
//  the Russian pages (/, /v2) keep the original RU schema unchanged, while the
//  English /v3 ships a fully neutral, Russia-free schema.
// ============================================================================

import { SITE_URL, INTL_SITE_URL } from "./site";
import { brand, contacts } from "./content";

const ogImage =
  "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1200&h=630&q=80";

// Russian schema — identical to what previously lived in app/layout.tsx.
export const ruClinicSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: brand.name,
  legalName: brand.legalName,
  description:
    "Премиальная клиника медицинской косметологии «Код Молодости» в Иванове. Инъекционная и аппаратная косметология, контурная пластика, лазерная эпиляция. Запись онлайн.",
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

// Neutral international schema for /v3 — no country, no geo, no Russia markers.
export const intlClinicSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: "Code of Youth",
  legalName: "Beauty LLC",
  description:
    "Code of Youth — a premium medical cosmetology clinic: injectable and device-based treatments, dermal fillers and laser hair removal. Book online.",
  url: `${INTL_SITE_URL}/v3`,
  image: ogImage,
  telephone: "+1 (555) 014-1414",
  email: "hello@codeofyouth.clinic",
  priceRange: "€€€",
  foundingDate: "2021",
  address: {
    "@type": "PostalAddress",
    streetAddress: "12 Rosewood Avenue",
    addressLocality: "Riverside",
  },
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
