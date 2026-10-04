"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Filter, RotateCcw } from "lucide-react";

export type TourFacet = { slug: string; states: string[]; days: number; activities: string[] };
type Option = { value: string; label: string; icon?: ReactNode };

const DURATIONS: Option[] = [
  { value: "short", label: "Up to 4 days" },
  { value: "mid", label: "5–7 days" },
  { value: "long", label: "8+ days" },
];

const inDuration = (d: number, v: string) => (v === "short" ? d <= 4 : v === "mid" ? d >= 5 && d <= 7 : d >= 8);

function Chips({ options, value, onChange, label }: { options: Option[]; value: string; onChange: (v: string) => void; label: string }) {
return (
  <fieldset>
    <legend className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-600">{label}</legend>
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(value === o.value ? "" : o.value)}
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 transition ${value === o.value ? "bg-forest-700 text-white ring-forest-700" : "bg-white text-slate-700 ring-slate-200 hover:ring-forest-400"}`}
        >
          {o.icon}{o.label}
        </button>
      ))}
    </div>
  </fieldset>
);
}

export function ToursExplorer({ facets, cards, stateOptions, activityOptions }: { facets: TourFacet[]; cards: Record<string, ReactNode>; stateOptions: Option[]; activityOptions: Option[] }) {
  const [state, setState] = useState("");
  const [duration, setDuration] = useState("");
  const [activity, setActivity] = useState("");

  // Deep links such as /tours?state=meghalaya&activity=hornbill-festival. Read after hydration so the
  // prerendered HTML (all tours visible, fully indexable) matches the first client render.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    /* eslint-disable react-hooks/set-state-in-effect */
    setState(q.get("state") ?? "");
    setDuration(q.get("duration") ?? "");
    setActivity(q.get("activity") ?? "");
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    const q = new URLSearchParams();
    if (state) q.set("state", state);
    if (duration) q.set("duration", duration);
    if (activity) q.set("activity", activity);
    const qs = q.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [state, duration, activity]);

  const visible = useMemo(
    () =>
      facets.filter(
        (t) =>
          (!state || t.states.includes(state)) &&
          (!duration || inDuration(t.days, duration)) &&
          (!activity || t.activities.includes(activity)),
      ),
    [facets, state, duration, activity],
  );
  const reset = () => { setState(""); setDuration(""); setActivity(""); };
  const active = state || duration || activity;


  return (
    <div>
      <div className="panel mb-4 space-y-4">
        <p className="panel-title mb-0 flex items-center gap-2"><Filter className="h-3.5 w-3.5" aria-hidden /> Filter tours</p>
        <Chips label="State" options={stateOptions} value={state} onChange={setState} />
        <Chips label="Duration" options={DURATIONS} value={duration} onChange={setDuration} />
        <details className="group">
          <summary className="cursor-pointer list-none text-xs font-bold uppercase tracking-wider text-slate-600 [&::-webkit-details-marker]:hidden">Activity <span className="text-forest-700 group-open:hidden">+ show</span></summary>
          <div className="mt-2"><Chips label="Activity" options={activityOptions} value={activity} onChange={setActivity} /></div>
        </details>
        <div className="flex items-center justify-between text-sm">
          <p aria-live="polite" className="text-slate-600">{visible.length} of {facets.length} tours</p>
          {active && <button type="button" onClick={reset} className="inline-flex items-center gap-1 font-semibold text-forest-700"><RotateCcw className="h-4 w-4" aria-hidden />Reset</button>}
        </div>
      </div>
      <div className="space-y-4">
        {facets.map((t) => (
          <div key={t.slug} className={visible.includes(t) ? "block" : "hidden"}>
            {cards[t.slug]}
          </div>
        ))}
      </div>
      {visible.length === 0 && <p className="py-10 text-center text-slate-600">No tours match these filters. <button type="button" onClick={reset} className="link">Reset filters</button> or ask us for a custom trip.</p>}
    </div>
  );
}
