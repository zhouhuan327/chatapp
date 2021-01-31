import React from "react";
import { addDecorator, addParameters } from "@storybook/react";
import { ThemeProvider } from "styled-components";

import theme from "../src/utils/theme";
import "utils/story.css";
addDecorator(storyFn => {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: "24px" }}>{storyFn()}</div>
    </ThemeProvider>
  );
});
addParameters({
  options: {
    showRoots: true,
  },
});
