import ChatApp from "layout";
import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "./utils/theme";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ChatApp />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
