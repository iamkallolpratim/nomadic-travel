import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarDays, Lightbulb } from "lucide-react";
import { Img } from "@/components/ui/Img";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Faqs } from "@/components/ui/Faqs";
import { RichText } from "@/components/ui/RichText";
import { LinkList, LinkRow, Page, Panel, TopBar } from "@/components/ui/Minimal";
import { WhatsAppButton } from "@/components/lead/WhatsAppButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { durationLabel, getGuide, getPlace, getTour, guides, guideUrl, heroFor, placeUrl, resolve, tourUrl } from "@/lib/content";
import { buildMetadata, shortName } from "@/lib/seo";
import { articleSchema } from "@/lib/schema";

export const dynamicParams = false;
export const generateStaticParams = () => guides.map((g) => ({ slug: g.slug }));
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const g = getGuide((await params).slug);
  if (!g) return {};
  return buildMetadata({ title: g.metaTitle, description: g.metaDescription, path: guideUrl(g), type: "article", publishedTime: g.publishedAt, modifiedTime: g.updatedAt, defaultImage: false });
}

const fmt = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
const anchor = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default async function GuidePage({ params }: Props) {
  const g = getGuide((await params).slug);
  if (!g) notFound();
  const hero = heroFor(g.heroImage);
  const toc = g.body.filter((b) => b.type === "h2");
  return (
    <>
      <JsonLd data={articleSchema(g, guideUrl(g), hero)} />
      <TopBar title={g.title.split(":")[0]} back="/travel-guide" />
      <Page>
        <Breadcrumbs items={[{ name: "Travel Guide", href: "/travel-guide" }, { name: g.title.split(":")[0], href: guideUrl(g) }]} />
        <article className="panel p-3">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
            <Img file={hero} sizes="(min-width:640px) 480px, 92vw" preload quality={75} className="object-cover" />
          </div>
          <div className="px-2 pb-2 pt-4">
            <h1 className="text-2xl leading-snug text-forest-950">{g.title}</h1>
            <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-600">
              <CalendarDays className="h-3.5 w-3.5" aria-hidden /> Updated <time dateTime={g.updatedAt}>{fmt(g.updatedAt)}</time> · Nomadic Travel team
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-700">{g.excerpt}</p>
            <nav aria-label="Contents" className="mt-4 rounded-2xl bg-slate-50 p-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-600">In this guide</p>
              <ol className="mt-2 space-y-1 text-sm">{toc.map((h) => <li key={h.text}><a href={`#${anchor(h.text)}`} className="text-forest-800 hover:underline">{h.text}</a></li>)}</ol>
            </nav>
            <div className="mt-2 text-[15px]">
              {g.body.map((b, i) => {
                switch (b.type) {
                  case "h2": return <h2 key={i} id={anchor(b.text)} className="mb-2 mt-7 scroll-mt-20 text-xl text-forest-950">{b.text}</h2>;
                  case "h3": return <h3 key={i} className="mb-2 mt-5 font-sans text-base font-bold text-forest-900">{b.text}</h3>;
                  case "p": return <p key={i} className="mb-3 leading-7 text-slate-700"><RichText text={b.text} /></p>;
                  case "ul": return <ul key={i} className="mb-4 list-disc space-y-1.5 pl-5 text-slate-700">{b.items.map((it) => <li key={it}><RichText text={it} /></li>)}</ul>;
                  case "ol": return <ol key={i} className="mb-4 list-decimal space-y-1.5 pl-5 text-slate-700">{b.items.map((it) => <li key={it}><RichText text={it} /></li>)}</ol>;
                  case "tip": return <aside key={i} className="my-5 flex gap-3 rounded-2xl bg-amber-50 p-4 text-sm text-amber-950 ring-1 ring-amber-200"><Lightbulb className="h-5 w-5 flex-none text-amber-600" aria-hidden /><p><RichText text={b.text} /></p></aside>;
                }
              })}
            </div>
            <WhatsAppButton label="Ask a local on WhatsApp" text={`I read your guide "${g.title}" and have a question.`} className="btn-whatsapp mt-4 w-full py-2.5 text-xs" />
          </div>
        </article>
        {g.faqs && <Faqs faqs={g.faqs} />}
        <Panel title="Related tours">
          <LinkList>{resolve(g.relatedTours, getTour).map((t) => <LinkRow key={t.slug} href={tourUrl(t)} title={t.title.split(":")[0]} meta={`${durationLabel(t)} · ${t.startCity} → ${t.endCity}`} image={t.images[0]} />)}</LinkList>
        </Panel>
        <Panel title="Places in this guide">
          <LinkList>{resolve(g.relatedPlaces, getPlace).map((p) => <LinkRow key={p.slug} href={placeUrl(p)} title={shortName(p.name)} meta={p.summary} image={p.images[0]} badge={p.category} />)}</LinkList>
        </Panel>
      </Page>
    </>
  );
}
