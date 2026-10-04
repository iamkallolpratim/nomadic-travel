import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { LinkList, LinkRow, Page, Panel, TopBar } from "@/components/ui/Minimal";
import { JsonLd } from "@/components/seo/JsonLd";
import { activities, activitiesIn, activityUrl, states } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { itemListSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Things to Do in Northeast India: 40+ Activities",
  description: `Safaris, treks, rafting, festivals, caving and village stays — ${activities.length} activities across Assam, Arunachal Pradesh, Meghalaya and Nagaland.`,
  path: "/activities",
});

export default function ActivitiesPage() {
  return (
    <>
      <JsonLd data={itemListSchema("Things to do in Northeast India", activities.map((a) => ({ name: a.name, url: activityUrl(a) })))} />
      <TopBar title="Activities" />
      <Page>
        <Breadcrumbs items={[{ name: "Activities", href: "/activities" }]} />
        <header className="px-1">
          <h1 className="text-3xl text-forest-950">Things to do in Northeast India</h1>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            Jeep safaris among Kaziranga&apos;s rhinos, the Hornbill Festival, root bridge treks, Siang rafting and Apatani village walks — {activities.length} experiences we can add to any tour.
          </p>
        </header>
        <nav aria-label="Jump to state" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
          {states.map((s) => <a key={s.slug} href={`#${s.slug}`} className="chip whitespace-nowrap bg-white">{s.name}</a>)}
        </nav>
        {states.map((s) => (
          <Panel key={s.slug} id={s.slug} title={`Activities in ${s.name}`}>
            <LinkList>{activitiesIn(s.slug).map((a) => <LinkRow key={a.slug} href={activityUrl(a)} title={a.name} meta={a.summary} image={a.images[0]} badge={`${a.category} · ${a.difficulty}`} />)}</LinkList>
          </Panel>
        ))}
      </Page>
    </>
  );
}
