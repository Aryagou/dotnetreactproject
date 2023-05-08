import { atom } from "recoil";
import { Activity } from "../web-api-client";

export const activityListState = atom<Activity[]>({
  key: "activityListState",
  default: [],
});
