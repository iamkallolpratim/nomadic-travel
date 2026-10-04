/**
 * Genuine guest reviews only. Add real reviews here (with permission) — e.g. copied from your
 * Google Business Profile. The home page testimonials block and AggregateRating schema stay
 * hidden while this list is empty, so no fabricated reviews are ever published.
 */
export interface Testimonial {
  name: string;
  from: string;
  tour: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  date: string; // YYYY-MM-DD
  source: "Google" | "TripAdvisor" | "Direct";
}

export const testimonials: Testimonial[] = [];
