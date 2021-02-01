import ChatApp from "layout";
import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "./utils/theme";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <ChatApp />
        </RecoilRoot>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
