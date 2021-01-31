import React from "react";
import StyledOption from "./style";
function Option({ children, ...rest }) {
  return <StyledOption {...rest}>{children}</StyledOption>;
}

export default Option;
