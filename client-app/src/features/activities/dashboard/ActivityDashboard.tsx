import React, { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";

import ActivityList from "./ActivityList";
import { useRecoilState, useRecoilValue } from "recoil";
import { activityState } from "../../../atoms/activity-atom";
import { activityListState } from "../../../atoms/activity-list-atom";
import { ActivitiesClient } from "../../../HttpClients";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Activity } from "../../../web-api-client";
import ActivityFilters from "./ActivityFilters";

function getFormattedDate(value: string) {
  return value?.split("T")?.[0];
}

export default function ActivityDashboard() {
  const [activities, setActivities] = useRecoilState(activityListState);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchActivities() {
      const data = (await ActivitiesClient.getActivities()) as Activity[];
      const formattedActivities = data.map((activity: Activity) => ({
        ...activity,
        date: getFormattedDate(activity.date),
      }));
      setActivities(formattedActivities);
      setLoading(false);
    }

    // use the data from recoil if there is any to avoid calling api too often
    if (activities.length === 0) {
      fetchActivities();
    } else {
      setLoading(false);
    }
  }, []);

  const activityAtomState = useRecoilValue(activityState);
  const [activity, setActivity] = useState<Activity>();

  useEffect(() => {
    const activity = activities.find(
      (activity) => activity.id === activityAtomState.activityId
    );
    setActivity(activity);
  }, [activities, activityAtomState]);

  if (loading) return <LoadingComponent />;

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>
      <Grid.Column width="6">
        <ActivityFilters />
      </Grid.Column>
    </Grid>
  );
}
