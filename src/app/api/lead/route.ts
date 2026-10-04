import { NextResponse, type NextRequest } from "next/server";
import { makeLeadId, validateLead, type LeadResult } from "@/lib/lead";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Best-effort per-instance rate limit (serverless instances are short-lived; Apps Script dedupes by Lead ID).
const hits = new Map<string, number[]>();
const LIMIT = 20;
const WINDOW_MS = 10 * 60 * 1000;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > LIMIT;
}

const json = (body: LeadResult, status = 200) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(req: NextRequest) {
  // Same-origin check: browsers always send Origin on cross-site POSTs.
  const origin = req.headers.get("origin");
  const originHost = (() => {
    try {
      return origin ? new URL(origin).host : null;
    } catch {
      return "invalid";
    }
  })();
  if (originHost && originHost !== req.headers.get("host")) {
    return json({ ok: false, error: "Forbidden" }, 403);
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) return json({ ok: false, error: "Too many requests. Please try again later or WhatsApp us." }, 429);

  let raw: Record<string, unknown>;
  try {
    raw = await req.json();
  } catch {
    return json({ ok: false, error: "Invalid request" }, 400);
  }

  // Honeypot: bots fill hidden fields. Pretend success so they don't retry.
  if (typeof raw.website === "string" && raw.website.trim() !== "") {
    return json({ ok: true, leadId: makeLeadId() });
  }

  const { lead, errors } = validateLead(raw);
  if (!lead) return json({ ok: false, error: "Please check the highlighted fields", fieldErrors: errors }, 422);

  const endpoint = process.env.LEADS_ENDPOINT;
  if (!endpoint) {
    console.error("[lead] LEADS_ENDPOINT is not configured; lead not stored", lead.leadId);
    return json({ ok: false, leadId: lead.leadId, error: "Booking service is not configured" }, 503);
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...lead, secret: process.env.LEADS_SECRET ?? "", userAgent: req.headers.get("user-agent")?.slice(0, 200) ?? "" }),
      redirect: "follow",
      signal: AbortSignal.timeout(12_000),
      cache: "no-store",
    });
    const data = (await res.json().catch(() => null)) as LeadResult | null;
    if (!res.ok || !data?.ok) {
      console.error("[lead] Apps Script error", res.status, data?.error);
      return json({ ok: false, leadId: lead.leadId, error: "Could not save your request" }, 502);
    }
    return json({ ok: true, leadId: data.leadId || lead.leadId });
  } catch (err) {
    console.error("[lead] forward failed", err);
    return json({ ok: false, leadId: lead.leadId, error: "Could not reach booking service" }, 504);
  }
}
