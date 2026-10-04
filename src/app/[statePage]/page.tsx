import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TriangleAlert } from "lucide-react";
import { Img } from "@/components/ui/Img";
import { Icon } from "@/components/ui/Icon";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Faqs } from "@/components/ui/Faqs";
import { RichText } from "@/components/ui/RichText";
import { LinkList, LinkRow, Page, Panel, TopBar } from "@/components/ui/Minimal";
import { TourCard } from "@/components/cards/TourCard";
import { BookingForm } from "@/components/lead/BookingForm";
import { WhatsAppButton } from "@/components/lead/WhatsAppButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { activitiesIn, activityUrl, getStateByPage, guidesFor, guideUrl, heroFor, placesIn, placeUrl, states, toursIn, tourUrl } from "@/lib/content";
import { buildMetadata, shortName } from "@/lib/seo";
import { itemListSchema } from "@/lib/schema";
import { absoluteUrl } from "@/data/site";

export const dynamicParams = false;
export const generateStaticParams = () => states.map((s) => ({ statePage: s.pageSlug }));

type Props = { params: Promise<{ statePage: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getStateByPage((await params).statePage);
  if (!s) return {};
  return buildMetadata({ title: s.metaTitle, description: s.metaDescription, path: `/${s.pageSlug}`, defaultImage: false });
}

const REACH_ICON = { air: "flight", rail: "train", road: "drive" } as const;
const JUMP = [["tours", "Tours"], ["places", "Places"], ["activities", "Activities"], ["best-time", "Best time"], ["how-to-reach", "How to reach"], ["permits", "Permits"], ["faqs", "FAQs"]];

export default async function StatePage({ params }: Props) {
  const state = getStateByPage((await params).statePage);
  if (!state) notFound();
  const tours = toursIn(state.slug);
  const places = placesIn(state.slug);
  const acts = activitiesIn(state.slug);
  const guides = guidesFor(state.slug);
  const path = `/${state.pageSlug}`;

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "TouristDestination",
            name: state.name,
            description: state.tagline,
            url: absoluteUrl(path),
            includesAttraction: places.map((p) => ({ "@type": "TouristAttraction", name: p.name, url: absoluteUrl(placeUrl(p)) })),
          },
          itemListSchema(`${state.name} tour packages`, tours.map((t) => ({ name: t.title, url: tourUrl(t) }))),
        ]}
      />
      <TopBar title={`${state.name} Tour Packages`} />
      <Page>
        <Breadcrumbs items={[{ name: `${state.name} Tour Packages`, href: path }]} />
        <section className="panel p-3">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
            <Img file={heroFor(state.heroImage)} sizes="(min-width:640px) 480px, 92vw" preload quality={75} className="object-cover" alt={`${state.name} tour packages — ${state.tagline}`} />
          </div>
          <div className="px-2 pb-2 pt-4">
            <span className={`block h-1 w-10 rounded ${state.accent.bg}`} aria-hidden />
            <h1 className="mt-3 text-3xl text-forest-950">{state.name} Tour Packages</h1>
            <p className="mt-1 text-sm text-slate-600">{state.tagline}</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <a href="#tours" className="btn-outline py-2.5 text-xs">View {tours.length} tours</a>
              <WhatsAppButton label="Ask on WhatsApp" state={state.name} tour={`${state.name} tour`} className="btn-whatsapp py-2.5 text-xs" />
            </div>
          </div>
        </section>

        <nav aria-label="On this page" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
          {JUMP.map(([id, label]) => <a key={id} href={`#${id}`} className="chip whitespace-nowrap bg-white">{label}</a>)}
        </nav>

        <Panel title="Overview">
          <div className="prose-nt text-sm">{state.intro.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}</div>
          <dl className="grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-xl bg-slate-50 p-3"><dt className="text-slate-600">Capital</dt><dd className="font-semibold text-forest-900">{state.capital}</dd></div>
            <div className="rounded-xl bg-slate-50 p-3"><dt className="text-slate-600">Gateway</dt><dd className="font-semibold text-forest-900">{state.gateway}</dd></div>
          </dl>
        </Panel>

        <div id="tours" className="scroll-mt-20 space-y-4">
          <h2 className="px-1 pt-2 font-display text-xl text-forest-950">{state.name} tour packages</h2>
          {tours.map((t) => <TourCard key={t.slug} tour={t} />)}
        </div>

        <Panel title={`Places to visit in ${state.name}`} id="places">
          <LinkList>
            {places.map((p) => <LinkRow key={p.slug} href={placeUrl(p)} title={shortName(p.name)} meta={p.summary} image={p.images[0]} badge={p.category} />)}
          </LinkList>
        </Panel>

        <Panel title={`Things to do in ${state.name}`} id="activities">
          <LinkList>
            {acts.map((a) => <LinkRow key={a.slug} href={activityUrl(a)} title={a.name} meta={`${a.difficulty} · ${a.bestSeason}`} image={a.images[0]} badge={a.category} />)}
          </LinkList>
        </Panel>

        <Panel title={`Best time to visit ${state.name}`} id="best-time">
          <p className="mb-3 text-sm leading-6 text-slate-700">{state.bestTime.summary}</p>
          <ul className="space-y-2">
            {state.bestTime.seasons.map((s) => (
              <li key={s.name} className="flex gap-3 rounded-2xl bg-slate-50 p-3">
                <Icon name={s.icon} className="mt-0.5 h-4 w-4 flex-none text-tea-600" />
                <div className="text-sm">
                  <p className="font-semibold text-forest-900">{s.name} <span className="font-normal text-slate-600">· {s.months}</span></p>
                  <p className="mt-0.5 text-xs leading-5 text-slate-700">{s.notes}</p>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title={`How to reach ${state.name}`} id="how-to-reach">
          <ul className="space-y-3">
            {state.howToReach.map((r) => (
              <li key={r.mode} className="flex gap-3">
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-xl bg-mist-50 text-mist-700"><Icon name={REACH_ICON[r.mode]} className="h-4 w-4" /></span>
                <div><h3 className="font-sans text-sm font-semibold text-forest-900">{r.title}</h3><p className="text-xs leading-5 text-slate-700">{r.text}</p></div>
              </li>
            ))}
          </ul>
        </Panel>

        <section id="permits" className="reveal scroll-mt-20 rounded-3xl bg-amber-50 p-5 ring-1 ring-amber-200">
          <h2 className="flex items-center gap-2 font-sans text-sm font-bold uppercase tracking-[0.12em] text-amber-900"><Icon name="permit" className="h-4 w-4" />{state.permit.title}</h2>
          <h3 className="mt-3 font-sans text-xs font-bold uppercase text-amber-900">Indian citizens</h3>
          <p className="mt-1 text-sm leading-6 text-slate-800">{state.permit.indian}</p>
          <h3 className="mt-3 font-sans text-xs font-bold uppercase text-amber-900">Foreign nationals</h3>
          <p className="mt-1 text-sm leading-6 text-slate-800">{state.permit.foreign}</p>
          <ul className="mt-3 space-y-1 text-sm">
            {state.permit.links.map((l) => <li key={l.href}><a href={l.href} target="_blank" rel="noopener noreferrer" className="link">{l.label} ↗</a></li>)}
          </ul>
          <p className="mt-3 flex items-center gap-2 text-xs font-semibold text-amber-900"><TriangleAlert className="h-4 w-4" aria-hidden /> Verify before travel — rules and fees change.</p>
        </section>

        <Panel title={`About ${state.name}`}>
          <div className="divide-y divide-slate-100">
            {state.culture.map((c) => (
              <details key={c.heading} className="group py-3 first:pt-0">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
                  <h3 className="font-sans text-sm font-semibold text-forest-900">{c.heading}</h3>
                  <span className="text-slate-400 transition group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <div className="prose-nt mt-2 text-sm">{c.paragraphs.map((p) => <p key={p.slice(0, 20)}><RichText text={p} /></p>)}</div>
              </details>
            ))}
            <div className="pt-3">
              <h3 className="font-sans text-sm font-semibold text-forest-900">Travel tips</h3>
              <ul className="mt-2 space-y-1.5">{state.travelTips.map((t) => <li key={t} className="flex gap-2 text-sm text-slate-700"><Icon name="include" className="mt-1 h-3.5 w-3.5 flex-none text-tea-600" />{t}</li>)}</ul>
            </div>
          </div>
        </Panel>

        {guides.length > 0 && (
          <Panel title={`${state.name} travel guides`}>
            <LinkList>{guides.map((g) => <LinkRow key={g.slug} href={guideUrl(g)} title={g.title} meta={g.excerpt} image={heroFor(g.heroImage)} />)}</LinkList>
          </Panel>
        )}

        <Faqs faqs={state.faqs} title={`${state.name} travel FAQs`} />
        <BookingForm state={state.name} tour={`${state.name} tour package`} title={`Get a ${state.name} quote`} />
      </Page>
    </>
  );
}
