import React from "react";
import PropTypes from "prop-types";
import StyledInput, { InputContainer, Prefix, Suffx } from "./style.js";
import Icon from "components/Icon/index.js";
import { ReactComponent as SearchIcon } from "assets/icons/search.svg";
import { useTheme } from "styled-components";
function Input({ placeholder = "请输入文字", prefix, suffix, ...rest }) {
    return (
        <InputContainer>
            {prefix && <Prefix>{prefix}</Prefix>}
            <StyledInput placeholder={placeholder}></StyledInput>
            {suffix && <Suffx>{suffix}</Suffx>}
        </InputContainer>
    );
}

function Search({ placeholder = "请输入搜索内容...", ...rest }) {
    const theme = useTheme();
    return (
        <Input
            placeholder={placeholder}
            prefix={<Icon icon={SearchIcon} color={theme.gray3} width={18} height={18} />}
            {...rest}
        />
    );
}
Input.Search = Search;

Input.propTypes = {
    placeholder: PropTypes.string,
    prefix: PropTypes.any,
    suffix: PropTypes.any,
};

export default Input;
