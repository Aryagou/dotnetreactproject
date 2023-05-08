import { atom } from "recoil";

interface ActivityState {
  activityId: string | null;
  isView: boolean;
  isEdit: boolean;
}

export const activityState = atom<ActivityState>({
  key: "activityState",
  default: {
    activityId: null,
    isView: false,
    isEdit: false,
  },
});
