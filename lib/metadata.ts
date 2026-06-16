import type { Metadata } from "next";
import { INTL_SITE_URL } from "./site";

// Neutral English metadata for the /v3 experience. Every Russian default that
// the root layout sets (title template, applicationName, keywords, authors,
// publisher, OpenGraph locale/siteName, Twitter) must be overridden on each
// English page, or it leaks into that page's <head>. This helper centralises
// those overrides so no English page can accidentally inherit Russian metadata.

const ogImage =
  "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1200&h=630&q=80";

export function intlMetadata(opts: {
  title: string;
  description: string;
  /** path-only, e.g. "/v3" — resolved against the neutral INTL_SITE_URL */
  canonical: string;
  index?: boolean;
}): Metadata {
  const { title, description, canonical, index = true } = opts;
  // Absolute URL on the neutral origin so metadataBase (the RU SITE_URL) is
  // never used to resolve these — no "kod-molodosti" slug leaks into /v3.
  const url = `${INTL_SITE_URL}${canonical}`;
  return {
    // absolute → bypasses the layout's "%s — Код Молодости" title template
    title: { absolute: title },
    description,
    applicationName: "Code of Youth",
    keywords: [
      "medical cosmetology clinic",
      "aesthetic medicine",
      "dermal fillers",
      "laser hair removal",
      "biorevitalisation",
      "SMAS lifting",
      "Morpheus8",
      "Code of Youth",
    ],
    authors: [{ name: "Code of Youth" }],
    creator: "Code of Youth",
    publisher: "Beauty LLC",
    metadataBase: new URL(INTL_SITE_URL),
    alternates: { canonical: url },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: "Code of Youth",
      url,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: "Code of Youth" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
