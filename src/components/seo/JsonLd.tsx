type Json = Record<string, unknown> | null | undefined;

/** Renders one or more JSON-LD blocks. `<` is escaped so content can't break out of the script tag. */
export function JsonLd({ data }: { data: Json | Json[] }) {
  const list = (Array.isArray(data) ? data : [data]).filter(Boolean);
  return (
    <>
      {list.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}
