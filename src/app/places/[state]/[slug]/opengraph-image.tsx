import { getPlace, getState, places } from "@/lib/content";
import { OG_SIZE, renderOg } from "@/lib/og";
import { shortName } from "@/lib/seo";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Place to visit in Northeast India";
export const generateStaticParams = () => places.map((p) => ({ state: p.state, slug: p.slug }));

export default async function Image({ params }: { params: Promise<{ state: string; slug: string }> }) {
  const p = getPlace((await params).slug)!;
  const s = getState(p.state);
  return renderOg({ title: shortName(p.name), eyebrow: `${s.name} · ${p.category}`, meta: `Best time: ${p.bestSeason.split(";")[0]}`, file: p.images[0], accent: s.accent.hex });
}
