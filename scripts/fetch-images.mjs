// Downloads the reviewed Wikimedia Commons picks (scripts/image-picks.json),
// converts them to WebP with SEO-friendly filenames in public/images, and writes
// src/data/images.generated.json with dimensions, blur placeholders, alt text and
// licence/author/source credits.
//
// Usage: npm run images:fetch   (requires scripts/.cache/candidates.json from commons-candidates.mjs)
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const UA = "NomadicTravelSiteBuilder/1.0 (contact@nomadictravel.co.in)";
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const OUT_DIR = path.join(ROOT, "public/images");
const MANIFEST = path.join(ROOT, "src/data/images.generated.json");
const candidates = JSON.parse(await fs.readFile(path.join(ROOT, "scripts/.cache/candidates.json"), "utf8"));
const picks = JSON.parse(await fs.readFile(path.join(ROOT, "scripts/image-picks.json"), "utf8"));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let manifest = { files: {}, entities: {} };
try { manifest = JSON.parse(await fs.readFile(MANIFEST, "utf8")); } catch {}
await fs.mkdir(OUT_DIR, { recursive: true });

async function download(url) {
  for (let i = 0; i < 5; i++) {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (res.ok) return Buffer.from(await res.arrayBuffer());
    await sleep(2000 * (i + 1));
  }
  throw new Error(`Failed ${url}`);
}

// Pass 1: real picks
for (const [key, list] of Object.entries(picks)) {
  const slug = key.split(":")[1];
  manifest.entities[key] = [];
  for (const pick of list) {
    if (typeof pick[0] === "string") continue;
    const [idx, descriptor, alt] = pick;
    const c = candidates[key]?.[idx];
    if (!c) throw new Error(`No candidate ${key}#${idx}`);
    const file = `${slug}-${descriptor}.webp`;
    if (!manifest.files[file]) {
      const dest = path.join(OUT_DIR, file);
      const existing = await fs.readFile(dest).catch(() => null);
      const buf = existing ?? (await download(c.thumb));
      const img = sharp(buf).rotate().resize({ width: 1400, withoutEnlargement: true });
      const { data, info } = await img.webp({ quality: 66 }).toBuffer({ resolveWithObject: true });
      await fs.writeFile(path.join(OUT_DIR, file), data);
      const blur = await sharp(data).resize(16).webp({ quality: 40 }).toBuffer();
      manifest.files[file] = {
        file, width: info.width, height: info.height, alt,
        blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
        author: c.author.slice(0, 120), license: c.license, licenseUrl: c.licenseUrl,
        sourceUrl: c.page, title: c.title.replace(/^File:/, ""),
      };
      console.log("saved", file, info.width, "x", info.height);
      if (!existing) await sleep(250);
    } else {
      manifest.files[file].alt = alt;
    }
    manifest.entities[key].push(file);
  }
}
// Pass 2: references ("@entityKey#n" reuses the image picked from that entity's candidate n)
for (const [key, list] of Object.entries(picks)) {
  let pos = 0;
  for (const pick of list) {
    if (typeof pick[0] !== "string") { pos++; continue; }
    const [, refKey, n] = pick[0].match(/^@(.+)#(\d+)$/);
    const src = candidates[refKey]?.[+n]?.page;
    const file = Object.values(manifest.files).find((f) => f.sourceUrl === src)?.file;
    if (!file) throw new Error(`Bad ref ${pick[0]}`);
    manifest.entities[key].splice(pos++, 0, file);
  }
}
await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 1));
console.log("files:", Object.keys(manifest.files).length);
