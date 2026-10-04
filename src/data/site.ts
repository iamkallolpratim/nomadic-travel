export const site = {
  name: "Nomadic Travel",
  legalName: "Nomadic Travel",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.nomadictravel.co.in").replace(/\/$/, ""),
  email: "contact@nomadictravel.co.in",
  phone: "+91 60000 60220",
  phoneE164: "+916000060220",
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "916000060220").replace(/\D/g, ""),
  address: {
    street: "Patarkuchi Road, Basistha",
    locality: "Guwahati",
    region: "Assam",
    postalCode: "781029",
    country: "IN",
  },
  /** Approximate (Patarkuchi Road, Basistha). Replace with the exact pin from Google Maps if needed. */
  geo: { lat: 26.1135, lng: 91.7885 },
  foundingYear: 2018,
  description:
    "Guwahati-based Northeast India tour operator crafting Assam, Arunachal Pradesh, Meghalaya and Nagaland tour packages, safaris, treks and festival trips.",
  sameAs: [
    "https://www.facebook.com/share/19iDgHaFKo/",
    "https://instagram.com/nomadic.travel_zeemi",
    "https://www.youtube.com/@zeemiwalker",
    "https://maps.app.goo.gl/v3tA6QUwWBRQ4hV57",
  ],
  /** Office location on Google Maps (contact page link + schema `hasMap`). */
  googleMapsUrl: "https://maps.app.goo.gl/v3tA6QUwWBRQ4hV57",
  /** Google review link (from Business Profile → "Ask for reviews") — used for the footer "Rate us" button. */
  googleReviewUrl: "https://share.google/p1bqfRuObXJ44H2Fc",
  /** Owner previously hid prices. Flip to false to hide "From ₹" on cards & pages (schema keeps Offer). */
  showPrices: true,
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  gaId: process.env.NEXT_PUBLIC_GA_ID || "",
  /** Browser key (referrer-restricted): Maps Static, Maps JavaScript, Maps Embed, Routes. Maps are hidden when empty. */
  mapsKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "",
  /** Map ID for Advanced Markers; DEMO_MAP_ID works for development only. */
  mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID || "DEMO_MAP_ID",
};

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export const absoluteUrl = (path = "/") => `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
