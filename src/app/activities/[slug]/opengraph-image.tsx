import { activities, getState } from "@/lib/content";
import { OG_SIZE, renderOg } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Activity in Northeast India";
export const generateStaticParams = () => activities.map((a) => ({ slug: a.slug }));

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = activities.find((x) => x.slug === slug)!;
  const s = getState(a.state);
  return renderOg({ title: a.name, eyebrow: `${s.name} · ${a.category}`, meta: `${a.difficulty} · ${a.bestSeason}`, file: a.images[0], accent: s.accent.hex });
}
