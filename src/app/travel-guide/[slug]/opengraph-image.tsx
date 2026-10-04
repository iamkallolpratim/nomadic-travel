import { getGuide, guides, heroFor } from "@/lib/content";
import { OG_SIZE, renderOg } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Northeast India travel guide";
export const generateStaticParams = () => guides.map((g) => ({ slug: g.slug }));

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const g = getGuide((await params).slug)!;
  return renderOg({ title: g.title, eyebrow: "Travel guide", file: heroFor(g.heroImage) });
}
