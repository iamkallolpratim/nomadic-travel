import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BedDouble, CalendarDays, Car, Clock, MapPin, Utensils, X } from "lucide-react";
import { Gallery } from "@/components/ui/Gallery";
import { Icon } from "@/components/ui/Icon";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Faqs } from "@/components/ui/Faqs";
import { LinkList, LinkRow, Page, Panel, TopBar } from "@/components/ui/Minimal";
import { BookingForm } from "@/components/lead/BookingForm";
import { WhatsAppButton } from "@/components/lead/WhatsAppButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { CarsPanel } from "@/components/cards/CarsPanel";
import { activityUrl, durationLabel, getActivity, getPlace, getState, placeUrl, resolve, tours, tourUrl } from "@/lib/content";
import { buildMetadata, shortName } from "@/lib/seo";
import { tourSchema } from "@/lib/schema";

export const dynamicParams = false;
export const generateStaticParams = () => tours.map((t) => ({ slug: t.slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const t = tours.find((x) => x.slug === slug);
  if (!t) return {};
  return buildMetadata({ title: t.metaTitle, description: t.metaDescription, path: tourUrl(t), defaultImage: false });
}

export default async function TourPage({ params }: Props) {
  const { slug } = await params;
  const tour = tours.find((x) => x.slug === slug);
  if (!tour) notFound();
  const stateNames = tour.states.map((s) => getState(s).name);
  const primary = getState(tour.states[0]);
  const places = resolve(tour.places, getPlace);
  const acts = resolve(tour.activities, getActivity);
  const waTour = `${tour.title} (${durationLabel(tour)})`;
  const related = tours
    .filter((t) => t.slug !== tour.slug)
    .map((t) => ({ t, score: t.states.filter((s) => tour.states.includes(s)).length * 2 + t.activities.filter((a) => tour.activities.includes(a)).length }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((x) => x.t);

  return (
    <>
      <JsonLd data={tourSchema(tour, tourUrl(tour), places)} />
      <TopBar title={tour.title.split(":")[0]} back={`/${primary.pageSlug}`} />
      <Page>
        <Breadcrumbs items={[{ name: `${primary.name} Tour Packages`, href: `/${primary.pageSlug}` }, { name: tour.title.split(":")[0], href: tourUrl(tour) }]} />

        <section className="panel p-3">
          <Gallery files={tour.images} sizes="(min-width:640px) 480px, 92vw" preloadFirst className="aspect-[16/10]" />
          <div className="px-2 pb-2 pt-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-tea-700">{stateNames.join(" · ")}</p>
            <h1 className="mt-1 text-2xl uppercase leading-snug tracking-wide text-forest-950">{tour.title}</h1>
            <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-600">
              <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" aria-hidden />{durationLabel(tour)}</span>
              <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" aria-hidden />{tour.startCity} → {tour.endCity}</span>
              <span className="inline-flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" aria-hidden />{tour.bestSeason}</span>
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-700">{tour.summary}</p>

            <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-700">Facilities included</p>
            <ul className="mt-2 grid grid-cols-2 gap-2">
              {tour.inclusions.map((i) => (
                <li key={i.text} className="flex gap-1.5 rounded-xl bg-slate-50 px-2.5 py-2 text-xs leading-4 text-slate-700">
                  <Icon name={i.icon} className="mt-px h-3.5 w-3.5 flex-none text-tea-600" />{i.text}
                </li>
              ))}
            </ul>

            <div className="mt-3 rounded-2xl bg-forest-50/70 p-3.5">
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-sm font-semibold text-forest-900">{durationLabel(tour)} · private tour</p>
                <p className="whitespace-nowrap text-sm font-semibold text-forest-800">Price on request</p>
              </div>
              <p className="mt-1 text-xs text-slate-600">{tour.highlights.join(", ")}</p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <a href="#book" className="btn-outline py-2.5 text-xs">Request quote</a>
              <WhatsAppButton tour={waTour} state={stateNames.join(", ")} label="Book Now" className="btn-whatsapp py-2.5 text-xs" />
            </div>
          </div>
        </section>

        <Panel title="Overview">
          <div className="prose-nt text-sm">{tour.overview.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}</div>
          <ul className="flex flex-wrap gap-1.5" aria-label="Activities on this tour">
            {acts.map((a) => <li key={a.slug}><Link href={activityUrl(a)} className="chip hover:bg-tea-100"><Icon name={a.icon} className="h-3.5 w-3.5" />{a.name}</Link></li>)}
          </ul>
        </Panel>

        <Panel title="Day-wise itinerary">
          <ol className="relative space-y-5 border-l border-tea-200 pl-6">
            {tour.itinerary.map((d) => (
              <li key={d.day} className="relative">
                <span className="absolute -left-[37px] flex h-7 w-7 items-center justify-center rounded-full bg-forest-700 text-white ring-4 ring-white">
                  <Icon name={d.icon} className="h-3.5 w-3.5" />
                </span>
                <p className="text-[11px] font-bold uppercase tracking-wider text-tea-700">Day {d.day}</p>
                <h3 className="font-sans text-sm font-semibold text-forest-900">{d.title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-700">{d.description}</p>
                <p className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-600">
                  {d.drive && <span className="inline-flex items-center gap-1"><Car className="h-3 w-3" aria-hidden />{d.drive}</span>}
                  {d.overnight && <span className="inline-flex items-center gap-1"><BedDouble className="h-3 w-3" aria-hidden />{d.overnight}</span>}
                  {d.meals && <span className="inline-flex items-center gap-1"><Utensils className="h-3 w-3" aria-hidden />{d.meals}</span>}
                </p>
                {d.places && d.places.length > 0 && (
                  <p className="mt-1 text-[11px] text-slate-600">
                    {resolve(d.places, getPlace).map((p, i) => <span key={p.slug}>{i > 0 && " · "}<Link href={placeUrl(p)} className="link">{shortName(p.name)}</Link></span>)}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </Panel>

        <Panel title="Not included">
          <ul className="space-y-1.5">
            {tour.exclusions.map((x) => <li key={x} className="flex gap-2 text-sm text-slate-700"><X className="mt-1 h-3.5 w-3.5 flex-none text-red-500" aria-hidden />{x}</li>)}
          </ul>
        </Panel>

        <Panel title="Places on this tour">
          <LinkList>{places.map((p) => <LinkRow key={p.slug} href={placeUrl(p)} title={shortName(p.name)} meta={p.summary} image={p.images[0]} badge={getState(p.state).name} />)}</LinkList>
        </Panel>

        <Faqs faqs={tour.faqs} title="Tour FAQs" />

        <CarsPanel title="Choose your car" context={waTour} />

        <div id="book" className="scroll-mt-20"><BookingForm tour={waTour} state={tour.states.length > 1 ? "Multiple states" : stateNames[0]} title="Book this tour" /></div>

        <Panel title="You may also like">
          <LinkList>{related.map((t) => <LinkRow key={t.slug} href={tourUrl(t)} title={t.title.split(":")[0]} meta={`${durationLabel(t)} · ${t.startCity} → ${t.endCity}`} image={t.images[0]} />)}</LinkList>
        </Panel>
      </Page>
    </>
  );
}
