import { getStateByPage, heroFor, placesIn, states, toursIn } from "@/lib/content";
import { OG_SIZE, renderOg } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Northeast India state tour packages";
export const generateStaticParams = () => states.map((s) => ({ statePage: s.pageSlug }));

export default async function Image({ params }: { params: Promise<{ statePage: string }> }) {
  const s = getStateByPage((await params).statePage)!;
  return renderOg({ title: `${s.name} Tour Packages`, eyebrow: "Northeast India", meta: `${toursIn(s.slug).length} tours · ${placesIn(s.slug).length} places · ${s.tagline}`, file: heroFor(s.heroImage), accent: s.accent.hex });
}
