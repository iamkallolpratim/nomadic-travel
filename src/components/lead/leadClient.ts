"use client";

import type { LeadInput, LeadResult } from "@/lib/lead";

const QUEUE_KEY = "nt_pending_leads";
const PROFILE_KEY = "nt_profile";

const safe = <T,>(fn: () => T, fallback: T): T => {
  try {
    return fn();
  } catch {
    return fallback;
  }
};

export async function postLead(lead: LeadInput, timeoutMs = 8000): Promise<LeadResult> {
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(timeoutMs),
      keepalive: true,
    });
    const data = (await res.json().catch(() => ({}))) as LeadResult;
    return { ...data, ok: res.ok && !!data.ok };
  } catch {
    return { ok: false, leadId: lead.leadId, error: "Network error" };
  }
}

/* Offline/failed saves are queued and retried in the background (and on next visit). */
const readQueue = (): LeadInput[] => safe(() => JSON.parse(localStorage.getItem(QUEUE_KEY) || "[]"), []);
const writeQueue = (q: LeadInput[]) => safe(() => localStorage.setItem(QUEUE_KEY, JSON.stringify(q.slice(-10))), undefined);

export function queueLead(lead: LeadInput) {
  const q = readQueue().filter((l) => l.leadId !== lead.leadId);
  writeQueue([...q, lead]);
  scheduleFlush(5000);
}

let flushing = false;
let attempts = 0;
export async function flushQueue() {
  if (flushing) return;
  flushing = true;
  const q = readQueue();
  const remaining: LeadInput[] = [];
  for (const lead of q) {
    const r = await postLead(lead, 10000);
    // 4xx validation errors will never succeed — drop them.
    if (!r.ok && !r.fieldErrors) remaining.push(lead);
  }
  writeQueue(remaining);
  flushing = false;
  if (remaining.length && ++attempts < 4) scheduleFlush(15000 * attempts);
}

function scheduleFlush(ms: number) {
  if (typeof window !== "undefined") window.setTimeout(flushQueue, ms);
}

export type Profile = { name?: string; phone?: string; email?: string };
export const loadProfile = (): Profile => safe(() => JSON.parse(localStorage.getItem(PROFILE_KEY) || "{}"), {});
export const saveProfile = (p: Profile) => safe(() => localStorage.setItem(PROFILE_KEY, JSON.stringify(p)), undefined);

/**
 * Opens WhatsApp. A blank tab is opened synchronously (inside the click handler) so popup blockers allow it;
 * call `go(url)` once the URL is ready. Falls back to same-tab navigation.
 */
export function prepareWindow() {
  const isMobile = typeof navigator !== "undefined" && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const win = isMobile ? null : window.open("about:blank", "_blank");
  return {
    go(url: string) {
      if (win && !win.closed) {
        win.opener = null;
        win.location.href = url;
      } else {
        window.location.href = url;
      }
    },
    close() {
      if (win && !win.closed) win.close();
    },
  };
}
