/**
 * Renders a JSON-LD <script> for SEO. Server component — the data is serialized
 * at render time. Keep the object plain (JSON-serializable).
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here; we additionally escape "<" to avoid
      // any chance of breaking out of the script context.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
