import Image from "next/image";
import { Faqs } from "@/components/ui/Faqs";
import { LinkButton, LinkList, LinkRow } from "@/components/ui/Minimal";
import { Socials } from "@/components/layout/SiteFooter";
import { WhatsAppButton } from "@/components/lead/WhatsAppButton";
import { CarsPanel } from "@/components/cards/CarsPanel";
import { JsonLd } from "@/components/seo/JsonLd";
import { durationLabel, featuredTours, heroFor, placesIn, states, toursIn, tourUrl } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { organizationSchema, websiteSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Northeast India Tour Packages | Assam, Meghalaya & More",
  description:
    "Northeast India tour packages by Guwahati-based Nomadic Travel: Kaziranga safaris, Meghalaya root bridges, Tawang, Ziro and the Hornbill Festival. Free quotes.",
  path: "/",
});

const HOME_FAQS = [
  { q: "What is the best time to visit Northeast India?", a: "October to April suits most of the region: Kaziranga is open, Meghalaya's rivers are clear and mountain roads are stable. Tawang is best March–June and September–November; the Hornbill Festival is 1–10 December." },
  { q: "Do I need permits to travel in Northeast India?", a: "Indian citizens need an Inner Line Permit for Arunachal Pradesh and Nagaland, but not for Assam or Meghalaya. Foreign nationals need a Protected Area Permit for Arunachal and Nagaland. We assist with all permits." },
  { q: "How many days do I need for a Northeast India trip?", a: "A week covers Meghalaya and Kaziranga comfortably. Add 6–7 days for Tawang, or 5 days for Nagaland. Our tours range from 3 nights to 10 nights." },
  { q: "Where do your tours start?", a: "Most tours start in Guwahati. Upper Assam and eastern Arunachal tours start from Dibrugarh or Jorhat, and Nagaland tours from Dimapur." },
  { q: "Can you customise a tour package?", a: "Yes. Every itinerary can be adjusted for dates, hotels, pace and interests. Send us an enquiry or message us on WhatsApp." },
];

export default function HomePage() {
  return (
    <div className="col pb-6 pt-10 sm:pt-14">
      <JsonLd data={[organizationSchema(), websiteSchema()]} />

      <header className="text-center">
        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-[2rem] bg-white p-3 shadow-sm ring-1 ring-black/5">
          <Image src="/logo-header.png" alt="Nomadic Travel logo" width={180} height={81} className="h-auto w-full" preload />
        </div>
        <h1 className="mt-5">
          <span className="block font-display text-3xl text-forest-950">Nomadic Travel</span>
          <span className="mt-1.5 block font-sans text-sm font-medium text-slate-700">Northeast India Tour Packages</span>
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-600">
          Local experts from Guwahati — Kaziranga rhino safaris, Meghalaya&apos;s living root bridges, Tawang&apos;s monasteries and Nagaland&apos;s Hornbill Festival.
        </p>
        <Socials className="mt-3" />
      </header>

      <nav aria-label="Main links" className="mt-6 space-y-3">
        {states.map((s) => (
          <LinkButton
            key={s.slug}
            href={`/${s.pageSlug}`}
            label={`${s.name} Tour Packages`}
            sub={`${toursIn(s.slug).length} tours · ${placesIn(s.slug).length} places · ${s.tagline}`}
            image={heroFor(s.heroImage)}
            accent={s.accent.bg}
          />
        ))}
        <LinkButton href="/tours" label="All Tour Packages" sub="Filter by state, days & activity" icon="map" />
        <LinkButton href="/tours/hornbill-festival-tour-4n5d" label="Hornbill Festival 2026" sub="1–10 December · Kohima, Nagaland" icon="festival" />
        <LinkButton href="/activities" label="Activities & Experiences" sub="Safaris, treks, rafting, festivals" icon="guide" />
        <LinkButton href="/travel-guide" label="Travel Guides" sub="Permits, seasons & itineraries" icon="history" />
        <LinkButton href="/#cars" label="Available Cars" sub="Sedans, MUVs & tempo travellers" icon="transport" />
        <LinkButton href="/contact" label="Get a Free Quote" sub="Itinerary & quote within 24 hours" icon="permit" />
        <WhatsAppButton label="Chat on WhatsApp" className="btn-whatsapp w-full rounded-2xl py-3.5 text-[13px] uppercase tracking-[0.08em]" />
        <LinkButton href="/about" label="About Us" sub="Founded by travel creator Zeemi" icon="love" />
      </nav>

      <section aria-labelledby="popular-h" className="panel mt-8">
        <h2 id="popular-h" className="panel-title">Popular tours</h2>
        <LinkList>
          {featuredTours().map((t) => (
            <LinkRow key={t.slug} href={tourUrl(t)} title={t.title.split(":")[0]} meta={`${durationLabel(t)} · ${t.startCity} → ${t.endCity}`} image={t.images[0]} />
          ))}
        </LinkList>
      </section>

      <div className="mt-4"><CarsPanel /></div>

      <div className="mt-4"><Faqs faqs={HOME_FAQS} title="Northeast India travel FAQs" compact /></div>
    </div>
  );
}
