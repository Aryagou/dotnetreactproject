import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { activityState } from "../../../atoms/activity-atom";
import { activityListState } from "../../../atoms/activity-list-atom";
import { ActivitiesClient } from "../../../HttpClients";
import { Activity } from "../../../web-api-client";
import { Link } from "react-router-dom";

interface Props {
  activity: Activity;
}

export default function ActivityItem({ activity }: Props) {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>
                {activity.title}
              </Item.Header>
              <Item.Description>Hosted by Bob</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" /> {activity.date}
          <Icon name="marker" /> {activity.venue}
        </span>
      </Segment>
      <Segment secondary>Attendees go here</Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          as={Link}
          to={`/activities/${activity.id}`}
          color="teal"
          floated="right"
          content="View"
        />
      </Segment>
    </Segment.Group>
  );
}
