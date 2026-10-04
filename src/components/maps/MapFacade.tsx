"use client";

import { useState, type ReactNode } from "react";
import { Map as MapIcon } from "lucide-react";

/**
 * Shows a Maps Static API image (no JavaScript). Tapping swaps in the interactive map,
 * so Maps JavaScript is only downloaded — and billed — when someone actually wants it.
 */
export function MapFacade({ src, alt, children, label = "Show interactive map", aspect = "aspect-[16/10]", eager }: { src: string; alt: string; children: ReactNode; label?: string; aspect?: string; eager?: boolean }) {
  const [active, setActive] = useState(false);
  if (active) return <div className={`relative overflow-hidden rounded-2xl bg-forest-50 ${aspect}`}>{children}</div>;
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-forest-50 ${aspect}`}>
      {/* Static map images are served directly by Google (their terms don't allow us to proxy/cache them via next/image). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : "auto"} decoding="async" width={640} height={400} className="h-full w-full object-cover" />
      <button type="button" onClick={() => setActive(true)} className="btn absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/95 px-4 py-2 text-xs text-forest-900 shadow-md ring-1 ring-black/5 hover:bg-white">
        <MapIcon className="h-4 w-4" aria-hidden /> {label}
      </button>
    </div>
  );
}
