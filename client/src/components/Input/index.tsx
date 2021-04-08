import React, { FC, useState } from "react";
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
  onSearch?: (value: string) => void;
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

const Search: FC<SearchProps> = ({
  onSearch,
  placeholder = "请输入搜索内容...",
}) => {
  const theme: any = useTheme();
  const [value, setValue] = useState<string>("");
  return (
    <Input
      value={value}
      placeholder={placeholder}
      onChange={e => setValue(e.target.value)}
      suffix={
        <Icon
          style={{ cursor: "pointer" }}
          icon={SearchIcon}
          color={theme.primaryColor}
          width={18}
          height={18}
          onClick={() => {
            onSearch?.(value);
          }}
        />
      }
    />
  );
};

export { Input, Search };
