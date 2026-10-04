import { HeartHandshake, Leaf, MapPinned } from "lucide-react";
import { Img } from "@/components/ui/Img";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { LinkButton, Page, Panel, TopBar } from "@/components/ui/Minimal";
import { JsonLd } from "@/components/seo/JsonLd";
import { heroFor, states } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { organizationSchema } from "@/lib/schema";
import { site } from "@/data/site";

export const metadata = buildMetadata({
  title: "About Nomadic Travel | Northeast India Tour Experts",
  description: "Nomadic Travel is a Guwahati-based Northeast India travel company founded by travel creator Zeemi, crafting responsible tours across Assam, Arunachal, Meghalaya and Nagaland.",
  path: "/about",
});

const VALUES = [
  { Icon: MapPinned, title: "Rooted in Guwahati", text: "Our team lives in Assam and travels the region constantly, so our advice is current and first-hand." },
  { Icon: HeartHandshake, title: "Community first", text: "We work with village homestays, local guides and drivers so tourism money stays in the Northeast." },
  { Icon: Leaf, title: "Respect for places", text: "From Kaziranga's rhinos to Meghalaya's sacred groves, we follow local rules and leave no trace." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={organizationSchema()} />
      <TopBar title="About" />
      <Page>
        <Breadcrumbs items={[{ name: "About", href: "/about" }]} />
        <section className="panel p-3">
          <div className="grid grid-cols-2 gap-2">
            {["place:kaziranga-national-park", "activity:hornbill-festival"].map((k) => (
              <div key={k} className="relative aspect-square overflow-hidden rounded-2xl"><Img file={heroFor(k)} sizes="240px" className="object-cover" /></div>
            ))}
          </div>
          <div className="px-2 pb-2 pt-4">
            <h1 className="text-3xl text-forest-950">About Nomadic Travel</h1>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              We are a Guwahati-based travel company, founded in {site.foundingYear}, crafting authentic, sustainable journeys across Assam, Arunachal Pradesh,
              Meghalaya and Nagaland.
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              Nomadic Travel was founded by travel creator Zeemi (Zeemi Walker), whose videos of Kaziranga safaris, Tawang&apos;s monasteries, Meghalaya&apos;s
              living root bridges and Naga festivals have introduced the Northeast to travellers across India. We go beyond the usual trail to create trips that
              are comfortable, realistic and genuinely immersive.
            </p>
          </div>
        </section>
        <Panel title="What we stand for">
          <ul className="space-y-3">
            {VALUES.map(({ Icon, title, text }) => (
              <li key={title} className="flex gap-3">
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-forest-50 text-forest-700"><Icon className="h-4 w-4" aria-hidden /></span>
                <div><h2 className="font-sans text-sm font-semibold text-forest-900">{title}</h2><p className="text-sm text-slate-700">{text}</p></div>
              </li>
            ))}
          </ul>
        </Panel>
        <div className="space-y-3">
          <LinkButton href={site.sameAs[2]} label="Watch Zeemi's journeys" sub="YouTube" icon="music" external />
          {states.map((s) => <LinkButton key={s.slug} href={`/${s.pageSlug}`} label={`${s.name} Tour Packages`} image={heroFor(s.heroImage)} accent={s.accent.bg} />)}
        </div>
      </Page>
    </>
  );
}
