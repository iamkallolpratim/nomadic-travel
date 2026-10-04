import type { Place } from "@/types";
import { assamPlaces } from "./assam";
import { arunachalPlaces } from "./arunachal-pradesh";
import { meghalayaPlaces } from "./meghalaya";
import { nagalandPlaces } from "./nagaland";

/** Places as authored; images are attached from images.generated.json in lib/content */
export type RawPlace = Omit<Place, "images">;

export const rawPlaces: RawPlace[] = [...assamPlaces, ...arunachalPlaces, ...meghalayaPlaces, ...nagalandPlaces];
