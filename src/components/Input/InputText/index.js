import React from "react";
import PropTypes from "prop-types";
import StyledInputText, { InputUnderLine } from "./style.js";
import LabelContainer from "components/LabelContainer/index.js";
function InputText({ label, placeholder = "请输入内容", ...rest }) {
  const input = <InputUnderLine type="text" placeholder={placeholder} />;
  return (
    <StyledInputText {...rest}>
      {label ? <LabelContainer label={label}>{input}</LabelContainer> : input}
    </StyledInputText>
  );
}

InputText.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

export default InputText;
