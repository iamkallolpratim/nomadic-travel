"use client";

export const COUNTRY_CODES = [
  ["+91", "🇮🇳 +91"], ["+1", "🇺🇸 +1"], ["+44", "🇬🇧 +44"], ["+61", "🇦🇺 +61"], ["+971", "🇦🇪 +971"],
  ["+65", "🇸🇬 +65"], ["+49", "🇩🇪 +49"], ["+33", "🇫🇷 +33"], ["+977", "🇳🇵 +977"], ["+880", "🇧🇩 +880"],
  ["+975", "🇧🇹 +975"], ["+60", "🇲🇾 +60"], ["+81", "🇯🇵 +81"], ["+82", "🇰🇷 +82"], ["+86", "🇨🇳 +86"],
  ["+31", "🇳🇱 +31"], ["+39", "🇮🇹 +39"], ["+34", "🇪🇸 +34"], ["+41", "🇨🇭 +41"], ["+64", "🇳🇿 +64"],
  ["+966", "🇸🇦 +966"], ["+974", "🇶🇦 +974"], ["+27", "🇿🇦 +27"],
] as const;

export function splitPhone(full?: string): { code: string; number: string } {
  if (!full) return { code: "+91", number: "" };
  const match = [...COUNTRY_CODES].map(([c]) => c).sort((a, b) => b.length - a.length).find((c) => full.startsWith(c));
  return match ? { code: match, number: full.slice(match.length) } : { code: "+91", number: full.replace(/^\+/, "") };
}

export const joinPhone = (code: string, number: string) => `${code}${number.replace(/\D/g, "").replace(/^0+/, "")}`;

export function CountryCodeSelect({ value, onChange, id }: { value: string; onChange: (v: string) => void; id?: string }) {
  return (
    <select id={id} aria-label="Country code" value={value} onChange={(e) => onChange(e.target.value)} className="input w-28 flex-none pr-6">
      {COUNTRY_CODES.map(([code, label]) => (
        <option key={code} value={code}>{label}</option>
      ))}
    </select>
  );
}
