import React from "react";
import StyledSelect from "./style";
import LabelContainer from "/@/components/LabelContainer";
interface SelectPros {
  label?: string;
  [rest: string]: any;
}
const Select: React.FC<SelectPros> = ({ label, children, ...rest }) => {
  const select = <StyledSelect {...rest}>{children}</StyledSelect>;
  return label ? (
    <LabelContainer label={label}>{select}</LabelContainer>
  ) : (
    select
  );
};

export default Select;
