import React, { FC } from "react";
import StyledInput, { InputContainer, Prefix, Suffx } from "./style";
import Icon from "components/Icon";
import { ReactComponent as SearchIcon } from "assets/icons/search.svg";
import { useTheme } from "styled-components";
import InputText, { InputTextProps } from "./InputText/index";
interface InputProps {
  placeholder?: string;
  prefix?: any;
  suffix?: any;
  [rest: string]: any;
}
interface SearchProps {
  placeholder?: string;
}
type InputType = FC<InputProps> & {
  Search: FC<SearchProps>;
  Text: FC<InputTextProps>;
};
const Input: InputType = ({
  placeholder = "请输入文字",
  prefix,
  suffix,
  ...rest
}) => {
  return (
    <InputContainer {...rest}>
      {prefix && <Prefix>{prefix}</Prefix>}
      <StyledInput placeholder={placeholder}></StyledInput>
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
Input.Search = Search;
Input.Text = InputText;

export default Input;
