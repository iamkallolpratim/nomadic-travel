import Link from "next/link";
import { Check, Clock, MapPin } from "lucide-react";
import { Gallery } from "@/components/ui/Gallery";
import { WhatsAppButton } from "@/components/lead/WhatsAppButton";
import { durationLabel, getState, tourUrl } from "@/lib/content";
import type { Tour } from "@/types";

/** Card modelled on the reference: photo slider, title, duration, blurb, facilities chips, "price on request" box, Book Now. */
export function TourCard({ tour, headingLevel: H = "h3" }: { tour: Tour; headingLevel?: "h2" | "h3" }) {
  const states = tour.states.map((s) => getState(s).name).join(" · ");
  const facilities = tour.inclusions.slice(0, 4).map((i) => i.text.replace(/\s*\(.*?\)/g, ""));
  return (
    <article className="panel reveal p-3">
      <Gallery files={tour.images.slice(0, 5)} sizes="(min-width:640px) 480px, 92vw" className="aspect-[16/10]" />
      <div className="px-2 pb-2 pt-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-tea-700">{states}</p>
        <H className="mt-1 font-display text-xl uppercase leading-snug tracking-wide text-forest-950">
          <Link href={tourUrl(tour)} className="hover:text-forest-700">{tour.title.split(":")[0]}</Link>
        </H>
        <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600">
          <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" aria-hidden />{durationLabel(tour)}</span>
          <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" aria-hidden />{tour.startCity} → {tour.endCity}</span>
        </p>
        <p className="mt-3 text-sm leading-6 text-slate-700">{tour.summary}</p>

        <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-700">Facilities included</p>
        <ul className="mt-2 grid grid-cols-2 gap-2">
          {facilities.map((f) => (
            <li key={f} className="flex gap-1.5 rounded-xl bg-slate-50 px-2.5 py-2 text-xs leading-4 text-slate-700">
              <Check className="mt-px h-3.5 w-3.5 flex-none text-tea-600" aria-hidden />{f}
            </li>
          ))}
        </ul>

        <div className="mt-3 rounded-2xl bg-forest-50/70 p-3.5">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-sm font-semibold text-forest-900">{tour.title.split(":")[1]?.trim() || tour.title}</p>
            <p className="whitespace-nowrap text-xs font-semibold text-forest-800">Price on request</p>
          </div>
          <p className="mt-1 text-xs text-slate-600">{tour.highlights.slice(0, 4).join(", ")}</p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link href={tourUrl(tour)} className="btn-outline py-2.5 text-xs">View itinerary</Link>
          <WhatsAppButton tour={`${tour.title} (${durationLabel(tour)})`} state={states} label="Book Now" className="btn-whatsapp py-2.5 text-xs" />
        </div>
      </div>
    </article>
  );
}
