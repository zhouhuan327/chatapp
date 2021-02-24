import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "./utils/theme";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { pageRouters } from "./router";
import "antd/dist/antd.css";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <Switch>
            <Redirect exact to="/chat/message" from="/" />
            <Redirect exact to="/chat/message" from="/chat" />
            {pageRouters.map(route => (
              <Route key={route.path} path={route.path} exact={route.exact}>
                {route.component}
              </Route>
            ))}
          </Switch>
        </RecoilRoot>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
