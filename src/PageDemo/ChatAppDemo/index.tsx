import React, { useState } from "react";
import PropTypes from "prop-types";
import StyledChatApp, { Nav, SideBar, Content, Drawer } from "./style";
import NavBar from "PageDemo/NavBar";
import MessageList from "PageDemo/MessageList";
import Conversation from "PageDemo/Conversation";
import FileList from "PageDemo/FileList";
import Profile from "PageDemo/Profile";
import { Route, Switch, useLocation } from "react-router-dom";
import ContactList from "PageDemo/ContactList";
import { useTransition } from "react-spring";
import { animated } from "react-spring";
function ChatApp({ ...rest }) {
  const location = useLocation();

  const getFirstSgmtPath = (location) => location.pathname.split("/")[1];

  const transitions = useTransition(location, getFirstSgmtPath, {
    from: { opacity: 0, transform: "translate3d(-100px, 0, 0)" },
    enter: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    leave: { opacity: 0, transform: "translate3d(-100px, 0, 1)" },
  });

  const [show, setShow] = useState(false);
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

ChatApp.propTypes = {
  children: PropTypes.any,
};

export default ChatApp;
