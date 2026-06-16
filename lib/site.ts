// Canonical site origin for the Russian site (/, /v2). Override per
// environment with NEXT_PUBLIC_SITE_URL (e.g. in Vercel project settings).
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://kod-molodosti.vercel.app";

// Neutral origin for the English /v3 experience, so its canonical / OpenGraph /
// JSON-LD URLs never expose the transliterated-Russian "kod-molodosti" slug.
// Set NEXT_PUBLIC_INTL_SITE_URL to the real neutral domain when deploying /v3;
// defaults to a reserved RFC-2606 .example placeholder (never resolves).
export const INTL_SITE_URL =
  process.env.NEXT_PUBLIC_INTL_SITE_URL?.replace(/\/$/, "") ||
  "https://code-of-youth.example";
