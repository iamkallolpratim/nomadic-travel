import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

export const OG_SIZE = { width: 1200, height: 630 };

/** Satori can't decode WebP, so the photo is converted to a JPEG data URL first. */
async function photo(file?: string) {
  if (!file) return null;
  try {
    const buf = await readFile(path.join(process.cwd(), "public/images", file));
    const jpg = await sharp(buf).resize(1200, 630, { fit: "cover" }).jpeg({ quality: 78 }).toBuffer();
    return `data:image/jpeg;base64,${jpg.toString("base64")}`;
  } catch {
    return null;
  }
}

export async function renderOg({ title, eyebrow, meta, file, accent = "#2f7a50" }: { title: string; eyebrow: string; meta?: string; file?: string; accent?: string }) {
  const bg = await photo(file);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#0f2c1d", fontFamily: "sans-serif" }}>
        {/* Satori (next/og) renders plain <img>; next/image is not available here. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {bg && <img src={bg} width={1200} height={630} style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, objectFit: "cover" }} alt="" />}
        <div style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, display: "flex", backgroundImage: "linear-gradient(90deg, rgba(8,26,17,0.92) 0%, rgba(8,26,17,0.62) 55%, rgba(8,26,17,0.2) 100%)" }} />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "64px 72px", width: "100%" }}>
          <div style={{ display: "flex", width: 90, height: 8, borderRadius: 4, background: accent, marginBottom: 24 }} />
          <div style={{ display: "flex", color: "#fcb84d", fontSize: 28, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>{eyebrow}</div>
          <div style={{ display: "flex", color: "white", fontSize: title.length > 48 ? 56 : 68, fontWeight: 800, lineHeight: 1.08, marginTop: 14, maxWidth: 980 }}>{title}</div>
          {meta && <div style={{ display: "flex", color: "rgba(255,255,255,0.88)", fontSize: 30, marginTop: 20 }}>{meta}</div>}
          <div style={{ display: "flex", color: "white", fontSize: 26, marginTop: 36, opacity: 0.9 }}>Nomadic Travel · nomadictravel.co.in</div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
