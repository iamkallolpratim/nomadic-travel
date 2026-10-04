import Link from "next/link";
import { Panel } from "@/components/ui/Minimal";
import { routeStops } from "@/lib/content";
import { site } from "@/data/site";
import type { Tour } from "@/types";
import { MapFacade } from "./MapFacade";
import { TourRouteMap } from "./TourRouteMap";
import { staticMapUrl, stopLabel } from "./staticMap";

/** Tour route: static overview map (+ interactive road route on tap) and an ordered, linked stop list. */
export function RoutePanel({ tour }: { tour: Tour }) {
  const stops = routeStops(tour);
  const src = staticMapUrl({ markers: stops.map((s, i) => ({ ...s, label: stopLabel(i) })), path: stops });
  return (
    <Panel title="Route map">
      {site.mapsKey && (
        <div className="mb-4">
          <MapFacade src={src} alt={`Route map of ${tour.title}: ${stops.map((s) => s.label).join(" → ")}`} label="Show road route">
            <TourRouteMap stops={stops} />
          </MapFacade>
        </div>
      )}
      <ol className="grid gap-1.5 text-sm">
        {stops.map((s, i) => (
          <li key={`${s.key}-${i}`} className="flex items-center gap-2.5">
            <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full text-[11px] font-bold text-white" style={{ background: s.color }}>{stopLabel(i)}</span>
            {s.href ? <Link href={s.href} className="link truncate">{s.label}</Link> : <span className="truncate text-slate-800">{s.label}</span>}
            <span className="ml-auto flex-none text-[11px] text-slate-600">Day {s.day}</span>
          </li>
        ))}
      </ol>
    </Panel>
  );
}
