// Canonical site origin. Override per environment with NEXT_PUBLIC_SITE_URL
// (e.g. set it in Vercel project settings to the production domain).
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://kod-molodosti.vercel.app";
