/** Gateway and overnight towns that are not "places" pages but appear on tour routes. */
export const cities = {
  guwahati: { name: "Guwahati", lat: 26.1445, lng: 91.7362 },
  dibrugarh: { name: "Dibrugarh", lat: 27.4728, lng: 94.912 },
  jorhat: { name: "Jorhat", lat: 26.7509, lng: 94.2037 },
  dimapur: { name: "Dimapur", lat: 25.9063, lng: 93.7276 },
  itanagar: { name: "Itanagar", lat: 27.0844, lng: 93.6053 },
  tezpur: { name: "Tezpur", lat: 26.6338, lng: 92.8 },
  tinsukia: { name: "Tinsukia", lat: 27.4886, lng: 95.3558 },
  aalo: { name: "Aalo (Along)", lat: 28.1716, lng: 94.8003 },
  "north-lakhimpur": { name: "North Lakhimpur", lat: 27.2361, lng: 94.1028 },
  sonari: { name: "Sonari", lat: 27.0247, lng: 95.0167 },
} as const;

export type CityKey = keyof typeof cities;
