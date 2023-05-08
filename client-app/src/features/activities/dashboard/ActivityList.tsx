import { Fragment } from "react";
import { useRecoilValue } from "recoil";
import { Header, Item, Segment } from "semantic-ui-react";
import { getGroupedActivities } from "../../../atoms/selectors";
import { Activity } from "../../../web-api-client";
import ActivityItem from "./ActivityItem";

interface Props {
  activities: Activity[];
}

// [todo] might need to consider optimiseing this one as it's rendered twice
export default function ActivityList() {
  const groupedActivities = useRecoilValue(getGroupedActivities);
  return (
    <>
      {groupedActivities.map(([date, activities]) => (
        // Fragment doesn't really make sense here, would prefer div with some styling
        <Fragment key={date}>
          <Header sub color="teal">
            {date}
          </Header>
          <Segment>
            <Item.Group divided>
              {activities.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </Item.Group>
          </Segment>
        </Fragment>
      ))}
    </>
  );
}
