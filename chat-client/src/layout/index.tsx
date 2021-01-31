import React from "react";
import StyledChatApp, { Nav, SideBar, Content, Drawer } from "./style";
import NavBar from "layout/NavBar";
import MessageList from "layout/MessageList";
import Conversation from "layout/Conversation";
import FileList from "layout/FileList";
import Profile from "layout/Profile";
import Settings from "./setting";
import { Route, Switch, useLocation } from "react-router-dom";
import ContactList from "layout/ContactList";
import { useTransition } from "react-spring";
import { animated } from "react-spring";
import { useRecoilValue } from "recoil";
import { profileVisible } from "store/root";
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
              <Route exact path="/">
                <MessageList />
              </Route>
              <Route exact path="/contacts">
                <ContactList />
              </Route>
              <Route exact path="/files">
                <FileList />
              </Route>
              <Route exact path="/settings">
                <Settings />
              </Route>
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
