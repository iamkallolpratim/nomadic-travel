import Image from "next/image";
import { getImage } from "@/lib/content";

interface Props {
  file?: string;
  sizes: string;
  className?: string;
  /** Use only for the LCP hero image on a page */
  preload?: boolean;
  fill?: boolean;
  alt?: string;
  quality?: 60 | 75;
}

/** next/image wrapper that pulls dimensions, alt text and blur placeholder from the image manifest. */
export function Img({ file, sizes, className, preload, fill = true, alt, quality = 60 }: Props) {
  const meta = file ? getImage(file) : undefined;
  if (!meta) return <div className={`bg-gradient-to-br from-forest-200 to-mist-200 ${className ?? ""}`} aria-hidden />;
  const text = alt ?? meta.alt;
  const common = {
    src: `/images/${meta.file}`,
    sizes,
    quality,
    placeholder: "blur" as const,
    blurDataURL: meta.blurDataURL,
    className,
    ...(preload ? { preload: true, fetchPriority: "high" as const } : {}),
  };
  return fill ? <Image {...common} alt={text} fill /> : <Image {...common} alt={text} width={meta.width} height={meta.height} />;
}
