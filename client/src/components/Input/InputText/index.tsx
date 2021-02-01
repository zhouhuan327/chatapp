import React, { FC } from "react";
import StyledInputText, { InputUnderLine } from "./style";
import LabelContainer from "components/LabelContainer";
export interface InputTextProps {
  label?: string;
  placeholder?: string;
  [rest: string]: any;
}
const InputText: FC<InputTextProps> = ({
  label,
  placeholder = "请输入内容",
  ...rest
}) => {
  const input = <InputUnderLine type="text" placeholder={placeholder} />;
  return (
    <StyledInputText {...rest}>
      {label ? <LabelContainer label={label}>{input}</LabelContainer> : input}
    </StyledInputText>
  );
};

export default InputText;
