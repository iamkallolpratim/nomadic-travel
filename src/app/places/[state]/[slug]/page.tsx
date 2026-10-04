import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navigation } from "lucide-react";
import { Gallery } from "@/components/ui/Gallery";
import { Icon } from "@/components/ui/Icon";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Faqs } from "@/components/ui/Faqs";
import { FactGrid, LinkList, LinkRow, Page, Panel, TopBar } from "@/components/ui/Minimal";
import { WhatsAppButton } from "@/components/lead/WhatsAppButton";
import { BookingForm } from "@/components/lead/BookingForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { activitiesAt, activityUrl, durationLabel, getActivity, getPlace, getState, places, placeUrl, resolve, toursWithPlace, tourUrl } from "@/lib/content";
import { buildMetadata, fit, shortName } from "@/lib/seo";
import { placeSchema } from "@/lib/schema";

export const dynamicParams = false;
export const generateStaticParams = () => places.map((p) => ({ state: p.state, slug: p.slug }));

type Props = { params: Promise<{ state: string; slug: string }> };

async function load(params: Props["params"]) {
  const { state, slug } = await params;
  const p = getPlace(slug);
  return p && p.state === state ? p : undefined;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await load(params);
  if (!p) return {};
  const s = getState(p.state).name;
  const n = shortName(p.name);
  return buildMetadata({
    title: fit([`${n}: Best Time, How to Reach & Tours`, `${n}, ${s}: Travel Guide & Tours`, `${n} Travel Guide | ${s}`, `${n} | ${s}`], 60),
    description: fit([`${p.summary} Best time: ${p.bestSeason.split(";")[0]}. How to reach, permits, things to do and tours.`, `${p.summary} How to reach, best time and tours.`, p.summary], 155),
    path: placeUrl(p),
    defaultImage: false,
  });
}

export default async function PlacePage({ params }: Props) {
  const place = await load(params);
  if (!place) notFound();
  const state = getState(place.state);
  const n = shortName(place.name);
  const tours = toursWithPlace(place.slug);
  const acts = [...new Map([...resolve(place.activities, getActivity), ...activitiesAt(place.slug)].map((a) => [a.slug, a])).values()].slice(0, 5);
  const nearby = resolve(place.nearby, getPlace);
  const maps = `https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`;

  return (
    <>
      <JsonLd data={placeSchema(place, placeUrl(place))} />
      <TopBar title={n} back={`/${state.pageSlug}#places`} />
      <Page>
        <Breadcrumbs items={[{ name: `${state.name} Tour Packages`, href: `/${state.pageSlug}` }, { name: n, href: placeUrl(place) }]} />
        <section className="panel p-3">
          <Gallery files={place.images} sizes="(min-width:640px) 480px, 92vw" preloadFirst />
          <div className="px-2 pb-2 pt-4">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-tea-700"><Icon name={place.icon} className="h-3.5 w-3.5" />{place.category} · {state.name}</p>
            <h1 className="mt-1 text-3xl text-forest-950">{place.name}</h1>
            <p className="mt-2 text-sm leading-6 text-slate-700">{place.summary}</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <a href={maps} target="_blank" rel="noopener noreferrer" className="btn-outline py-2.5 text-xs"><Navigation className="h-3.5 w-3.5" aria-hidden />Map</a>
              <WhatsAppButton tour={`Trip including ${n}`} state={state.name} label="Ask on WhatsApp" className="btn-whatsapp py-2.5 text-xs" />
            </div>
          </div>
        </section>

        <Panel title="Quick facts">
          <FactGrid
            items={[
              { icon: "season", label: "Best season", value: place.bestSeason },
              { icon: "duration", label: "Duration", value: place.idealDuration },
              { icon: "altitude", label: "Altitude", value: place.altitude },
              { icon: "location", label: "Nearest town", value: `${place.nearestTown} (${place.district})` },
              { icon: "permit", label: "Permit", value: place.permit },
              { icon: "ticket", label: "Timings & fees", value: place.entry },
            ]}
          />
        </Panel>

        <Panel title={`About ${n}`}>
          <div className="prose-nt text-sm">{place.description.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}</div>
        </Panel>

        <Panel title={`How to reach ${n}`}>
          <p className="text-sm leading-6 text-slate-700">{place.howToReach}</p>
        </Panel>

        {tours.length > 0 && (
          <Panel title={`Tours that include ${n}`}>
            <LinkList>{tours.map((t) => <LinkRow key={t.slug} href={tourUrl(t)} title={t.title.split(":")[0]} meta={`${durationLabel(t)} · ${t.startCity} → ${t.endCity}`} image={t.images[0]} />)}</LinkList>
          </Panel>
        )}

        {acts.length > 0 && (
          <Panel title="Things to do">
            <LinkList>{acts.map((a) => <LinkRow key={a.slug} href={activityUrl(a)} title={a.name} meta={a.summary} image={a.images[0]} badge={a.difficulty} />)}</LinkList>
          </Panel>
        )}

        {nearby.length > 0 && (
          <Panel title={`Places near ${n}`}>
            <LinkList>{nearby.map((p) => <LinkRow key={p.slug} href={placeUrl(p)} title={shortName(p.name)} meta={p.summary} image={p.images[0]} badge={p.category} />)}</LinkList>
          </Panel>
        )}

        <Faqs faqs={place.faqs} title={`${n} FAQs`} />
        <BookingForm tour={`Trip including ${n}`} state={state.name} title={`Plan a trip to ${n}`} />

        <p className="px-1 text-[11px] leading-5 text-slate-600">
          Facts checked against:{" "}
          {place.sources.map((s, i) => <span key={s}>{i > 0 && " · "}<a href={s} target="_blank" rel="noopener noreferrer nofollow" className="underline">{new URL(s).hostname.replace("www.", "")}</a></span>)}
          . Conditions change — verify timings and permits before travel.
        </p>
      </Page>
    </>
  );
}
