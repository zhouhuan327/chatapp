import React from "react";
import StyledSwitch, { Checkbox, Slider } from "./style";
function Switch({ ...rest }) {
  return (
    <StyledSwitch {...rest}>
      <Checkbox />
      <Slider />
    </StyledSwitch>
  );
}

Switch.propTypes = {};

export default Switch;
