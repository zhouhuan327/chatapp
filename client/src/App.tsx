import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "./utils/theme";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { pageRouters } from "./router";
import "antd/dist/antd.css";
function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <Switch>
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
