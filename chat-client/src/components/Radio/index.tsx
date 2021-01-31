import React, { FC } from "react";
import StyledRadio, { Circle, RadioButton, StyledRadioGroup } from "./style";
import LabelContainer from "components/LabelContainer";
interface RadioProps {
  name: string;
  [rest: string]: any;
}
interface RadioGroupProps {
  label: string;
  [rest: string]: any;
}
type RadioType = FC<RadioProps> & { Group: FC<RadioGroupProps> };
const Radio: RadioType = ({ name, children, ...rest }) => {
  return (
    <StyledRadio {...rest}>
      {children}
      <RadioButton name={name} />
      <Circle />
    </StyledRadio>
  );
};
const RadioGroup: FC<RadioGroupProps> = ({ label, children, ...rest }) => {
  return (
    <LabelContainer label={label}>
      <StyledRadioGroup {...rest}>{children}</StyledRadioGroup>
    </LabelContainer>
  );
};

Radio.Group = RadioGroup;

export default Radio;
