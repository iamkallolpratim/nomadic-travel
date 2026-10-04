import type { Activity } from "@/types";
import { assamActivities } from "./assam";
import { arunachalActivities } from "./arunachal-pradesh";
import { meghalayaActivities } from "./meghalaya";
import { nagalandActivities } from "./nagaland";

export type RawActivity = Omit<Activity, "images">;

export const rawActivities: RawActivity[] = [
  ...assamActivities,
  ...arunachalActivities,
  ...meghalayaActivities,
  ...nagalandActivities,
];
