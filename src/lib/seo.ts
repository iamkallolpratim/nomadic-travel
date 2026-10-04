import type { Metadata } from "next";
import { absoluteUrl, site } from "@/data/site";

/** Returns the first candidate that fits `max` chars, else a word-boundary truncation of the last one. */
export function fit(candidates: string[], max: number): string {
  for (const c of candidates) if (c.length <= max) return c;
  const last = candidates[candidates.length - 1];
  const cut = last.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:–—-]\s*$/, "") + "…";
}

export const shortName = (name: string) => name.replace(/\s*\(.*?\)\s*/g, " ").trim();

interface MetaInput {
  title: string;
  description: string;
  path: string;
  /** Set false when the route segment ships its own opengraph-image */
  defaultImage?: boolean;
  type?: "website" | "article";
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
}

export function buildMetadata({ title, description, path, defaultImage = true, type = "website", noindex, publishedTime, modifiedTime }: MetaInput): Metadata {
  const t = fit([title], 60);
  const d = fit([description], 155);
  const url = absoluteUrl(path);
  const images = defaultImage ? [{ url: absoluteUrl("/og-default.jpg"), width: 1200, height: 630, alt: `${site.name} — Northeast India tours` }] : undefined;
  return {
    title: { absolute: t },
    description: d,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type,
      url,
      title: t,
      description: d,
      siteName: site.name,
      locale: "en_IN",
      ...(images ? { images } : {}),
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: { card: "summary_large_image", title: t, description: d, ...(images ? { images: images.map((i) => i.url) } : {}) },
  };
}
