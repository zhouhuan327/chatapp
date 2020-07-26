import React from "react";
import PropTypes from "prop-types";
import StyledInput, { InputContainer, Prefix, Suffx } from "./style.js";
function Input({ placeholder = "请输入文字", prefix, suffix, ...rest }) {
    return (
        <InputContainer>
            {prefix && <Prefix>{prefix}</Prefix>}
            <StyledInput placeholder={placeholder}></StyledInput>
            {suffix && <Suffx>{suffix}</Suffx>}
        </InputContainer>
    );
}

Input.propTypes = {
    placeholder: PropTypes.string,
    prefix: PropTypes.any,
    suffix: PropTypes.any,
};

export default Input;
