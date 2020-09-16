import React from "react";
import PropTypes from "prop-types";
import StyledRadio, { Circle, RadioButton, StyledRadioGroup } from "./style.js";
import LabelContainer from "components/LabelContainer";
function Radio({ name, children, ...rest }) {
  return (
    <StyledRadio {...rest}>
      {children}
      <RadioButton name={name} />
      <Circle />
    </StyledRadio>
  );
}
function RadioGroup({ label, children, ...rest }) {
  return (
    <LabelContainer label={label}>
      <StyledRadioGroup {...rest}>{children}</StyledRadioGroup>
    </LabelContainer>
  );
}
Radio.Group = RadioGroup;
Radio.propTypes = {
  name: PropTypes.string,
  children: PropTypes.any,
};
Radio.Group.PropTypes = {
  label: PropTypes.string,
  children: PropTypes.any,
};
export default Radio;
