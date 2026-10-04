"use client";

import { createContext, useCallback, useContext, useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Loader2, MessageCircle, X } from "lucide-react";
import { makeLeadId, whatsappUrl, type LeadInput } from "@/lib/lead";
import { site } from "@/data/site";
import { flushQueue, loadProfile, postLead, prepareWindow, queueLead, saveProfile } from "./leadClient";
import { CountryCodeSelect, joinPhone, splitPhone } from "./CountryCodeSelect";

export type WhatsAppContext = { tour?: string; state?: string; text?: string };
type Ctx = { open: (c?: WhatsAppContext) => void };

const WhatsAppCtx = createContext<Ctx>({ open: () => {} });
export const useWhatsApp = () => useContext(WhatsAppCtx);

export function WhatsAppProvider({ children }: { children: ReactNode }) {
  const [ctx, setCtx] = useState<WhatsAppContext | null>(null);
  const open = useCallback((c: WhatsAppContext = {}) => setCtx(c), []);

  useEffect(() => {
    flushQueue();
  }, []);

  return (
    <WhatsAppCtx.Provider value={{ open }}>
      {children}
      {ctx && <QuickLeadModal context={ctx} onClose={() => setCtx(null)} />}
    </WhatsAppCtx.Provider>
  );
}

function QuickLeadModal({ context, onClose }: { context: WhatsAppContext; onClose: () => void }) {
  const id = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [profile] = useState(loadProfile);
  const [name, setName] = useState(profile.name ?? "");
  const [code, setCode] = useState(() => splitPhone(profile.phone).code);
  const [phone, setPhone] = useState(() => splitPhone(profile.phone).number);
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(2);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const d = dialogRef.current;
    d?.showModal();
    return () => d?.close();
  }, []);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const fullPhone = joinPhone(code, phone);
    if (name.trim().length < 2 || !/^\+\d{8,15}$/.test(fullPhone)) {
      setError("Please enter your name and a valid phone number.");
      return;
    }
    setError("");
    setBusy(true);
    const win = prepareWindow();
    const lead: LeadInput = {
      source: "WhatsApp",
      leadId: makeLeadId(),
      name: name.trim(),
      phone: fullPhone,
      tour: context.tour,
      state: context.state,
      travelDate: date || undefined,
      adults: guests,
      pageUrl: window.location.href,
      website: String(form.get("website") ?? ""),
    };
    saveProfile({ ...loadProfile(), name: lead.name, phone: fullPhone });
    const res = await postLead(lead, 5000);
    const leadId = res.leadId || lead.leadId!;
    // Save failed? Still open WhatsApp and retry the save in the background.
    if (!res.ok && !res.fieldErrors) queueLead({ ...lead, leadId });
    win.go(whatsappUrl(site.whatsapp, { ...lead, leadId }, context.text));
    setBusy(false);
    onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => e.target === dialogRef.current && onClose()}
      aria-labelledby={`${id}-t`}
      className="w-[min(92vw,26rem)] rounded-2xl p-0 shadow-2xl backdrop:bg-forest-950/60"
    >
      <form onSubmit={submit} className="p-5 sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 id={`${id}-t`} className="font-sans text-lg font-bold text-forest-900">Chat with us on WhatsApp</h2>
            <p className="mt-1 text-sm text-slate-600">
              {context.tour ? <>About: <strong>{context.tour}</strong></> : "Tell us who you are and we'll continue on WhatsApp."}
            </p>
          </div>
          <button type="button" onClick={onClose} className="rounded-full p-1 text-slate-600 hover:bg-slate-100" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <label htmlFor={`${id}-n`} className="label">Your name</label>
            <input id={`${id}-n`} className="input" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
          </div>
          <div>
            <label htmlFor={`${id}-p`} className="label">Phone (WhatsApp)</label>
            <div className="flex gap-2">
              <CountryCodeSelect value={code} onChange={setCode} id={`${id}-cc`} />
              <input id={`${id}-p`} className="input" value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" autoComplete="tel-national" required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor={`${id}-d`} className="label">Travel date (optional)</label>
              <input id={`${id}-d`} type="date" className="input" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div>
              <label htmlFor={`${id}-g`} className="label">Guests</label>
              <input id={`${id}-g`} type="number" min={1} max={50} className="input" value={guests} onChange={(e) => setGuests(Number(e.target.value) || 1)} />
            </div>
          </div>
          <div className="hidden" aria-hidden>
            <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
          </div>
          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
        </div>
        <button type="submit" disabled={busy} className="btn-whatsapp mt-5 w-full">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <MessageCircle className="h-4 w-4" />}
          {busy ? "Opening WhatsApp…" : "Continue to WhatsApp"}
        </button>
        <p className="mt-3 text-center text-xs text-slate-600">We save your enquiry so our team can follow up. No spam, ever.</p>
      </form>
    </dialog>
  );
}
