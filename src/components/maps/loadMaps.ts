"use client";

import { site } from "@/data/site";

// Google Maps JS ships its own global types; we avoid adding @types/google.maps.
export type Gmaps = any;

let loading: Promise<Gmaps> | null = null;

/** Loads Maps JavaScript once (only after a user taps a map) and resolves with `google.maps`. */
export function loadMaps(): Promise<Gmaps> {
  if (loading) return loading;
  loading = new Promise((resolve, reject) => {
    const w = window as any;
    if (w.google?.maps?.importLibrary) return resolve(w.google.maps);
    w.__ntMapsReady = () => resolve(w.google.maps);
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(site.mapsKey)}&v=weekly&loading=async&callback=__ntMapsReady`;
    s.async = true;
    s.onerror = () => {
      loading = null;
      reject(new Error("Google Maps failed to load"));
    };
    document.head.appendChild(s);
  });
  return loading;
}
