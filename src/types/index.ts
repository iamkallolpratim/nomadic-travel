import type { IconKey } from "@/lib/icons";
import type { CityKey } from "@/data/cities";

export type StateSlug = "assam" | "arunachal-pradesh" | "meghalaya" | "nagaland";

export interface Faq {
  q: string;
  a: string;
}

/** Image key = filename (without extension) in /public/images. Credits live in images.generated.json */
export type ImageKey = string;

export interface StateInfo {
  slug: StateSlug;
  name: string;
  /** URL path segment, e.g. "assam-tour-packages" */
  pageSlug: string;
  primaryKeyword: string;
  metaTitle: string;
  metaDescription: string;
  tagline: string;
  heroImage: ImageKey;
  /** Tailwind-safe accent tokens */
  accent: { text: string; bg: string; soft: string; ring: string; hex: string };
  capital: string;
  gateway: string;
  intro: string[];
  bestTime: { summary: string; seasons: { name: string; months: string; icon: IconKey; notes: string }[] };
  howToReach: { mode: "air" | "rail" | "road"; title: string; text: string }[];
  permit: { title: string; indian: string; foreign: string; links: { label: string; href: string }[] };
  culture: { heading: string; paragraphs: string[] }[];
  travelTips: string[];
  faqs: Faq[];
}

export interface Place {
  slug: string;
  name: string;
  state: StateSlug;
  district: string;
  nearestTown: string;
  category: string;
  icon: IconKey;
  primaryKeyword: string;
  /** One or two sentences, used for cards and meta description fallback */
  summary: string;
  /** 150–300 words of original copy, split in paragraphs */
  description: string[];
  bestSeason: string;
  idealDuration: string;
  permit: string;
  altitude?: string;
  entry?: string;
  howToReach: string;
  lat: number;
  lng: number;
  images: ImageKey[];
  faqs: Faq[];
  activities: string[];
  nearby: string[];
  sources: string[];
}

export type Difficulty = "Easy" | "Moderate" | "Challenging";

export interface Activity {
  slug: string;
  name: string;
  state: StateSlug;
  category: string;
  icon: IconKey;
  primaryKeyword: string;
  summary: string;
  description: string[];
  difficulty: Difficulty;
  bestSeason: string;
  idealDuration: string;
  permit: string;
  district: string;
  nearestTown: string;
  /** Place slugs where this is done */
  places: string[];
  lat: number;
  lng: number;
  images: ImageKey[];
  faqs: Faq[];
  sources: string[];
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  icon: IconKey;
  places?: string[];
  /** Non-place towns passed through or stayed in; routed before this day's `places` */
  towns?: CityKey[];
  overnight?: string;
  meals?: string;
  drive?: string;
}

export type BudgetBand = "budget" | "standard" | "premium";

export interface Tour {
  slug: string;
  title: string;
  primaryKeyword: string;
  metaTitle: string;
  metaDescription: string;
  states: StateSlug[];
  nights: number;
  days: number;
  startCity: string;
  endCity: string;
  /** Route endpoints for maps */
  start: CityKey;
  end: CityKey;
  /** Indicative starting price per person in INR, twin sharing */
  priceFrom: number;
  budget: BudgetBand;
  bestSeason: string;
  summary: string;
  overview: string[];
  highlights: string[];
  activities: string[];
  places: string[];
  itinerary: ItineraryDay[];
  inclusions: { text: string; icon: IconKey }[];
  exclusions: string[];
  images: ImageKey[];
  faqs: Faq[];
  featured?: boolean;
  /** Old /packages/:id slugs that should 301 here */
  legacyIds?: string[];
}

export type GuideBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "tip"; text: string };

export interface Guide {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  excerpt: string;
  publishedAt: string;
  updatedAt: string;
  heroImage: ImageKey;
  states: StateSlug[];
  body: GuideBlock[];
  relatedTours: string[];
  relatedPlaces: string[];
  faqs?: Faq[];
}

export interface ImageMeta {
  file: string;
  width: number;
  height: number;
  alt: string;
  blurDataURL: string;
  author: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
  title: string;
}
