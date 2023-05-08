import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Button, Card, Grid, Image } from "semantic-ui-react";

import { activityState } from "../../../atoms/activity-atom";
import { activityListState } from "../../../atoms/activity-list-atom";
import { Activity } from "../../../web-api-client";
import { useParams, Link } from "react-router-dom";
import { ActivitiesClient } from "../../../HttpClients";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";

export default function ActivityDetails() {
  const [loading, setLoading] = useState(true);
  const [activity, setActivity] = useState<Activity>();
  const activities = useRecoilValue(activityListState);
  const setActivityState = useSetRecoilState(activityState);

  // Route is defined as /activities/:id so we can get id from useParams
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    async function fetchActivity(id: string) {
      try {
        const activity = await ActivitiesClient.getActivity(id);
        setActivity(activity);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }

    if (activities !== null && activities.length !== 0) {
      const activity = activities.find((activity) => activity.id === id);
      setActivity(activity);
      setLoading(false);
    } else {
      // fetch data from API if the page is refreshed thus the activities in memory is lost
      fetchActivity(id);
    }
  }, [id]);

  const handleCancel = () => {
    setActivityState((current) => ({
      ...current,
      activityId: null,
      isView: false,
    }));
  };

  const handleView = (id: string | undefined) => {
    setActivityState((current) => ({
      ...current,
      activityId: id || "",
      isView: false,
      isEdit: true,
    }));
  };

  if (loading) return <LoadingComponent />;

  return (
    <Grid>
    <Grid.Column width={10}>
        <ActivityDetailedHeader activity={activity} />
        <ActivityDetailedInfo activity={activity} />
        <ActivityDetailedChat />
    </Grid.Column>
    <Grid.Column width={6}>
        <ActivityDetailedSidebar />
    </Grid.Column>
</Grid>
  );
}
