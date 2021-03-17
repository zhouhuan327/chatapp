import React, { FC, forwardRef } from "react";
import StyledInput, { InputContainer, Prefix, Suffx } from "./style";
import Icon from "components/Icon";
import { ReactComponent as SearchIcon } from "assets/icons/search.svg";
import { useTheme } from "styled-components";
interface InputProps {
  placeholder?: string;
  prefix?: any;
  suffix?: any;
  onChange?: any;
  [rest: string]: any;
}
interface SearchProps {
  placeholder?: string;
}
const Input: FC<InputProps> = props => {
  const { form, placeholder = "请输入文字", prefix, suffix, ...rest } = props;
  return (
    <InputContainer>
      {prefix && <Prefix>{prefix}</Prefix>}
      <StyledInput placeholder={placeholder} {...rest} />
      {suffix && <Suffx>{suffix}</Suffx>}
    </InputContainer>
  );
};

const Search: FC<SearchProps> = ({ placeholder = "请输入搜索内容..." }) => {
  const theme: any = useTheme();
  return (
    <Input
      placeholder={placeholder}
      prefix={
        <Icon icon={SearchIcon} color={theme.gray3} width={18} height={18} />
      }
    />
  );
};

export { Input, Search };
