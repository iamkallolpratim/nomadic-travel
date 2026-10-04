import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Icon } from "@/components/ui/Icon";
import { Page, TopBar } from "@/components/ui/Minimal";
import { TourCard } from "@/components/cards/TourCard";
import { ToursExplorer } from "@/components/tours/ToursExplorer";
import { JsonLd } from "@/components/seo/JsonLd";
import { activities, states, tours, tourUrl } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { itemListSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "All Northeast India Tours | Filter by State & Days",
  description: `Browse ${tours.length} Northeast India tour packages across Assam, Arunachal Pradesh, Meghalaya and Nagaland. Filter by state, duration and activity.`,
  path: "/tours",
});

export default function ToursPage() {
  const used = new Set(tours.flatMap((t) => t.activities));
  const activityOptions = activities
    .filter((a) => used.has(a.slug))
    .map((a) => ({ value: a.slug, label: a.name.split(":")[0].replace(/ \(.*\)/, ""), icon: <Icon name={a.icon} className="h-3.5 w-3.5" /> }));
  const sorted = [...tours].sort((a, b) => Number(!!b.featured) - Number(!!a.featured) || a.days - b.days);
  return (
    <>
      <JsonLd data={itemListSchema("Northeast India tour packages", sorted.map((t) => ({ name: t.title, url: tourUrl(t) })))} />
      <TopBar title="Tour Packages" />
      <Page>
        <Breadcrumbs items={[{ name: "Tours", href: "/tours" }]} />
        <header className="px-1">
          <h1 className="text-3xl text-forest-950">Northeast India tour packages</h1>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            {tours.length} private itineraries from 3 to 10 nights, starting in Guwahati, Dibrugarh, Jorhat, Itanagar or Dimapur — each with a private
            vehicle, handpicked stays and 24×7 support, and fully customisable.
          </p>
        </header>
        <ToursExplorer
          facets={sorted.map((t) => ({ slug: t.slug, states: t.states, days: t.days, activities: t.activities }))}
          cards={Object.fromEntries(sorted.map((t) => [t.slug, <TourCard key={t.slug} tour={t} headingLevel="h2" />]))}
          stateOptions={states.map((s) => ({ value: s.slug, label: s.name }))}
          activityOptions={activityOptions}
        />
      </Page>
    </>
  );
}
