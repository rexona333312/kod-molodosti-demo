import type { Metadata } from "next";
import { SiteExperienceV2 } from "@/components/v2/SiteExperienceV2";
import { JsonLd } from "@/components/JsonLd";
import { intlClinicSchema } from "@/lib/schema";
import { intlMetadata } from "@/lib/metadata";

// Standalone English demo. Every Russian default coming from the root layout
// (title template, applicationName, keywords, authors, publisher, OpenGraph
// locale/siteName, manifest, JSON-LD) is overridden here so /v3 reveals no
// connection to Russia. The Russian /v2 is left untouched.
export const metadata: Metadata = {
  ...intlMetadata({
    title: "Code of Youth — Medical Cosmetology Clinic",
    description:
      "Code of Youth — a premium medical cosmetology clinic: injectable and device-based treatments, dermal fillers and laser hair removal. Book your consultation online.",
    canonical: "/v3",
  }),
  manifest: "/v3.webmanifest",
};

export default function V3() {
  return (
    <>
      <JsonLd data={intlClinicSchema} />
      <SiteExperienceV2 locale="en" />
    </>
  );
}
