import React from "react";
import PropTypes from "prop-types";
import StyledSelect from "./style.js";
import LabelContainer from "components/LabelContainer";
function Select({ label, type, children, ...rest }) {
  const select = (
    <StyledSelect type={type} {...rest}>
      {children}
    </StyledSelect>
  );
  return label ? (
    <LabelContainer label={label}>{select}</LabelContainer>
  ) : (
    select
  );
}

Select.propTypes = {
  children: PropTypes.any,
  label: PropTypes.string,
  type: PropTypes.oneOf(["form"]),
};

export default Select;
