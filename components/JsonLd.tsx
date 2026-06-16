// Server component: renders a JSON-LD <script>. Locale-specific schema is
// passed in by each page (RU for /, /v2 — neutral for /v3).
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
