import { BusFront, Luggage, Snowflake, Users } from "lucide-react";
import { Img } from "@/components/ui/Img";
import { WhatsAppButton } from "@/components/lead/WhatsAppButton";
import { cars } from "@/data/cars";
import { heroFor } from "@/lib/content";

/** "Available cars" section: one card per vehicle with seats, luggage and a WhatsApp booking button. */
export function CarsPanel({ title = "Available cars", context }: { title?: string; context?: string }) {
  return (
    <section id="cars" aria-labelledby="cars-h" className="panel reveal scroll-mt-20">
      <h2 id="cars-h" className="panel-title">{title}</h2>
      <p className="-mt-1 mb-4 text-sm text-slate-600">Every tour includes a private, air-conditioned vehicle with an experienced local driver. Choose the size that fits your group.</p>
      <ul className="grid grid-cols-2 gap-3">
        {cars.map((c) => {
          const photo = heroFor(`car:${c.slug}`);
          return (
            <li key={c.slug} className="flex flex-col overflow-hidden rounded-2xl bg-slate-50 ring-1 ring-black/5">
              <div className="relative aspect-[4/3] bg-gradient-to-br from-forest-50 to-mist-100">
                {photo ? (
                  <Img file={photo} sizes="(min-width:640px) 230px, 45vw" className="object-cover" />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-1 text-forest-700" role="img" aria-label={`${c.name} (photo coming soon)`}>
                    <BusFront className="h-10 w-10" aria-hidden />
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">Photo coming soon</span>
                  </div>
                )}
                <span className="absolute left-2 top-2 rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-forest-800 shadow-sm">{c.type}</span>
              </div>
              <div className="flex flex-1 flex-col p-3">
                <h3 className="font-sans text-sm font-semibold leading-snug text-forest-900">{c.name}</h3>
                <p className="mt-1.5 flex flex-wrap gap-x-2.5 gap-y-1 text-[11px] text-slate-700">
                  <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" aria-hidden />{c.seats} seats</span>
                  <span className="inline-flex items-center gap-1"><Luggage className="h-3 w-3" aria-hidden />{c.bags}</span>
                  <span className="inline-flex items-center gap-1"><Snowflake className="h-3 w-3" aria-hidden />AC</span>
                </p>
                <p className="mt-1.5 flex-1 text-[11px] leading-4 text-slate-600">{c.idealFor}</p>
                <WhatsAppButton
                  tour={context ? `${context} — car: ${c.name}` : `Car booking: ${c.name}`}
                  label="Book"
                  ariaLabel={`Book ${c.name} on WhatsApp`}
                  className="btn-whatsapp mt-2.5 w-full py-2 text-[11px]"
                />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
