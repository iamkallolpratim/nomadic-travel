import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { LinkList, LinkRow, Page, Panel, TopBar } from "@/components/ui/Minimal";
import { JsonLd } from "@/components/seo/JsonLd";
import { guides, guideUrl, heroFor } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { itemListSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Northeast India Travel Guide: Permits, Seasons & Tips",
  description: "Practical Northeast India travel guides: best time to visit, Arunachal ILP, Hornbill Festival, Kaziranga safari zones, Tawang, Majuli and root bridges.",
  path: "/travel-guide",
});

export default function GuidesPage() {
  const sorted = [...guides].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  return (
    <>
      <JsonLd data={itemListSchema("Northeast India travel guides", guides.map((g) => ({ name: g.title, url: guideUrl(g) })))} />
      <TopBar title="Travel Guide" />
      <Page>
        <Breadcrumbs items={[{ name: "Travel Guide", href: "/travel-guide" }]} />
        <header className="px-1">
          <h1 className="text-3xl text-forest-950">Northeast India travel guide</h1>
          <p className="mt-2 text-sm leading-6 text-slate-700">Permits, seasons, routes and insider tips for Assam, Arunachal Pradesh, Meghalaya and Nagaland — written by our Guwahati team.</p>
        </header>
        <Panel title={`${guides.length} guides`}>
          <LinkList>{sorted.map((g) => <LinkRow key={g.slug} href={guideUrl(g)} title={g.title} meta={g.excerpt} image={heroFor(g.heroImage)} />)}</LinkList>
        </Panel>
      </Page>
    </>
  );
}
