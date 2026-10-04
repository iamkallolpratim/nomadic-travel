/** Vehicles available for tours and transfers. Seats = passengers, excluding the driver. */
export interface Car {
  slug: string;
  name: string;
  type: "Sedan" | "MUV" | "Tempo Traveller";
  seats: string;
  bags: string;
  idealFor: string;
}

export const cars: Car[] = [
  { slug: "innova-crysta", name: "Toyota Innova Crysta", type: "MUV", seats: "6", bags: "3–4", idealFor: "Mountain routes — Tawang, Ziro, Mechuka and Nagaland" },
  { slug: "force-urbania", name: "Force Urbania", type: "Tempo Traveller", seats: "9–16", bags: "Group luggage", idealFor: "Groups, family reunions and festival trips" },
  { slug: "maruti-ertiga", name: "Maruti Suzuki Ertiga", type: "MUV", seats: "6", bags: "2", idealFor: "Families of 4–6 in Meghalaya and Assam" },
  { slug: "swift-dzire", name: "Maruti Suzuki Swift Dzire", type: "Sedan", seats: "4", bags: "2", idealFor: "Couples, airport & station transfers, Shillong and Kaziranga trips" },
  { slug: "hyundai-aura", name: "Hyundai Aura", type: "Sedan", seats: "4", bags: "2", idealFor: "Couples and small families on Assam & Meghalaya routes" },
  { slug: "honda-amaze", name: "Honda Amaze", type: "Sedan", seats: "4", bags: "2–3", idealFor: "Comfortable sedan with a roomy boot for longer drives" },
];
