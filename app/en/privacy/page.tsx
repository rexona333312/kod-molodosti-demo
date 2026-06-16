import Link from "next/link";
import type { Metadata } from "next";
import { Logo } from "@/components/Logo";
import { LocaleProvider } from "@/components/LocaleProvider";
import { dictionaries } from "@/lib/i18n";
import { intlMetadata } from "@/lib/metadata";

const { brand, contacts } = dictionaries.en;

export const metadata: Metadata = intlMetadata({
  title: "Privacy Policy — Code of Youth",
  description: "How Code of Youth collects, uses and protects personal data.",
  canonical: "/en/privacy",
  index: false,
});

export default function PrivacyPageEn() {
  return (
    <LocaleProvider locale="en">
      <main className="mx-auto max-w-3xl px-5 py-16 md:px-10 md:py-24">
        <Link href="/v3" className="inline-block text-ink transition-opacity hover:opacity-70">
          <Logo />
        </Link>

        <h1 className="mt-12 font-display text-[clamp(2rem,5vw,3rem)] leading-tight text-ink">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-muted">
          How we process and protect your personal data, in line with applicable
          data-protection law.
        </p>

        <div className="mt-10 space-y-8 text-[0.97rem] leading-relaxed text-graphite">
          <section>
            <h2 className="font-display text-xl text-ink">1. Overview</h2>
            <p className="mt-3">
              This policy explains how the {brand.name} clinic ({brand.legalName})
              processes the personal data of visitors who submit a request through
              this website.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">2. Data we collect</h2>
            <p className="mt-3">
              Your name, phone number and any comment you choose to provide in the
              booking form, together with technical data (cookies, IP address)
              needed for the site to work correctly.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">3. Purpose of processing</h2>
            <p className="mt-3">
              To contact you about your appointment, provide consultations and
              inform you about our treatments. We do not share your data with third
              parties except where required by law.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">4. Consent and withdrawal</h2>
            <p className="mt-3">
              By submitting the form you consent to the processing of your personal
              data. You may withdraw your consent at any time by contacting us using
              the details below.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">5. Contact</h2>
            <p className="mt-3">
              {contacts.address}
              <br />
              Phone: {contacts.phone}
              <br />
              Email: {contacts.email}
            </p>
          </section>

          <p className="text-xs text-muted/70">
            Demonstration text. A legal review is required before publication.
          </p>
        </div>

        <Link
          href="/v3"
          className="mt-12 inline-block text-sm uppercase tracking-label text-emerald hover:text-emerald-deep"
        >
          ← Back to the site
        </Link>
      </main>
    </LocaleProvider>
  );
}
