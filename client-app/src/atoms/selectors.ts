import { selector } from "recoil";
import { Activity } from "../web-api-client";
import { activityListState } from "./activity-list-atom";

export const getGroupedActivities = selector({
  key: "groupedActivitiesState",
  get: ({ get }) => {
    const activities = get(activityListState);
    // Object.entries introduced in ES10 which converts an Object object to an array
    // { foo: 'bar', baz: 42 } => [ ['foo', 'bar'], ['baz', 42] ]
    return Object.entries(
      activities.reduce((dic, curr) => {
        var date = curr.date;
        dic[date] ? (dic[date] = [...dic[date], curr]) : (dic[date] = [curr]);
        return dic;
      }, {} as { [key: string]: Activity[] }) // interesting typescript syntax here
    );
  },
});
