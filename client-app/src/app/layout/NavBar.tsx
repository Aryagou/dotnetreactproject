import React from "react";
import { useSetRecoilState } from "recoil";
import { Container, Menu, Button } from "semantic-ui-react";
import { activityState } from "../../atoms/activity-atom";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  const setActivityState = useSetRecoilState(activityState);
  // const handleClick = () => {
  //   setActivityState({
  //     activityId: null,
  //     isEdit: true,
  //     isView: false,
  //   });
  // };
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/" exact header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item as={NavLink} to="/activities" name="Activities" />
        <Menu.Item as={NavLink} to="/createActivity">
          <Button positive content="Create Activity" />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
