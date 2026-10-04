// Searches Wikimedia Commons for each entity in image-queries.json, keeps only
// freely reusable licences (CC0, PD, CC BY, CC BY-SA), and writes candidates +
// labelled contact sheets to scripts/.cache for manual review.
//
// Usage: node scripts/commons-candidates.mjs [keyFilter]
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import crypto from "node:crypto";

const UA = "NomadicTravelSiteBuilder/1.0 (contact@nomadictravel.co.in)";
const ROOT = path.dirname(new URL(import.meta.url).pathname);
const CACHE = path.join(ROOT, ".cache");
const queries = JSON.parse(await fs.readFile(path.join(ROOT, "image-queries.json"), "utf8"));
const filter = process.argv[2];
const OK_LICENSE = /^(CC0|Public domain|PD|CC BY(-SA)? [1-4]\.0|CC BY(-SA)? 2\.5|CC BY(-SA)?$)/i;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const strip = (s = "") => s.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

async function search(q) {
  const u = new URL("https://commons.wikimedia.org/w/api.php");
  Object.entries({
    action: "query", format: "json", generator: "search", gsrsearch: `${q} filetype:bitmap`,
    gsrnamespace: "6", gsrlimit: "12", prop: "imageinfo", iiprop: "url|size|mime|extmetadata",
    iiurlwidth: "1600", iiextmetadatafilter: "Artist|LicenseShortName|LicenseUrl|ImageDescription|Credit",
  }).forEach(([k, v]) => u.searchParams.set(k, v));
  for (let i = 0; i < 4; i++) {
    const res = await fetch(u, { headers: { "User-Agent": UA } });
    if (res.ok) return (await res.json()).query?.pages ?? {};
    await sleep(2000 * (i + 1));
  }
  return {};
}

async function thumb(url) {
  const file = path.join(CACHE, "thumbs", crypto.createHash("sha1").update(url).digest("hex") + ".jpg");
  try { return await fs.readFile(file); } catch {}
  const small = url.replace(/\/\d+px-/, "/330px-");
  for (let i = 0; i < 4; i++) {
    const res = await fetch(small, { headers: { "User-Agent": UA } });
    if (res.ok) {
      const buf = await sharp(Buffer.from(await res.arrayBuffer())).resize(240, 160, { fit: "cover" }).jpeg().toBuffer();
      await fs.writeFile(file, buf);
      return buf;
    }
    await sleep(1500 * (i + 1));
  }
  return sharp({ create: { width: 240, height: 160, channels: 3, background: "#ccc" } }).jpeg().toBuffer();
}

await fs.mkdir(path.join(CACHE, "thumbs"), { recursive: true });
const outFile = path.join(CACHE, "candidates.json");
let all = {};
try { all = JSON.parse(await fs.readFile(outFile, "utf8")); } catch {}

for (const [key, qs] of Object.entries(queries)) {
  if (filter && !key.includes(filter)) continue;
  if (all[key] && !filter) continue;
  const seen = new Map();
  for (const q of qs) {
    const pages = await search(q);
    for (const p of Object.values(pages)) {
      const ii = p.imageinfo?.[0];
      if (!ii || seen.has(p.title)) continue;
      const m = ii.extmetadata ?? {};
      const license = strip(m.LicenseShortName?.value);
      if (!OK_LICENSE.test(license)) continue;
      if (!/jpeg|png|webp/.test(ii.mime)) continue;
      if (ii.width < (process.env.MINW ? +process.env.MINW : 1000) || ii.width / ii.height < (process.env.MINR ? +process.env.MINR : 1.05)) continue;
      seen.set(p.title, {
        title: p.title, width: ii.width, height: ii.height, thumb: ii.thumburl,
        page: ii.descriptionurl, license, licenseUrl: m.LicenseUrl?.value ?? "",
        author: strip(m.Artist?.value) || "Unknown", description: strip(m.ImageDescription?.value).slice(0, 200),
        rank: p.index ?? 99,
      });
    }
    await sleep(300);
  }
  all[key] = [...seen.values()].slice(0, 10);
  console.log(key, all[key].length);
  await fs.writeFile(outFile, JSON.stringify(all, null, 2));
}

// Contact sheets: 10 entities per sheet, up to 10 thumbs per row, labelled.
const keys = Object.keys(all).filter((k) => !filter || k.includes(filter));
for (let s = 0; s * 10 < keys.length; s++) {
  const chunk = keys.slice(s * 10, s * 10 + 10);
  const W = 260 * 10 + 20, H = chunk.length * 200 + 10;
  const comps = [];
  for (const [r, key] of chunk.entries()) {
    const y = r * 200 + 10;
    comps.push({ input: Buffer.from(`<svg width="${W}" height="30"><text x="10" y="20" font-size="18" font-family="Arial" font-weight="bold">${key}</text></svg>`), top: y, left: 0 });
    for (const [c, cand] of all[key].entries()) {
      comps.push({ input: await thumb(cand.thumb), top: y + 26, left: 10 + c * 260 });
      comps.push({ input: Buffer.from(`<svg width="40" height="26"><rect width="40" height="26" fill="black"/><text x="8" y="19" font-size="18" fill="yellow" font-family="Arial">${c}</text></svg>`), top: y + 26, left: 10 + c * 260 });
    }
  }
  await sharp({ create: { width: W, height: H, channels: 3, background: "#fff" } })
    .composite(comps).jpeg({ quality: 70 }).toFile(path.join(CACHE, `sheet-${filter ?? "all"}-${s}.jpg`));
}
console.log("done");
