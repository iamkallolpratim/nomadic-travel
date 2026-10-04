"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { loadMaps, type Gmaps } from "./loadMaps";

export type ExplorerPlace = { slug: string; name: string; category: string; state: string; stateName: string; color: string; lat: number; lng: number; href: string };

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** All places as state-coloured pins with an info card; state chips filter the pins. */
export function PlacesExplorerMap({ places, states }: { places: ExplorerPlace[]; states: { slug: string; name: string; color: string }[] }) {
  const el = useRef<HTMLDivElement>(null);
  const markers = useRef<{ state: string; marker: Gmaps }[]>([]);
  const mapRef = useRef<Gmaps>(null);
  const [filter, setFilter] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const gm = await loadMaps();
        const [{ Map, InfoWindow }, { AdvancedMarkerElement, PinElement }] = await Promise.all([gm.importLibrary("maps"), gm.importLibrary("marker")]);
        if (cancelled || !el.current) return;
        const map = new Map(el.current, { mapId: site.mapId, disableDefaultUI: true, zoomControl: true, fullscreenControl: true, gestureHandling: "cooperative" });
        mapRef.current = map;
        const info = new InfoWindow();
        const bounds = new gm.LatLngBounds();
        markers.current = places.map((p) => {
          const pin = new PinElement({ background: p.color, borderColor: "#ffffff", glyphColor: "#ffffff", scale: 0.9 });
          const marker = new AdvancedMarkerElement({ map, position: { lat: p.lat, lng: p.lng }, title: p.name, content: pin.element, gmpClickable: true });
          marker.addListener("click", () => {
            info.setContent(`<div style="font:13px/1.4 system-ui;max-width:200px"><div style="font-size:11px;color:#475569">${esc(p.category)} · ${esc(p.stateName)}</div><strong>${esc(p.name)}</strong><br><a href="${p.href}" style="color:#1b4e33;font-weight:600">View place →</a></div>`);
            info.open({ map, anchor: marker });
          });
          bounds.extend({ lat: p.lat, lng: p.lng });
          return { state: p.state, marker };
        });
        map.fitBounds(bounds, 30);
      } catch {
        if (!cancelled) setError(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [places]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    markers.current.forEach(({ state, marker }) => (marker.map = !filter || state === filter ? map : null));
  }, [filter]);

  return (
    <>
      <div ref={el} className="absolute inset-0" role="region" aria-label="Interactive map of places in Northeast India" />
      {error && <p className="absolute inset-x-4 top-4 rounded-xl bg-white p-3 text-center text-xs text-slate-700 shadow">Map unavailable — use the list below.</p>}
      <div className="no-scrollbar absolute inset-x-2 top-2 flex gap-1.5 overflow-x-auto">
        {[{ slug: "", name: "All", color: "#1b4e33" }, ...states].map((s) => (
          <button key={s.slug} type="button" aria-pressed={filter === s.slug} onClick={() => setFilter(s.slug)} className={`whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-semibold shadow ${filter === s.slug ? "text-white" : "bg-white/95 text-forest-900"}`} style={filter === s.slug ? { background: s.color } : undefined}>
            {s.name}
          </button>
        ))}
      </div>
    </>
  );
}
