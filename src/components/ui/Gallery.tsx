import { getImage } from "@/lib/content";
import { ImageSlider, type SlideImage } from "./ImageSlider";

/** Server wrapper: resolves manifest entries into slider props (keeps the manifest out of the client bundle). */
export function Gallery({ files, sizes, preloadFirst, className }: { files: string[]; sizes: string; preloadFirst?: boolean; className?: string }) {
  const images: SlideImage[] = files.flatMap((f) => {
    const m = getImage(f);
    return m ? [{ src: `/images/${m.file}`, alt: m.alt, blurDataURL: m.blurDataURL, credit: `© ${m.author} · ${m.license}` }] : [];
  });
  return <ImageSlider images={images} sizes={sizes} preloadFirst={preloadFirst} className={className} />;
}
