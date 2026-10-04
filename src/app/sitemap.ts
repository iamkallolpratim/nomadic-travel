import type { MetadataRoute } from "next";
import { activities, activityUrl, guides, guideUrl, places, placeUrl, states, tours, tourUrl } from "@/lib/content";
import { absoluteUrl } from "@/data/site";

/** Bump when tour/place/activity data changes materially. */
const CONTENT_UPDATED = new Date("2026-10-03");

export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string, priority: number, lastModified = CONTENT_UPDATED, changeFrequency: "weekly" | "monthly" = "monthly") => ({
    url: absoluteUrl(path), lastModified, changeFrequency, priority,
  });
  return [
    entry("/", 1, CONTENT_UPDATED, "weekly"),
    ...states.map((s) => entry(`/${s.pageSlug}`, 0.9, CONTENT_UPDATED, "weekly")),
    entry("/tours", 0.9, CONTENT_UPDATED, "weekly"),
    ...tours.map((t) => entry(tourUrl(t), 0.8)),
    entry("/activities", 0.7),
    ...activities.map((a) => entry(activityUrl(a), 0.6)),
    ...places.map((p) => entry(placeUrl(p), 0.7)),
    entry("/travel-guide", 0.7, CONTENT_UPDATED, "weekly"),
    ...guides.map((g) => entry(guideUrl(g), 0.7, new Date(g.updatedAt))),
    entry("/about", 0.4),
    entry("/contact", 0.5),
    entry("/credits", 0.2),
  ];
}
