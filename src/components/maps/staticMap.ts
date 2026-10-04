import { site } from "@/data/site";

export type StaticMarker = { lat: number; lng: number; color: string; label?: string };

const hex = (c: string) => `0x${c.replace("#", "")}`;
const ll = (p: { lat: number; lng: number }) => `${p.lat.toFixed(4)},${p.lng.toFixed(4)}`;

/** Maps Static API URL. Without center/zoom the map auto-fits all markers and the path. */
export function staticMapUrl({ markers, path, size = "640x400", zoom }: { markers: StaticMarker[]; path?: { lat: number; lng: number }[]; size?: string; zoom?: number }) {
  if (!site.mapsKey) return "";
  const q = new URLSearchParams({ size, scale: "2", maptype: "roadmap", key: site.mapsKey });
  if (zoom) q.set("zoom", String(zoom));
  ["feature:poi|visibility:off", "feature:transit|visibility:off", "feature:landscape|color:0xf1f3ec"].forEach((st) => q.append("style", st));
  if (path && path.length > 1) q.append("path", `color:0x1b4e33cc|weight:3|${path.map(ll).join("|")}`);
  for (const m of markers) q.append("markers", `size:${m.label ? "mid" : "small"}|color:${hex(m.color)}${m.label ? `|label:${m.label}` : ""}|${ll(m)}`);
  return `https://maps.googleapis.com/maps/api/staticmap?${q.toString()}`;
}

/** Static API labels are a single character: 1–9 then A–Z. */
export const stopLabel = (i: number) => (i < 9 ? String(i + 1) : String.fromCharCode(65 + i - 9));
