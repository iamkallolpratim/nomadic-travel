import manifest from "@/data/images.generated.json";
import { rawPlaces } from "@/data/places";
import { rawActivities } from "@/data/activities";
import { rawTours } from "@/data/tours";
import { guides } from "@/data/guides";
import { states } from "@/data/states";
import { cities, type CityKey } from "@/data/cities";
import type { Activity, Guide, ImageMeta, Place, StateInfo, StateSlug, Tour } from "@/types";

const files = manifest.files as Record<string, ImageMeta>;
const entities = manifest.entities as Record<string, string[]>;

export const imagesFor = (key: string): string[] => entities[key] ?? [];
export const getImage = (file: string): ImageMeta | undefined => files[file];
export const allImages = (): ImageMeta[] => Object.values(files);
/** First image for an entity key such as "place:kaziranga-national-park" */
export const heroFor = (key: string): string | undefined => imagesFor(key)[0];

export const places: Place[] = rawPlaces.map((p) => ({ ...p, images: imagesFor(`place:${p.slug}`) }));
export const activities: Activity[] = rawActivities.map((a) => ({ ...a, images: imagesFor(`activity:${a.slug}`) }));
export const tours: Tour[] = rawTours.map(({ imageFrom, ...t }) => {
  const firsts = imageFrom.map((k) => imagesFor(k)[0]);
  const rest = imageFrom.flatMap((k) => imagesFor(k).slice(1, 3));
  return { ...t, images: [...new Set([...firsts, ...rest].filter(Boolean))].slice(0, 7) as string[] };
});
export { states, guides };

const placeMap = new Map(places.map((p) => [p.slug, p]));
const activityMap = new Map(activities.map((a) => [a.slug, a]));
const tourMap = new Map(tours.map((t) => [t.slug, t]));

export const getState = (slug: StateSlug): StateInfo => states.find((s) => s.slug === slug)!;
export const getStateByPage = (page: string) => states.find((s) => s.pageSlug === page);
export const getPlace = (slug: string) => placeMap.get(slug);
export const getActivity = (slug: string) => activityMap.get(slug);
export const getTour = (slug: string) => tourMap.get(slug);
export const getGuide = (slug: string): Guide | undefined => guides.find((g) => g.slug === slug);

export const placesIn = (s: StateSlug) => places.filter((p) => p.state === s);
export const activitiesIn = (s: StateSlug) => activities.filter((a) => a.state === s);
export const toursIn = (s: StateSlug) => tours.filter((t) => t.states.includes(s));
export const toursWithPlace = (slug: string) => tours.filter((t) => t.places.includes(slug));
export const toursWithActivity = (slug: string) => tours.filter((t) => t.activities.includes(slug));
export const activitiesAt = (placeSlug: string) => activities.filter((a) => a.places.includes(placeSlug));
export const featuredTours = () => tours.filter((t) => t.featured);
export const guidesFor = (s: StateSlug) => guides.filter((g) => g.states.includes(s));

export const resolve = <T,>(slugs: string[], get: (s: string) => T | undefined) =>
  slugs.map(get).filter((x): x is T => Boolean(x));

/* URLs */
export const stateUrl = (s: StateSlug) => `/${getState(s).pageSlug}`;
export const placeUrl = (p: Pick<Place, "state" | "slug">) => `/places/${p.state}/${p.slug}`;
export const activityUrl = (a: Pick<Activity, "slug">) => `/activities/${a.slug}`;
export const tourUrl = (t: Pick<Tour, "slug">) => `/tours/${t.slug}`;
export const guideUrl = (g: Pick<Guide, "slug">) => `/travel-guide/${g.slug}`;

export type RouteStop = { key: string; label: string; lat: number; lng: number; href?: string; day: number; color: string };

/** Ordered map stops for a tour: start city → each day's towns and places → end city (consecutive repeats removed). */
export function routeStops(t: Tour): RouteStop[] {
  const city = (k: CityKey, day: number): RouteStop => ({ key: k, label: cities[k].name, lat: cities[k].lat, lng: cities[k].lng, day, color: "#475569" });
  const stops: RouteStop[] = [city(t.start, 1)];
  for (const d of t.itinerary) {
    for (const k of d.towns ?? []) stops.push(city(k, d.day));
    for (const slug of d.places ?? []) {
      const p = placeMap.get(slug);
      if (p) stops.push({ key: p.slug, label: p.name.replace(/\s*\(.*?\)\s*/g, " ").trim(), lat: p.lat, lng: p.lng, href: placeUrl(p), day: d.day, color: getState(p.state).accent.hex });
    }
  }
  stops.push(city(t.end, t.days));
  return stops.filter((s, i) => i === 0 || s.key !== stops[i - 1].key);
}

export const durationLabel = (t: Pick<Tour, "nights" | "days">) => `${t.nights}N / ${t.days}D`;

/* Build-time integrity checks: fail the build on broken internal references. */
(function validate() {
  const errors: string[] = [];
  const need = (ok: boolean, msg: string) => ok || errors.push(msg);
  const dup = (arr: string[], label: string) =>
    arr.filter((s, i) => arr.indexOf(s) !== i).forEach((s) => errors.push(`duplicate ${label} slug ${s}`));
  dup(places.map((p) => p.slug), "place");
  dup(activities.map((a) => a.slug), "activity");
  dup(tours.map((t) => t.slug), "tour");
  for (const p of places) {
    p.activities.forEach((a) => need(activityMap.has(a), `place ${p.slug} → missing activity ${a}`));
    p.nearby.forEach((n) => need(placeMap.has(n), `place ${p.slug} → missing nearby ${n}`));
    need(p.images.length > 0, `place ${p.slug} has no images`);
  }
  for (const a of activities) {
    a.places.forEach((p) => need(placeMap.has(p), `activity ${a.slug} → missing place ${p}`));
    need(a.images.length > 0, `activity ${a.slug} has no images`);
  }
  for (const t of tours) {
    t.places.forEach((p) => need(placeMap.has(p), `tour ${t.slug} → missing place ${p}`));
    t.activities.forEach((a) => need(activityMap.has(a), `tour ${t.slug} → missing activity ${a}`));
    t.itinerary.forEach((d) => d.places?.forEach((p) => need(placeMap.has(p), `tour ${t.slug} day ${d.day} → missing place ${p}`)));
    need(t.itinerary.length === t.days, `tour ${t.slug} has ${t.itinerary.length} days, expected ${t.days}`);
    [t.start, t.end, ...t.itinerary.flatMap((d) => d.towns ?? [])].forEach((k) => need(k in cities, `tour ${t.slug} → unknown city ${k}`));
  }
  for (const g of guides) {
    g.relatedTours.forEach((s) => need(tourMap.has(s), `guide ${g.slug} → missing tour ${s}`));
    g.relatedPlaces.forEach((s) => need(placeMap.has(s), `guide ${g.slug} → missing place ${s}`));
  }
  for (const s of states) need(imagesFor(s.heroImage).length > 0, `state ${s.slug} hero image missing`);
  // Inline links inside guide copy must point at real routes.
  const routes = new Set([
    "/", "/tours", "/activities", "/travel-guide", "/about", "/contact",
    ...states.map((s) => `/${s.pageSlug}`),
    ...places.map(placeUrl), ...activities.map(activityUrl), ...tours.map(tourUrl), ...guides.map(guideUrl),
  ]);
  for (const g of guides) {
    const text = JSON.stringify(g.body);
    for (const [, href] of text.matchAll(/\]\((\/[^)]*)\)/g)) need(routes.has(href), `guide ${g.slug} → broken link ${href}`);
  }
  if (errors.length) throw new Error("Content integrity errors:\n" + errors.join("\n"));
})();
