import { LinkButton } from "@/components/ui/Minimal";
import { heroFor, states } from "@/lib/content";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <div className="col space-y-3 pb-10 pt-14">
      <h1 className="text-center text-3xl text-forest-950">This trail doesn&apos;t exist</h1>
      <p className="pb-3 text-center text-sm text-slate-600">The page may have moved. Pick a state or browse all tours.</p>
      {states.map((s) => <LinkButton key={s.slug} href={`/${s.pageSlug}`} label={`${s.name} Tour Packages`} image={heroFor(s.heroImage)} accent={s.accent.bg} />)}
      <LinkButton href="/tours" label="All Tour Packages" icon="map" />
      <LinkButton href="/" label="Home" icon="city" />
    </div>
  );
}
