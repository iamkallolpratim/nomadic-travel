/** Shared lead types + validation for the booking form, WhatsApp quick-lead and /api/lead. */

export type LeadSource = "Booking" | "WhatsApp" | "Contact";

export interface LeadInput {
  source: LeadSource;
  leadId?: string;
  name: string;
  phone: string;
  email?: string;
  tour?: string;
  state?: string;
  travelDate?: string;
  adults?: number;
  children?: number;
  budget?: string;
  message?: string;
  pageUrl?: string;
  /** Honeypot — must stay empty */
  website?: string;
}

export interface LeadResult {
  ok: boolean;
  leadId?: string;
  error?: string;
  fieldErrors?: Partial<Record<keyof LeadInput, string>>;
}

export const BUDGETS = ["Under ₹15,000 pp", "₹15,000–30,000 pp", "₹30,000–50,000 pp", "Above ₹50,000 pp", "Not sure yet"] as const;
export const STATE_OPTIONS = ["Assam", "Arunachal Pradesh", "Meghalaya", "Nagaland", "Multiple states"] as const;

const LEAD_ID_RE = /^NT-\d{6}-[A-Z0-9]{4}$/;

/** NT-YYMMDD-XXXX in IST */
export function makeLeadId(now = new Date()): string {
  const ist = new Date(now.getTime() + 5.5 * 3600 * 1000);
  const d = ist.toISOString().slice(2, 10).replace(/-/g, "");
  const rand = Array.from({ length: 4 }, () => "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[Math.floor(Math.random() * 32)]).join("");
  return `NT-${d}-${rand}`;
}

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, max) : "";

const toInt = (v: unknown, min: number, max: number, fallback: number) => {
  const n = typeof v === "number" ? v : parseInt(String(v ?? ""), 10);
  return Number.isFinite(n) ? Math.min(max, Math.max(min, Math.round(n))) : fallback;
};

/**
 * Normalises and validates untrusted input. Returns the cleaned lead or field errors.
 * Phone must include a country code (E.164-ish: + and 8–15 digits).
 */
export function validateLead(raw: Record<string, unknown>): { lead?: Required<Omit<LeadInput, "website">>; errors?: LeadResult["fieldErrors"] } {
  const errors: LeadResult["fieldErrors"] = {};
  const source = (["Booking", "WhatsApp", "Contact"] as const).find((s) => s === raw.source) ?? "Booking";
  const name = clean(raw.name, 80);
  const phoneDigits = clean(raw.phone, 24).replace(/[^\d+]/g, "");
  const phone = phoneDigits.startsWith("+") ? phoneDigits : phoneDigits ? `+${phoneDigits}` : "";
  const email = clean(raw.email, 120).toLowerCase();
  const travelDate = clean(raw.travelDate, 10);
  const leadIdRaw = clean(raw.leadId, 20);

  if (name.length < 2) errors.name = "Please enter your name";
  if (!/^\+\d{8,15}$/.test(phone)) errors.phone = "Enter a valid phone number with country code";
  if (source !== "WhatsApp" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = "Enter a valid email address";
  if (source === "WhatsApp" && email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = "Enter a valid email address";
  if (travelDate && !/^\d{4}-\d{2}-\d{2}$/.test(travelDate)) errors.travelDate = "Use a valid date";

  if (Object.keys(errors).length) return { errors };
  return {
    lead: {
      source,
      leadId: LEAD_ID_RE.test(leadIdRaw) ? leadIdRaw : makeLeadId(),
      name,
      phone,
      email,
      tour: clean(raw.tour, 140),
      state: clean(raw.state, 40),
      travelDate,
      adults: toInt(raw.adults, 1, 50, 2),
      children: toInt(raw.children, 0, 50, 0),
      budget: clean(raw.budget, 40),
      message: clean(raw.message, 2000),
      pageUrl: clean(raw.pageUrl, 300),
    },
  };
}

/** Builds the wa.me deep link with a prefilled message. */
export function whatsappUrl(number: string, lead: Partial<LeadInput> & { leadId?: string }, fallbackText?: string) {
  const lines = [
    "Hello Nomadic Travel! 👋",
    lead.tour ? `I'm interested in: ${lead.tour}` : fallbackText || "I'd like help planning a Northeast India trip.",
    lead.name ? `Name: ${lead.name}` : "",
    lead.travelDate ? `Travel date: ${lead.travelDate}` : "",
    lead.adults ? `Guests: ${lead.adults} adult(s)${lead.children ? `, ${lead.children} child(ren)` : ""}` : "",
    lead.leadId ? `Lead ID: ${lead.leadId}` : "",
  ].filter(Boolean);
  return `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(lines.join("\n"))}`;
}
