import React from "react";
import PropTypes from "prop-types";
import StyledSwitch, { Checkbox, Slider } from "./style.js";
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
