"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type SlideImage = { src: string; alt: string; blurDataURL: string; credit?: string };

/** Scroll-snap slider: swipe on touch, arrows + dots on desktop. Only the first slide is preloaded. */
export function ImageSlider({ images, sizes, preloadFirst, className = "aspect-[16/10]" }: { images: SlideImage[]; sizes: string; preloadFirst?: boolean; className?: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const go = (i: number) => {
    const el = track.current;
    if (!el) return;
    const n = (i + images.length) % images.length;
    el.scrollTo({ left: n * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className={`group relative overflow-hidden rounded-2xl bg-forest-100 ${className}`} role="region" aria-roledescription="carousel" aria-label="Photo gallery">
      <div
        ref={track}
        onScroll={(e) => setIndex(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
        className="no-scrollbar flex h-full snap-x snap-mandatory overflow-x-auto scroll-smooth"
      >
        {images.map((img, i) => (
          <figure key={img.src} className="relative h-full w-full flex-none snap-center" aria-roledescription="slide" aria-label={`${i + 1} of ${images.length}`}>
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes={sizes}
              quality={75}
              placeholder="blur"
              blurDataURL={img.blurDataURL}
              className="object-cover"
              {...(i === 0 && preloadFirst ? { preload: true, fetchPriority: "high" as const } : { loading: "lazy" as const })}
            />
            {img.credit && <figcaption className="absolute bottom-2 right-2 max-w-[70%] truncate rounded bg-black/45 px-2 py-0.5 text-[10px] text-white/90">{img.credit}</figcaption>}
          </figure>
        ))}
      </div>
      {images.length > 1 && (
        <>
          <button type="button" onClick={() => go(index - 1)} aria-label="Previous photo" className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/90 p-2 text-forest-900 shadow transition hover:bg-white sm:block">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => go(index + 1)} aria-label="Next photo" className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/90 p-2 text-forest-900 shadow transition hover:bg-white sm:block">
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-0.5">
            {images.map((img, i) => (
              <button key={img.src} type="button" onClick={() => go(i)} aria-label={`Show photo ${i + 1}`} aria-current={i === index} className="flex h-6 min-w-6 items-center justify-center">
                <span className={`block h-2 rounded-full transition-all ${i === index ? "w-6 bg-white" : "w-2 bg-white/70"}`} />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
