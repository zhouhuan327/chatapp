import React from "react";
import StyledChatApp, { Nav, SideBar, Content, Drawer } from "./style";
import NavBar from "layout/NavBar";
import Conversation from "layout/Conversation";
import Profile from "layout/Profile";
import { Route, Switch, useLocation } from "react-router-dom";
import { useTransition } from "react-spring";
import { animated } from "react-spring";
import { useRecoilValue } from "recoil";
import { profileVisible } from "store/root";
import { routers } from "../router";
function ChatApp({ ...rest }) {
  const location = useLocation();
  const getFirstSgmtPath = location => location.pathname.split("/")[1];
  const show = useRecoilValue(profileVisible);

  const transitions = useTransition(location, getFirstSgmtPath, {
    from: { opacity: 0, transform: "translate3d(-100px, 0, 0)" },
    enter: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    leave: { opacity: 0, transform: "translate3d(-100px, 0, 1)" },
  });
  return (
    <StyledChatApp {...rest}>
      <Nav>
        <NavBar />
      </Nav>
      <SideBar>
        {transitions.map(({ item, props, key }) => (
          <animated.div key={key} style={props}>
            <Switch location={item}>
              {routers.map(route => (
                <Route exact={route.exact} path={route.path}>
                  {route.component}
                </Route>
              ))}
            </Switch>
          </animated.div>
        ))}
      </SideBar>
      <Content>
        <Conversation />
      </Content>
      <Drawer show={show}>
        <Profile />
      </Drawer>
    </StyledChatApp>
  );
}

export default ChatApp;
