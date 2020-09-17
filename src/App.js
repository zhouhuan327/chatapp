import ChatApp from "components/ChatAppDemo";
import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "./utils/theme";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <ChatApp />
    </ThemeProvider>
  );
}

export default App;
