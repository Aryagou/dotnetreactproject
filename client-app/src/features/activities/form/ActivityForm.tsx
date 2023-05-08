import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Button, Form, Segment } from "semantic-ui-react";
import { activityState } from "../../../atoms/activity-atom";
import { activityListState } from "../../../atoms/activity-list-atom";
import { v4 as uuid } from "uuid";
import { ActivitiesClient } from "../../../HttpClients";
import { useParams, useHistory, Link } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import WithController from "./WithController";
import { Activity } from "../../../web-api-client";


interface Props {
  activity: Activity | undefined;
}

function getFormattedDate(value: string | undefined) {
  return value?.split("T")?.[0];
}

// HOC. Higher Order Component used to get rid of redundant code
// https://www.smashingmagazine.com/2020/06/higher-order-components-react/
// might consider using what we have in Spa to refactor this
const ControlledInput = WithController(Form.Input);
const ControlledTextArea = WithController(Form.TextArea);

export default function ActivityForm() {
  const setActivityState = useSetRecoilState(activityState);
  const [activities, setActivityListState] = useRecoilState(activityListState);
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [activity, setActivity] = useState<Activity | undefined>();
  const history = useHistory();

  // have to give the initial default value for reset() to work when directed to /createActivity
  const methods = useForm({
    defaultValues: {
      id: "",
      title: "",
      description: "",
      category: "",
      date: "",
      city: "",
      venue: "",
    },
  });

  const loadForm = (activity: Activity | undefined) => {
    setLoading(true);
    setActivity(activity);
    // set the default value of the form. Normally used to set the initial default value of the form
    // after the value is get from API or load from state. If we directly pass the activity value into
    // the form fields, the default value of each field might be undefined at the time of rendering
    // and it will not change since the default value is only set in the first render
    methods.reset({ ...activity, date: getFormattedDate(activity?.date) });
    setLoading(false);
  };

  useEffect(() => {
    async function fetchActivity(id: string) {
      try {
        const activity = await ActivitiesClient.getActivity(id);
        loadForm(activity);
      } catch (e) {
        console.log(e);
      }
    }

    if (!id) methods.reset();

    if (activities !== null && activities.length !== 0) {
      const activity = activities.find((activity) => activity.id === id);
      loadForm(activity);
    } else {
      // fetch data from API if the page is refreshed thus the activities in memory is lost
      fetchActivity(id);
    }
  }, [id]);

  const onSubmit = async (data: any) => {
    const newId = uuid();
    const id = data.id;

    if (id === null || id === undefined || id === "") {
      await createActivity(data, newId);
    } else {
      await updateActivity(data);
    }

    setActivityState((current) => ({
      ...current,
      activityId: newId,
      isEdit: false,
      isView: true,
    }));
  };

  const updateActivity = async (data: any) => {
    const id = data.id;
    try {
      await ActivitiesClient.updateActivity(id, data);
      setActivityListState((current) => [
        ...current.filter((activity) => activity.id !== id),
        data,
      ]);
      // [TODO] arya not sure how this works
      history.push(`/activities/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const createActivity = async (data: any, newId: string) => {
    const newActivity = { ...data, id: newId };
    try {
      await ActivitiesClient.createActivity(newActivity);
      setActivityListState((current) => [...current, newActivity]);
      history.push(`/activities/${newId}`);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <LoadingComponent />;

  return (
    <Segment clearing>
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off">
          <input
            hidden
            defaultValue={activity?.id}
            {...methods.register("id")}
          />

          <ControlledInput placeholder="title" name="title" />
          <ControlledTextArea placeholder="description" name="description" />
          <ControlledInput placeholder="category" name="category" />
          <ControlledInput placeholder="date" name="date" type="date" />
          <ControlledInput placeholder="city" name="city" />
          <ControlledInput placeholder="venue" name="venue" />
          <Button floated="right" positive type="submit" content="Submit" />
          <Button
            as={Link}
            to={"/activities"}
            floated="right"
            type="button"
            content="Cancel"
          />
        </Form>
      </FormProvider>
    </Segment>
  );
}
