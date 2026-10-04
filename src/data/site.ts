export const site = {
  name: "Nomadic Travel",
  legalName: "Nomadic Travel",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.nomadictravel.co.in").replace(/\/$/, ""),
  email: "contact@nomadictravel.co.in",
  phone: "+91 60000 60220",
  phoneE164: "+916000060220",
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "916000060220").replace(/\D/g, ""),
  address: {
    street: "House No 72, Senduri Ali, Jonali",
    locality: "Guwahati",
    region: "Assam",
    postalCode: "781024",
    country: "IN",
  },
  geo: { lat: 26.1445, lng: 91.7362 },
  foundingYear: 2018,
  description:
    "Guwahati-based Northeast India tour operator crafting Assam, Arunachal Pradesh, Meghalaya and Nagaland tour packages, safaris, treks and festival trips.",
  sameAs: [
    "https://www.facebook.com/share/18Dxgm2LdM/",
    "https://www.instagram.com/iamzeemi/",
    "https://www.youtube.com/@zeemiwalker",
  ],
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
