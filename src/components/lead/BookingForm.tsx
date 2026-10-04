"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import { AlertTriangle, CalendarDays, CheckCircle2, Loader2, MessageCircle, Send, Users } from "lucide-react";
import { BUDGETS, STATE_OPTIONS, makeLeadId, whatsappUrl, type LeadInput, type LeadResult } from "@/lib/lead";
import { site } from "@/data/site";
import { loadProfile, postLead, queueLead, saveProfile, type Profile } from "./leadClient";
import { CountryCodeSelect, joinPhone, splitPhone } from "./CountryCodeSelect";

interface Props {
  tour?: string;
  state?: string;
  source?: "Booking" | "Contact";
  title?: string;
  compact?: boolean;
}

type Status = { kind: "idle" } | { kind: "loading" } | { kind: "success"; leadId: string; lead: LeadInput } | { kind: "error"; message: string; lead: LeadInput };

export function BookingForm({ tour = "", state = "", source = "Booking", title = "Request a quote", compact }: Props) {
  const id = useId();
  const [profile, setProfile] = useState<Profile>({});
  const [code, setCode] = useState("+91");
  useEffect(() => {
    const p = loadProfile();
    if (p.name || p.phone || p.email) {
      // Saved contact details live in localStorage, so they can only be applied after hydration.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProfile(p);
      setCode(splitPhone(p.phone).code);
    }
  }, []);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<LeadResult["fieldErrors"]>({});
  const today = new Date().toISOString().slice(0, 10);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? "").trim();
    const lead: LeadInput = {
      source,
      leadId: makeLeadId(),
      name: get("name"),
      phone: joinPhone(code, get("phone")),
      email: get("email"),
      tour: get("tour"),
      state: get("state"),
      travelDate: get("travelDate"),
      adults: Number(get("adults")) || 1,
      children: Number(get("children")) || 0,
      budget: get("budget"),
      message: get("message"),
      pageUrl: window.location.href,
      website: get("website"),
    };
    setErrors({});
    setStatus({ kind: "loading" });
    saveProfile({ name: lead.name, phone: lead.phone, email: lead.email });
    const res = await postLead(lead);
    if (res.ok) {
      setStatus({ kind: "success", leadId: res.leadId || lead.leadId!, lead });
      return;
    }
    if (res.fieldErrors) {
      setErrors(res.fieldErrors);
      setStatus({ kind: "idle" });
      return;
    }
    queueLead({ ...lead, leadId: res.leadId || lead.leadId });
    setStatus({ kind: "error", message: res.error || "Something went wrong", lead: { ...lead, leadId: res.leadId || lead.leadId } });
  }

  if (status.kind === "success") {
    return (
      <div className="panel text-center" role="status" aria-live="polite">
        <CheckCircle2 className="mx-auto h-12 w-12 text-tea-600" aria-hidden />
        <h2 className="mt-3 font-sans text-xl font-bold text-forest-900">Thank you, {status.lead.name.split(" ")[0]}!</h2>
        <p className="mt-2 text-sm text-slate-600">We&apos;ve received your request and emailed a confirmation. Our team usually replies within a few hours.</p>
        <p className="mt-4 inline-block rounded-lg bg-tea-50 px-4 py-2 font-mono text-sm text-forest-800 ring-1 ring-tea-200">
          Lead ID: <strong>{status.leadId}</strong>
        </p>
        <a href={whatsappUrl(site.whatsapp, { ...status.lead, leadId: status.leadId })} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-5 w-full">
          <MessageCircle className="h-4 w-4" aria-hidden /> Continue on WhatsApp
        </a>
      </div>
    );
  }

  const err = (k: keyof LeadInput) => errors?.[k] && <p className="mt-1 text-xs text-red-600">{errors[k]}</p>;

  return (
    <form key={profile.phone ?? "new"} onSubmit={onSubmit} noValidate className="panel relative scroll-mt-20" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="font-sans text-lg font-bold text-forest-900">{title}</h2>
      <p className="mb-4 mt-1 text-sm text-slate-600">Free, no-obligation itinerary and quote within 24 hours.</p>

      <div className="grid gap-3">
        <div>
          <label htmlFor={`${id}-name`} className="label">Full name *</label>
          <input id={`${id}-name`} name="name" className="input" defaultValue={profile.name} autoComplete="name" required aria-invalid={!!errors?.name} />
          {err("name")}
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className="label">Phone / WhatsApp *</label>
          <div className="flex gap-2">
            <CountryCodeSelect value={code} onChange={setCode} id={`${id}-cc`} />
            <input id={`${id}-phone`} name="phone" className="input" inputMode="tel" defaultValue={splitPhone(profile.phone).number} autoComplete="tel-national" required aria-invalid={!!errors?.phone} />
          </div>
          {err("phone")}
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="label">Email *</label>
          <input id={`${id}-email`} name="email" type="email" className="input" defaultValue={profile.email} autoComplete="email" required aria-invalid={!!errors?.email} />
          {err("email")}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor={`${id}-date`} className="label flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" aria-hidden /> Travel date</label>
            <input id={`${id}-date`} name="travelDate" type="date" min={today} className="input" suppressHydrationWarning />
            {err("travelDate")}
          </div>
          <div>
            <label htmlFor={`${id}-adults`} className="label flex items-center gap-1"><Users className="h-3.5 w-3.5" aria-hidden /> Adults</label>
            <input id={`${id}-adults`} name="adults" type="number" min={1} max={50} defaultValue={2} className="input" />
          </div>
        </div>
        <details className="group rounded-2xl bg-slate-50 px-3 py-2.5">
          <summary className="cursor-pointer list-none text-xs font-semibold text-forest-800 [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">+ Add trip details (optional)</span><span className="hidden group-open:inline">− Trip details</span>
          </summary>
          <div className="mt-3 grid gap-3">
            <div>
              <label htmlFor={`${id}-tour`} className="label">Tour</label>
              <input id={`${id}-tour`} name="tour" className="input" defaultValue={tour} placeholder="e.g. Kaziranga + Meghalaya, or custom" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor={`${id}-state`} className="label">State</label>
                <select id={`${id}-state`} name="state" className="input" defaultValue={state}>
                  <option value="">Select</option>
                  {STATE_OPTIONS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor={`${id}-children`} className="label">Children</label>
                <input id={`${id}-children`} name="children" type="number" min={0} max={50} defaultValue={0} className="input" />
              </div>
            </div>
            <div>
              <label htmlFor={`${id}-budget`} className="label">Budget per person</label>
              <select id={`${id}-budget`} name="budget" className="input" defaultValue="">
                <option value="">Select</option>
                {BUDGETS.map((b) => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor={`${id}-msg`} className="label">Message</label>
              <textarea id={`${id}-msg`} name="message" rows={3} className="input" placeholder="Hotel category, interests, special requests…" />
            </div>
          </div>
        </details>
        {/* Honeypot: hidden from people, tempting for bots */}
        <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
          <label htmlFor={`${id}-website`}>Leave this field empty</label>
          <input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      {status.kind === "error" && (
        <div role="alert" className="mt-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-900 ring-1 ring-amber-200">
          <p className="flex items-center gap-2 font-semibold"><AlertTriangle className="h-4 w-4" aria-hidden /> We couldn&apos;t submit your request.</p>
          <p className="mt-1">Please send it on WhatsApp instead — we&apos;ll keep retrying in the background. Reference {status.lead.leadId}.</p>
          <a href={whatsappUrl(site.whatsapp, status.lead)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-3 w-full">
            <MessageCircle className="h-4 w-4" aria-hidden /> Send on WhatsApp
          </a>
        </div>
      )}

      <button type="submit" disabled={status.kind === "loading"} className="btn-primary mt-5 w-full">
        {status.kind === "loading" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Send className="h-4 w-4" aria-hidden />}
        {status.kind === "loading" ? "Sending…" : "Send enquiry"}
      </button>
      <p className="mt-3 text-center text-xs text-slate-600">By submitting you agree to be contacted about your trip. We never share your details.</p>
    </form>
  );
}
