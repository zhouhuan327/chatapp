import React from "react";
import PropTypes from "prop-types";
import StyledChatApp, { Nav, SideBar, Content, Drawer } from "./style.js";
import NavBar from "components/NavBar/index.js";
import MessageList from "components/MessageList/index.js";
import Conversation from "components/Conversation/index.js";
import FileList from "components/FileList/index.js";
import Profile from "components/Profile/index.js";
import { Route, Switch } from "react-router-dom";
import ContactList from "components/ContactList/index.js";
function ChatApp({ ...rest }) {
  return (
    <StyledChatApp {...rest}>
      <Nav>
        <NavBar />
      </Nav>
      <SideBar>
        <Switch>
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
      </SideBar>
      <Content>
        <Conversation />
      </Content>
      {/* <Drawer>
        <Profile />
      </Drawer> */}
    </StyledChatApp>
  );
}

ChatApp.propTypes = {
  children: PropTypes.any,
};

export default ChatApp;
