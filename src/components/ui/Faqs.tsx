import { Plus } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/schema";
import type { Faq } from "@/types";

export function Faqs({ faqs, title = "Frequently asked questions", schema = true, id = "faqs" }: { faqs: Faq[]; title?: string; schema?: boolean; id?: string; compact?: boolean }) {
  if (!faqs.length) return null;
  return (
    <section aria-labelledby={`${id}-h`} id={id} className="panel reveal scroll-mt-20">
      <h2 id={`${id}-h`} className="panel-title">{title}</h2>
      <div className="divide-y divide-slate-100">
        {faqs.map((f) => (
          <details key={f.q} className="group py-3 first:pt-0 last:pb-0">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-3 text-sm font-semibold text-forest-900 [&::-webkit-details-marker]:hidden">
              {f.q}
              <Plus className="mt-0.5 h-4 w-4 flex-none text-slate-400 transition group-open:rotate-45" aria-hidden />
            </summary>
            <p className="mt-2 text-sm leading-6 text-slate-700">{f.a}</p>
          </details>
        ))}
      </div>
      {schema && <JsonLd data={faqSchema(faqs)} />}
    </section>
  );
}
