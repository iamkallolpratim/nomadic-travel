"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { site } from "@/data/site";
import type { RouteStop } from "@/lib/content";
import { loadMaps } from "./loadMaps";
import { stopLabel } from "./staticMap";

type Status = { kind: "loading" } | { kind: "ready"; km?: number; hours?: number; approx?: boolean } | { kind: "error" };

/** Interactive itinerary map: numbered stops (tap → place page) and the live driving route from Google's Routes library. */
export function TourRouteMap({ stops }: { stops: RouteStop[] }) {
  const el = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>({ kind: "loading" });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const gm = await loadMaps();
        const [{ Map, Polyline }, { AdvancedMarkerElement, PinElement }] = await Promise.all([gm.importLibrary("maps"), gm.importLibrary("marker")]);
        if (cancelled || !el.current) return;
        const map = new Map(el.current, { mapId: site.mapId, disableDefaultUI: true, zoomControl: true, fullscreenControl: true, gestureHandling: "cooperative" });
        const bounds = new gm.LatLngBounds();
        stops.forEach((s, i) => {
          const pin = new PinElement({ glyphText: stopLabel(i), background: s.color, borderColor: "#ffffff", glyphColor: "#ffffff" });
          const marker = new AdvancedMarkerElement({ map, position: { lat: s.lat, lng: s.lng }, title: `${stopLabel(i)}. ${s.label} (day ${s.day})`, content: pin.element, gmpClickable: true });
          if (s.href) marker.addListener("click", () => (window.location.href = s.href!));
          bounds.extend({ lat: s.lat, lng: s.lng });
        });
        map.fitBounds(bounds, 40);

        try {
          const { Route } = await gm.importLibrary("routes");
          const pts = stops.map((s) => ({ lat: s.lat, lng: s.lng }));
          const { routes } = await Route.computeRoutes({
            origin: pts[0],
            destination: pts[pts.length - 1],
            intermediates: pts.slice(1, -1),
            travelMode: "DRIVING",
            fields: ["path", "distanceMeters", "durationMillis"],
          });
          if (cancelled || !routes?.length) throw new Error("no route");
          routes[0].createPolylines().forEach((p: { setMap: (m: unknown) => void; setOptions?: (o: object) => void }) => {
            p.setOptions?.({ strokeColor: "#1b4e33", strokeOpacity: 0.85, strokeWeight: 4 });
            p.setMap(map);
          });
          setStatus({ kind: "ready", km: Math.round(routes[0].distanceMeters / 1000), hours: Math.round(routes[0].durationMillis / 360000) / 10 });
        } catch {
          // Remote passes (e.g. Bum La) may not be routable; fall back to a dashed line between stops.
          new Polyline({ map, path: stops.map((s) => ({ lat: s.lat, lng: s.lng })), geodesic: true, strokeOpacity: 0, icons: [{ icon: { path: "M 0,-1 0,1", strokeOpacity: 0.8, strokeColor: "#1b4e33", scale: 3 }, offset: "0", repeat: "14px" }] });
          if (!cancelled) setStatus({ kind: "ready", approx: true });
        }
      } catch {
        if (!cancelled) setStatus({ kind: "error" });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [stops]);

  return (
    <>
      <div ref={el} className="absolute inset-0" role="region" aria-label="Interactive tour route map" />
      <p className="absolute left-2 top-2 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-forest-900 shadow" aria-live="polite">
        {status.kind === "loading" && <span className="inline-flex items-center gap-1"><Loader2 className="h-3 w-3 animate-spin" aria-hidden />Loading route…</span>}
        {status.kind === "ready" && (status.approx ? "Straight-line overview" : `≈ ${status.km?.toLocaleString("en-IN")} km · ${status.hours} h driving`)}
        {status.kind === "error" && "Map unavailable — see the stop list below"}
      </p>
    </>
  );
}
