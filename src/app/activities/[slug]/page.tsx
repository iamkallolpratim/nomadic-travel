import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/ui/Gallery";
import { Icon } from "@/components/ui/Icon";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Faqs } from "@/components/ui/Faqs";
import { FactGrid, LinkList, LinkRow, Page, Panel, TopBar } from "@/components/ui/Minimal";
import { WhatsAppButton } from "@/components/lead/WhatsAppButton";
import { BookingForm } from "@/components/lead/BookingForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { activities, activitiesIn, activityUrl, durationLabel, getPlace, getState, placeUrl, resolve, toursWithActivity, tourUrl } from "@/lib/content";
import { buildMetadata, fit, shortName } from "@/lib/seo";
import { activitySchema } from "@/lib/schema";

export const dynamicParams = false;
export const generateStaticParams = () => activities.map((a) => ({ slug: a.slug }));

type Props = { params: Promise<{ slug: string }> };
const find = async (params: Props["params"]) => {
  const { slug } = await params;
  return activities.find((a) => a.slug === slug);
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = await find(params);
  if (!a) return {};
  const s = getState(a.state).name;
  return buildMetadata({
    title: fit([`${a.name} | ${s} Guide & Tours`, `${a.name}, ${s}`, a.name], 60),
    description: fit([`${a.summary} Difficulty: ${a.difficulty}. Best season: ${a.bestSeason}.`, a.summary], 155),
    path: activityUrl(a),
    defaultImage: false,
  });
}

export default async function ActivityPage({ params }: Props) {
  const a = await find(params);
  if (!a) notFound();
  const state = getState(a.state);
  const places = resolve(a.places, getPlace);
  const tours = toursWithActivity(a.slug);
  const more = activitiesIn(a.state).filter((x) => x.slug !== a.slug).slice(0, 4);

  return (
    <>
      <JsonLd data={activitySchema(a, activityUrl(a))} />
      <TopBar title={a.name} back="/activities" />
      <Page>
        <Breadcrumbs items={[{ name: "Activities", href: "/activities" }, { name: a.name, href: activityUrl(a) }]} />
        <section className="panel p-3">
          <Gallery files={a.images} sizes="(min-width:640px) 480px, 92vw" preloadFirst />
          <div className="px-2 pb-2 pt-4">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-tea-700"><Icon name={a.icon} className="h-3.5 w-3.5" />{a.category} · {state.name}</p>
            <h1 className="mt-1 text-3xl text-forest-950">{a.name}</h1>
            <p className="mt-2 text-sm leading-6 text-slate-700">{a.summary}</p>
            <WhatsAppButton tour={a.name} state={state.name} label="Book on WhatsApp" className="btn-whatsapp mt-4 w-full py-2.5 text-xs" />
          </div>
        </section>
        <Panel title="At a glance">
          <FactGrid
            items={[
              { icon: "difficulty", label: "Difficulty", value: a.difficulty },
              { icon: "duration", label: "Duration", value: a.idealDuration },
              { icon: "season", label: "Best season", value: a.bestSeason },
              { icon: "location", label: "Base", value: `${a.nearestTown} (${a.district})` },
              { icon: "permit", label: "Permits", value: a.permit },
            ]}
          />
        </Panel>
        <Panel title="About this experience">
          <div className="prose-nt text-sm">{a.description.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}</div>
        </Panel>
        {places.length > 0 && (
          <Panel title="Where to do it">
            <LinkList>{places.map((p) => <LinkRow key={p.slug} href={placeUrl(p)} title={shortName(p.name)} meta={p.summary} image={p.images[0]} badge={getState(p.state).name} />)}</LinkList>
          </Panel>
        )}
        {tours.length > 0 && (
          <Panel title="Tours with this activity">
            <LinkList>{tours.map((t) => <LinkRow key={t.slug} href={tourUrl(t)} title={t.title.split(":")[0]} meta={`${durationLabel(t)} · ${t.startCity} → ${t.endCity}`} image={t.images[0]} />)}</LinkList>
          </Panel>
        )}
        <Faqs faqs={a.faqs} title={`${a.name.split(":")[0]} FAQs`} />
        <BookingForm tour={a.name} state={state.name} title="Enquire about this experience" />
        <Panel title={`More in ${state.name}`}>
          <LinkList>{more.map((x) => <LinkRow key={x.slug} href={activityUrl(x)} title={x.name} meta={x.summary} image={x.images[0]} badge={x.difficulty} />)}</LinkList>
        </Panel>
      </Page>
    </>
  );
}
