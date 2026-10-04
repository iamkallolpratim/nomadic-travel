import { absoluteUrl, site } from "@/data/site";
import { states } from "@/data/states";
import type { Activity, Faq, Guide, Place, Tour } from "@/types";

type Json = Record<string, unknown>;
const img = (file?: string) => (file ? absoluteUrl(`/images/${file}`) : absoluteUrl("/logo.png"));

export const ORG_ID = `${site.url}/#organization`;

export function organizationSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": ["TravelAgency", "LocalBusiness"],
    "@id": ORG_ID,
    name: site.name,
    url: site.url,
    logo: absoluteUrl("/logo.png"),
    image: absoluteUrl("/logo.png"),
    description: site.description,
    email: site.email,
    telephone: site.phoneE164,
    foundingDate: String(site.foundingYear),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    hasMap: site.googleMapsUrl,
    areaServed: states.map((s) => ({ "@type": "State", name: s.name, containedInPlace: { "@type": "Country", name: "India" } })),
    sameAs: site.sameAs,
    contactPoint: [
      { "@type": "ContactPoint", telephone: site.phoneE164, contactType: "reservations", email: site.email, areaServed: "IN", availableLanguage: ["English", "Hindi", "Assamese"] },
    ],
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "09:00", closes: "20:00" },
    ],
  };
}

export function websiteSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    inLanguage: "en-IN",
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absoluteUrl(it.href) })),
  };
}

export function faqSchema(faqs: Faq[]): Json | null {
  if (!faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function tourSchema(t: Tour, url: string, places: Place[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": `${absoluteUrl(url)}#trip`,
    name: t.title,
    description: t.summary,
    url: absoluteUrl(url),
    image: t.images.slice(0, 4).map(img),
    touristType: ["Leisure", "Adventure", "Cultural"],
    provider: { "@id": ORG_ID },
    itinerary: {
      "@type": "ItemList",
      numberOfItems: t.itinerary.length,
      itemListElement: t.itinerary.map((d) => ({
        "@type": "ListItem",
        position: d.day,
        item: { "@type": "TouristDestination", name: `Day ${d.day}: ${d.title}`, description: d.description },
      })),
    },
    subjectOf: places.slice(0, 10).map((p) => ({ "@type": "TouristAttraction", name: p.name, url: absoluteUrl(`/places/${p.state}/${p.slug}`) })),
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: absoluteUrl(url),
      seller: { "@id": ORG_ID },
    },
  };
}

export function placeSchema(p: Place, url: string): Json {
  return {
    "@context": "https://schema.org",
    "@type": ["TouristAttraction", "Place"],
    "@id": `${absoluteUrl(url)}#place`,
    name: p.name,
    description: p.summary,
    url: absoluteUrl(url),
    image: p.images.slice(0, 4).map(img),
    geo: { "@type": "GeoCoordinates", latitude: p.lat, longitude: p.lng },
    address: { "@type": "PostalAddress", addressLocality: p.nearestTown, addressRegion: states.find((s) => s.slug === p.state)?.name, addressCountry: "IN" },
    containedInPlace: { "@type": "State", name: states.find((s) => s.slug === p.state)?.name },
    touristType: p.category,
    isAccessibleForFree: false,
  };
}

export function activitySchema(a: Activity, url: string): Json {
  return {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "@id": `${absoluteUrl(url)}#activity`,
    name: a.name,
    description: a.summary,
    url: absoluteUrl(url),
    image: a.images.slice(0, 3).map(img),
    geo: { "@type": "GeoCoordinates", latitude: a.lat, longitude: a.lng },
    touristType: a.category,
    provider: { "@id": ORG_ID },
  };
}

export function articleSchema(g: Guide, url: string, image?: string): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.title,
    description: g.metaDescription,
    image: [img(image)],
    datePublished: g.publishedAt,
    dateModified: g.updatedAt,
    inLanguage: "en-IN",
    mainEntityOfPage: absoluteUrl(url),
    author: { "@type": "Organization", name: `${site.name} Editorial Team`, url: site.url },
    publisher: { "@id": ORG_ID, "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: absoluteUrl("/logo.png") } },
  };
}

export function itemListSchema(name: string, items: { name: string; url: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: absoluteUrl(it.url) })),
  };
}
