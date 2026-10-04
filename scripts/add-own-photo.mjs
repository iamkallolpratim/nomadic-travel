// Adds one of Nomadic Travel's own photos to the image manifest (credited to Nomadic Travel).
// Usage: node scripts/add-own-photo.mjs <source.jpg> <entityKey> <seo-descriptor> "<alt text>" [--replace]
//   e.g. node scripts/add-own-photo.mjs ~/Desktop/innova.jpg car:innova-crysta nomadic-travel-fleet "Our Innova Crysta" --replace
// --replace : make this the entity's only photo.  --append : add after the existing photos.  Default: insert first.
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const [src, key, descriptor, alt, flag] = process.argv.slice(2);
if (!src || !key || !descriptor || !alt) {
  console.error('Usage: node scripts/add-own-photo.mjs <source> <entityKey> <descriptor> "<alt>" [--replace|--append]');
  process.exit(1);
}
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const MANIFEST = path.join(ROOT, "src/data/images.generated.json");
const manifest = JSON.parse(await fs.readFile(MANIFEST, "utf8"));
const file = `${key.split(":")[1]}-${descriptor}.webp`;

const { data, info } = await sharp(src).rotate().resize({ width: 1400, withoutEnlargement: true }).webp({ quality: 72 }).toBuffer({ resolveWithObject: true });
await fs.writeFile(path.join(ROOT, "public/images", file), data);
const blur = await sharp(data).resize(16).webp({ quality: 40 }).toBuffer();
manifest.files[file] = {
  file, width: info.width, height: info.height, alt,
  blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
  author: "Nomadic Travel", license: "© Nomadic Travel, all rights reserved", licenseUrl: "", sourceUrl: "", title: file,
};
const current = (manifest.entities[key] ?? []).filter((f) => f !== file);
manifest.entities[key] = flag === "--replace" ? [file] : flag === "--append" ? [...current, file] : [file, ...current];
await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 1));
console.log(`saved ${file} ${info.width}x${info.height} → ${key}: ${manifest.entities[key].join(", ")}`);
