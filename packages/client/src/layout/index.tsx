import React, { useEffect } from "react";
import StyledChatApp, { Nav, SideBar, Content, Drawer } from "./style";
import NavBar from "/@/layout/NavBar";
import ChatPanel from "/@/layout/ChatPanel";
import Profile from "/@/layout/Profile";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { useTransition, animated } from "react-spring";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userInfoAtom, detailDrawerAtom } from "/@/store";
import { routers } from "../router";
import { getUserInfo } from "/@/api";
function ChatApp({ ...rest }) {
  const history = useHistory();
  const setUserInfo = useSetRecoilState(userInfoAtom);
  const location = useLocation();
  const visible = useRecoilValue(detailDrawerAtom).visible;
  useEffect(() => {
    getUserInfo().then(res => {
      setUserInfo(res.data);
    });
  }, []);
  const transitions = useTransition(location, location.pathname, {
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
                <Route key={route.path} path={route.path} exact={route.exact}>
                  {route.component}
                </Route>
              ))}
            </Switch>
          </animated.div>
        ))}
      </SideBar>
      <Content>
        <ChatPanel />
      </Content>
      <Drawer show={visible}>
        <Profile />
      </Drawer>
    </StyledChatApp>
  );
}

export default ChatApp;
