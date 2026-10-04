import { durationLabel, getState, tours } from "@/lib/content";
import { OG_SIZE, renderOg } from "@/lib/og";
import { formatINR, site } from "@/data/site";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Northeast India tour package";
export const generateStaticParams = () => tours.map((t) => ({ slug: t.slug }));

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = tours.find((x) => x.slug === slug)!;
  const states = t.states.map((s) => getState(s).name).join(" + ");
  return renderOg({
    title: t.title,
    eyebrow: `${states} · ${durationLabel(t)}`,
    meta: site.showPrices ? `From ${formatINR(t.priceFrom)} per person · ${t.startCity} → ${t.endCity}` : `${t.startCity} → ${t.endCity}`,
    file: t.images[0],
    accent: getState(t.states[0]).accent.hex,
  });
}
