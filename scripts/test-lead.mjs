// Sends one test lead straight to the Apps Script web app (bypassing the website) to verify setup.
// Usage: npm run lead:test
import fs from "node:fs";

const env = Object.fromEntries(
  fs.readFileSync(new URL("../.env.local", import.meta.url), "utf8")
    .split("\n")
    .filter((l) => /^[A-Z_]+=/.test(l))
    .map((l) => [l.slice(0, l.indexOf("=")), l.slice(l.indexOf("=") + 1).trim()]),
);

const { LEADS_ENDPOINT, LEADS_SECRET } = env;
if (!LEADS_ENDPOINT?.endsWith("/exec")) {
  console.error("✗ LEADS_ENDPOINT in .env.local must be the Apps Script web-app URL ending in /exec");
  process.exit(1);
}

const res = await fetch(LEADS_ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  redirect: "follow",
  body: JSON.stringify({
    secret: LEADS_SECRET,
    source: "Booking",
    name: "Setup Test",
    phone: "+910000000000",
    email: "",
    tour: "Setup test — delete this row",
    state: "Assam",
    adults: 1,
    message: "Sent by npm run lead:test",
    pageUrl: "local-test",
  }),
});
const text = await res.text();
let data;
try {
  data = JSON.parse(text);
} catch {
  console.error(`✗ Apps Script did not return JSON (HTTP ${res.status}). Usually the deployment's "Who has access" is not "Anyone", or the URL is not the /exec one.\n`, text.slice(0, 300));
  process.exit(1);
}
if (data.ok) console.log(`✓ Saved to sheet. Lead ID ${data.leadId}. Check the "Nomadic Travel Leads" sheet and contact@ inbox.`);
else console.error(`✗ Apps Script replied: ${data.error}${data.error === "unauthorized" ? " — LEADS_SECRET in .env.local does not match the Script property" : ""}`);
