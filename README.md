# Nomadic Travel — Northeast India Tours

Website for **Nomadic Travel** (Guwahati) — tour packages, places and activities across **Assam, Arunachal Pradesh, Meghalaya and Nagaland**, with native booking, WhatsApp lead capture and SEO built in.

- **Framework:** Next.js 16 (App Router) · React 19 · TypeScript
- **Styling / icons:** Tailwind CSS 3 · lucide-react (single icon map in `src/lib/icons.ts`)
- **Hosting:** Vercel
- **Data layer:** typed TS/JSON files in `src/data` (no CMS, no database)
- **Design:** minimal link-in-bio layout — one narrow centred column, stacked link buttons on the home page, a back-arrow top bar on inner pages, white rounded panels on a faint mountain-pattern background (`src/components/ui/Minimal.tsx`)
- **Leads:** `/api/lead` route handler → Google Apps Script → Google Sheet + email

> **Migration note.** This repo was previously a Vite + React Router SPA. It was migrated to Next.js (same Tailwind, lucide-react, TypeScript and Vercel hosting) because static generation, per-page metadata, server-side form handling and image optimisation were required for SEO. Old `/packages` URLs 301-redirect to the new routes (see [Redirects](#redirects)).

---

## Contents

1. [Quick start](#quick-start)
2. [Project structure](#project-structure)
3. [Editing content](#editing-content)
4. [Images & credits](#images--credits)
5. [Booking, leads & Google Apps Script](#booking-leads--google-apps-script)
6. [WhatsApp integration](#whatsapp-integration)
7. [SEO](#seo)
7b. [Google Maps](#google-maps)
8. [Redirects](#redirects)
9. [SEO / local launch checklist](#seo--local-launch-checklist)
10. [Test checklist](#test-checklist)
11. [Dependencies & PR notes](#dependencies--pr-notes)
12. [Things to verify before launch](#things-to-verify-before-launch)

---

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in values (see below)
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build (validates all content references)
npm run lint
```

| Variable | Scope | Purpose |
|---|---|---|
| `LEADS_ENDPOINT` | **server only** | Apps Script web-app URL (`…/exec`). Never exposed to the browser. |
| `LEADS_SECRET` | **server only** | Shared secret checked by `Code.gs`. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | public | WhatsApp number, digits only, e.g. `916000060220`. |
| `NEXT_PUBLIC_SITE_URL` | public | Canonical origin, e.g. `https://www.nomadictravel.co.in`. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | public | Search Console HTML-tag token (optional). |
| `NEXT_PUBLIC_GA_ID` | public | GA4 measurement ID (optional, lazy-loaded). |

Set the same variables in **Vercel → Project → Settings → Environment Variables** (Production + Preview).

---

## Project structure

```
src/
  app/
    page.tsx                         Home
    [statePage]/page.tsx             /assam-tour-packages, /arunachal-pradesh-tour-packages, …
    tours/page.tsx                   All tours + filters (state, duration, budget, activity)
    tours/[slug]/page.tsx            Tour detail (slider, itinerary, inclusions, booking, WhatsApp)
    places/[state]/[slug]/page.tsx   Place detail
    activities/…                     Activities index + detail
    travel-guide/…                   Blog index + articles
    about, contact, credits, not-found
    api/lead/route.ts                Lead endpoint (validation, honeypot, rate limit → Apps Script)
    */opengraph-image.tsx            Dynamic OG images for states, tours, places, activities, guides
    sitemap.ts, robots.ts
  components/                        cards, layout, lead (forms/WhatsApp), ui, seo
  data/
    site.ts                          NAP, socials, price toggle
    states.ts                        4 state landing pages (intro, seasons, how to reach, permits, FAQs…)
    places/<state>.ts                61 places
    activities/<state>.ts            42 activities
    tours.ts                         19 tours (incl. combo tours tagged with several states)
    guides.ts                        8 travel guides
    testimonials.ts                  genuine reviews only (empty by default)
    images.generated.json            image manifest: size, alt, blur, author, licence, source
  lib/
    content.ts                       joins data + images, helpers, build-time integrity checks
    icons.ts                         single icon mapping config
    lead.ts                          shared lead validation, Lead ID, wa.me builder
    schema.ts, seo.ts, og.tsx        JSON-LD builders, metadata helper, OG renderer
apps-script/Code.gs                  Google Apps Script (Sheet + email)
scripts/                             image sourcing pipeline (Wikimedia Commons)
docs/keyword-map.md                  one primary keyword per page
```

All indexable pages are **statically generated** (`generateStaticParams`, `dynamicParams = false`). Only `/api/lead` is dynamic.

---

## Editing content

Each entity is a typed object — the TypeScript types in `src/types/index.ts` document every field.

- **Place:** `src/data/places/<state>.ts` — name, slug, state, district, nearest town, 150–300-word description, best season, ideal duration, permit notes, altitude, how to reach, lat/lng, 3–5 FAQs, related activities, nearby places, and the sources the facts were checked against.
- **Activity:** `src/data/activities/<state>.ts` — same idea plus `difficulty` and `places`.
- **Tour:** `src/data/tours.ts` — `states` (one or more), nights/days, `priceFrom` (INR pp, twin sharing), itinerary days (each with an icon key, places, overnight, meals, drive time), inclusions (with icon keys), exclusions, FAQs, `featured`, `legacyIds`.
- **Guide:** `src/data/guides.ts` — body blocks (`h2`, `p`, `ul`, `ol`, `tip`). Inline `[anchor text](/internal/url)` and `**bold**` are supported.

**`npm run build` fails** if any slug referenced by a place, activity, tour or guide (including inline guide links) does not exist, if a tour's itinerary length ≠ `days`, or if an entity has no images. This keeps internal linking intact.

Icons: use any key from `src/lib/icons.ts` (e.g. `safari`, `trekking`, `rafting`, `camping`, `monastery`, `tea`, `birdwatching`, `festival`, `food`, `waterfall`, `hotel`, `transport`). Add new keys there only.

**Prices.** The previous site had prices removed. Tours now carry an indicative `priceFrom` (used in the `Offer` schema). **Please confirm or edit every `priceFrom` in `src/data/tours.ts`.** To hide prices in the UI again, set `showPrices: false` in `src/data/site.ts`.

**Reviews.** `src/data/testimonials.ts` is intentionally empty. Add only genuine reviews (e.g. copied with permission from your Google Business Profile). The block, and any `Review`/`AggregateRating` markup, stays hidden until real entries exist.

---

## Images & credits

All 315 photos are real photos of the specific place/activity from **Wikimedia Commons**, limited to CC0, public domain, CC BY and CC BY-SA licences. They are stored locally in `public/images` as WebP with SEO-friendly names (e.g. `kaziranga-national-park-one-horned-rhino-grassland.webp`) and rendered with `next/image` (`sizes` set everywhere; only the page's hero image uses `preload` — the Next 16 replacement for the deprecated `priority` prop).

Every image's author, licence, licence URL and source page are in `src/data/images.generated.json` and listed on **`/credits`**; gallery slides also show an inline credit.

Pipeline (only needed when adding images):

```bash
node scripts/commons-candidates.mjs <keyFilter>   # search Commons, filter licences, build contact sheets in scripts/.cache
# review sheets, then add picks to scripts/image-picks.json:  [candidateIndex, "seo-descriptor", "alt text"]
npm run images:fetch                               # download → WebP → manifest (alt, blur, credits)
```

Your own photos (e.g. fleet vehicles) — credited "© Nomadic Travel":

```bash
node scripts/add-own-photo.mjs ~/Desktop/urbania.jpg car:force-urbania nomadic-travel-white "Nomadic Travel's Force Urbania" --replace
```

---

## Booking, leads & Google Apps Script

### Flow

```
Booking form / Contact form / WhatsApp quick-lead
        │  POST /api/lead  (JSON)
        ▼
Next.js route handler  ── same-origin check, rate limit, honeypot, server-side validation, Lead ID
        │  POST LEADS_ENDPOINT  { …lead, secret }
        ▼
Google Apps Script (Code.gs) ── verifies secret, dedupes by Lead ID, appends Sheet row,
        │                        emails contact@nomadictravel.co.in, optional auto-reply
        ▼
{ ok: true, leadId }  →  success screen with Lead ID + "Continue on WhatsApp"
```

- The Apps Script URL stays server-side (`LEADS_ENDPOINT`), never in the client bundle.
- Lead IDs look like `NT-261003-K7QX` (IST date + 4 chars).
- If a save fails, the lead is queued in the browser and retried in the background (and on the next visit) with the **same Lead ID**; the script ignores duplicates, so retries never create duplicate rows or emails.
- Honeypot: a hidden `website` field. Bots that fill it get a fake success and nothing is stored.
- The old Google Form iframe has been removed completely.

### Deploy the Apps Script (from contact@nomadictravel.co.in)

1. Sign in to Google **as contact@nomadictravel.co.in**.
2. Create a Google Sheet named **Nomadic Travel Leads** (Drive → New → Google Sheets).
3. In the sheet: **Extensions → Apps Script**. Delete the sample code and paste the contents of `apps-script/Code.gs`. Save (name the project "Nomadic Travel Leads").
4. **Project Settings (⚙) → Script properties → Add**:
   - `LEADS_SECRET` = a long random string (e.g. `openssl rand -hex 32`). **Required.**
   - `NOTIFY_EMAIL` = optional extra recipients (comma-separated). **contact@nomadictravel.co.in always receives every lead.**
   - `AUTO_REPLY` = `true` or `false` (customer confirmation email; default `true`)
   - `WHATSAPP_NUMBER` = `916000060220` (optional, used in the auto-reply)
   - `SHEET_ID` = only if the script is *not* bound to the sheet
5. In the editor choose the `setup` function → **Run**. Approve the permissions (Sheets + send email as you). This creates the header row:
   `Timestamp (IST) · Lead ID · Source · Name · Phone · Email · Tour · State · Travel Date · Adults · Children · Budget · Message · Page URL · Status`
6. **Deploy → New deployment → Select type: Web app**
   - Description: `v1`
   - Execute as: **Me (contact@nomadictravel.co.in)**
   - Who has access: **Anyone** (required so the server can call it; the secret protects it)
   - Deploy → copy the **Web app URL** (ends in `/exec`).
7. In Vercel (and `.env.local`), set `LEADS_ENDPOINT` to that URL and `LEADS_SECRET` to the same secret. Redeploy.
8. Smoke test:
   ```bash
   curl -s -X POST https://<your-domain>/api/lead -H 'Content-Type: application/json' \
     -d '{"source":"Booking","name":"Test Lead","phone":"+919000000000","email":"you@example.com","tour":"Test"}'
   ```
   Expect `{"ok":true,"leadId":"NT-…"}`, a new row with `Status = New`, and an email to contact@nomadictravel.co.in titled `Lead Enquiry — Test Lead (Booking, NT-…)`.

**Updating the script later:** edit → Deploy → *Manage deployments* → edit the existing deployment → *New version*. This keeps the same URL.

**Quotas:** consumer Gmail accounts can send ~100 emails/day via Apps Script; Google Workspace accounts ~1,500/day. Each lead sends up to two emails (team + auto-reply).

---

## WhatsApp integration

- Floating WhatsApp button on every page, a *Chat on WhatsApp* link on the home and contact pages, and **Book Now / Ask on WhatsApp** buttons on every tour card and every tour, place and activity page.
- Every click opens a quick-lead modal (name + phone with country code, optional date and guests). On submit it:
  1. POSTs to `/api/lead` with `source: "WhatsApp"` and page context → Sheet row + email;
  2. then opens `https://wa.me/<NEXT_PUBLIC_WHATSAPP_NUMBER>?text=…` prefilled with name, tour, date, guests and **Lead ID**.
- If the save fails, WhatsApp still opens and the save is retried in the background.
- After a booking-form submission, the success screen shows **Continue on WhatsApp** with the same Lead ID.

---

## Google Maps

> **Currently switched off.** The map components (`src/components/maps/`), route data (`src/data/cities.ts`, tour `start`/`end`/`towns`) and `routeStops()` remain in the code but are not used on any page, and the `/map` page was removed. To bring maps back: re-add `<RoutePanel tour={tour} />` on the tour page, recreate the `/map` page (using `MapFacade` + `PlacesExplorerMap`) and the contact/place map blocks (using `MapFacade` + `staticMapUrl`), then add the key as described below.

| Where | What | API |
|---|---|---|
| Every tour page → **Route map** | Numbered stops (start city → each day's places/towns → end city) as a static image + linked stop list; tap **Show road route** for an interactive map with the live driving route and total km/hours | Maps Static, Maps JavaScript, Routes |
| **`/map`** | All 61 places, pins coloured by state, info card links to each place; state filter chips; list by state below | Maps Static, Maps JavaScript |
| **`/contact`** | Office map; tap opens the embedded Google Map of the address | Maps Static, Maps Embed |
| Place pages → Quick facts | Small location map linking to Google Maps directions | Maps Static |

Maps JavaScript is downloaded only after a visitor taps a map (static image first), so page speed is unaffected and dynamic map loads are only billed when used. Nothing from Google is cached or proxied by the site; route lines are requested live in the browser. Without a key the site builds normally and shows only the stop lists and Google Maps links.

**Setup (Google Cloud console, ideally the contact@nomadictravel.co.in account):**
1. Create/select a project and attach billing (Google gives a monthly free usage allowance per API; set a **budget alert** under Billing → Budgets).
2. APIs & Services → Library → enable **Maps Static API, Maps JavaScript API, Maps Embed API, Routes API**.
3. Credentials → Create API key → *Application restrictions:* Websites — add `https://www.nomadictravel.co.in/*`, `https://nomadictravel.co.in/*`, `https://*.vercel.app/*`, `http://localhost:*/*`. *API restrictions:* the four APIs above.
4. Google Maps Platform → Map management → **Create Map ID** (type JavaScript, vector). Copy it.
5. Set `NEXT_PUBLIC_GOOGLE_MAPS_KEY` and `NEXT_PUBLIC_GOOGLE_MAP_ID` in Vercel and `.env.local`, then redeploy (they are inlined at build time).

Route data lives in `src/data/tours.ts` (`start`, `end`, and per-day `places` / optional `towns`) and `src/data/cities.ts`; the build fails if a tour references an unknown city.

---

## SEO

**Technical**
- Static HTML for every state, tour, place, activity and guide page (no client-only text).
- Per-page metadata via `generateMetadata`: unique title (≤ 60 chars), description (≤ 155), canonical, Open Graph + Twitter cards. Dynamic OG images (1200×630) for every state, tour, place, activity and guide; a default OG image elsewhere.
- `sitemap.xml` (all 140+ URLs with `lastModified`) and `robots.txt`.
- `<html lang="en-IN">`, Search Console verification meta (env), `next/font` (self-hosted Inter + Fraunces), optimised AVIF/WebP images, minimal client JS (forms, slider, filters, menus only).
- One `<h1>` per page, logical H2/H3, breadcrumbs on every inner page, custom 404 linking to the state pages.

**Structured data (JSON-LD)**
- `TravelAgency`/`LocalBusiness` (home, contact, about) with NAP, geo, `areaServed` (4 states), `sameAs`.
- `TouristTrip` + `Offer` (INR price, `InStock`) on tours; `TouristAttraction`/`Place` with geo on places; `TouristAttraction` on activities; `TouristDestination` + `ItemList` on state pages.
- `FAQPage` on home, state, tour, place, activity and guide pages; `BreadcrumbList` site-wide; `Article` on guides.
- `Review`/`AggregateRating` are **not** emitted (no genuine reviews yet).

**Content & linking**
- One primary keyword per page — see [`docs/keyword-map.md`](docs/keyword-map.md). Keywords appear in the H1, first paragraph, URL, alt text and meta.
- State pages ≈1,300–1,500 words of unique copy; places/activities/tours 300–600 words plus FAQs.
- Internal links: state → places, activities, tours; place → nearby places, activities, tours that include it; tour → every place in the itinerary; guides → tours and places with descriptive anchors; "Related tours" / "You may also like" blocks.

**Measured (local production build, Lighthouse 12, mobile, DevTools throttling):** Performance 96–99, Accessibility 100, Best Practices 100, SEO 100; LCP 1.6–2.2 s, CLS ≤ 0.003, TBT ≤ 90 ms across home, state, tour, place, contact and guide pages. Note: Lighthouse's default *simulated* throttling reports a higher LCP (~4 s) against `localhost` because of a known trace-simulation artefact; re-check on the deployed URL with PageSpeed Insights.

---

## Redirects

Configured in `next.config.ts` with HTTP **301**:

| Old URL | New URL |
|---|---|
| `/packages` | `/tours` |
| `/packages/classic-kaziranga` | `/tours/kaziranga-tour-package-3n4d` |
| `/packages/dehing-patkai-tour` | `/tours/upper-assam-rainforest-tour-4n5d` |
| `/packages/dibru-saikhowa-tour` | `/tours/upper-assam-rainforest-tour-4n5d` |
| `/packages/tawang-tour` | `/tours/tawang-tour-package-6n7d` |
| `/packages/nagaland-tour` | `/tours/nagaland-tour-package-5n6d` |
| `/packages/anini-tour` | `/tours/anini-dibang-valley-tour-6n7d` |
| `/packages/cherrapunji-tour` | `/tours/shillong-cherrapunji-tour-3n4d` |
| `/packages/shillong-tour` | `/tours/shillong-cherrapunji-tour-3n4d` |
| `/packages/meghalaya-tour` | `/tours/meghalaya-tour-package-4n5d` |
| `/packages/dawki-tour` | `/tours/meghalaya-root-bridge-dawki-adventure-3n4d` |
| `/packages/:other` | `/tours` |
| `/places/<state>` | state landing page |
| `/assam`, `/meghalaya`, `/nagaland`, `/arunachal`, `/arunachal-pradesh` | state landing pages |
| `/blog`, `/blog/:slug` | `/travel-guide`, `/travel-guide/:slug` |

`/about` and `/contact` keep their URLs.

---

## SEO / local launch checklist

**Before go-live**
- [ ] Confirm every `priceFrom` in `src/data/tours.ts` (or set `showPrices: false`).
- [ ] Set all env vars in Vercel; deploy the Apps Script and run the smoke test above.
- [ ] Point the domain to Vercel; make `NEXT_PUBLIC_SITE_URL` match the final host (www vs apex) and redirect the other host to it in Vercel → Domains.

**Google Search Console**
- [ ] Add a **Domain** property for `nomadictravel.co.in` (DNS TXT) — or a URL-prefix property and put the HTML-tag token in `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.
- [ ] Sitemaps → submit `https://www.nomadictravel.co.in/sitemap.xml`.
- [ ] URL Inspection → request indexing for home, the four state pages and the top tours.
- [ ] Check *Pages* and *Enhancements* (Breadcrumbs, FAQ) after a few days; check the old `/packages/...` URLs show as redirected.

**Google Business Profile** (from contact@nomadictravel.co.in)
- [ ] Create/claim at business.google.com: name **Nomadic Travel**, category **Travel agency** (+ Tour operator).
- [ ] Address exactly as on the site: *Patarkuchi Road, Basistha, Guwahati, Assam 781029*; phone **+91 60000 60220**; website; hours 9:00–20:00.
- [ ] Verify (postcard/phone/video), add photos, services (state tours), and the WhatsApp number.
- [ ] Ask happy guests for reviews; add genuine ones to `src/data/testimonials.ts`.
- [ ] Keep NAP identical everywhere (site footer, schema, GBP, social profiles, directories).

**GA4**
- [ ] analytics.google.com → create property (India / INR) → Web data stream for the domain → copy `G-XXXXXXX` into `NEXT_PUBLIC_GA_ID` → redeploy.
- [ ] Optional: in GA4 mark a `generate_lead` event as a key event (add `gtag('event','generate_lead')` in `BookingForm`/`WhatsAppProvider` success handlers if you want lead conversions in GA).
- [ ] Link GA4 with Search Console.

**After launch**
- [ ] Rich Results Test on one URL of each type (home, state, tour, place, activity, guide).
- [ ] PageSpeed Insights (mobile) on home, a state page and a tour page.
- [ ] Re-verify permit rules every few months (they change) and update `states.ts`.

---

## Test checklist

| # | Check | How | Expected |
|---|---|---|---|
| 1 | Booking creates a Sheet row | Submit the form on any tour page | Row with Source `Booking`, all fields, Status `New`; success screen shows Lead ID |
| 2 | Email arrives | Same submission | Email to contact@nomadictravel.co.in, subject `Lead Enquiry — {Name} ({Source}, {Lead ID})`; auto-reply to customer (if enabled) |
| 3 | Contact form | Submit on `/contact` | Row with Source `Contact` |
| 4 | WhatsApp click creates a row | Click any *WhatsApp* button, enter name + phone | Row with Source `WhatsApp`, tour & page URL; email subject shows `WhatsApp` |
| 5 | WhatsApp opens prefilled | Same | `wa.me/<number>` opens with name, tour, date, guests and Lead ID |
| 6 | Save failure still opens WhatsApp | Temporarily set a wrong `LEADS_ENDPOINT`, click WhatsApp | WhatsApp opens; lead is queued and saved (same Lead ID) once the endpoint works and the site is revisited |
| 7 | Honeypot blocks bots | `curl` with `"website":"x"` | `{"ok":true}` but **no** row/email |
| 8 | Validation | Submit with bad email/phone | Inline field errors, HTTP 422 |
| 9 | Duplicate retries | POST the same `leadId` twice | One row, one email |
| 10 | Redirects | `curl -I /packages/tawang-tour` | `301` → `/tours/tawang-tour-package-6n7d` |
| 11 | Rich Results Test | search.google.com/test/rich-results | Breadcrumb, FAQ valid; no errors on Organization/TouristTrip/Article |
| 12 | Lighthouse targets | PageSpeed Insights, mobile | SEO ≥ 95, Performance ≥ 95, LCP < 2.5 s, CLS < 0.1, INP < 200 ms |
| 13 | Sitemap & robots | `/sitemap.xml`, `/robots.txt` | All pages listed; `/api/` disallowed |
| 14 | 404 | Visit `/does-not-exist` | Custom 404 with state links |

Items 1, 4, 5, 6, 7, 8, 9 and 13 were verified locally against a mock Apps Script endpoint; items 2, 11 and 12 need the live deployment.

---

## Dependencies & PR notes

Framework migration (requested): `vite`, `@vitejs/plugin-react`, `react-router-dom` and the Vite ESLint plugins were replaced by `next`, `react@19`/`react-dom@19` (required by the App Router) and `eslint-config-next`. Tailwind CSS 3, lucide-react and TypeScript were kept (lucide-react bumped to 1.x for React 19 support).

One added runtime dependency:
- **`sharp`** — used by `next/image` for production image optimisation and by `src/lib/og.tsx` to convert WebP photos to JPEG for OG images (Satori cannot decode WebP), plus the image pipeline scripts.

No other packages were added; scroll animations are pure CSS (`animation-timeline: view()`), forms and filters use plain React.

---

## Things to verify before launch

Content was researched against state tourism sites, district (NIC) sites, Incredible India and Wikipedia, with sources listed on each place page. Items that change often and should be re-checked:

- **Permits:** Arunachal eILP fees/durations; Nagaland ILP (₹200 / 30 days domestic, ₹500 foreign at time of writing) and the Nagaland **PAP for foreigners** (reinstated Dec 2024; the state assembly asked for withdrawal in Sept 2026); Meghalaya's announced visitor-registration system (July 2026, not yet operational at time of writing).
- **Seasonal dates:** Kaziranga opening phases, Ziro Festival of Music dates, Cherry Blossom Festival dates, Torgya/Losar dates (lunar calendar).
- **Prices** (`priceFrom`) and inclusions for every tour.
- **Phone number display:** the old site linked `tel:+919876543210` while showing +91 6000060220; the new site uses **+91 6000060220** everywhere — confirm this is correct.
