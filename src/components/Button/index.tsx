import React from "react";
import StyledButton from "./style";
export interface ButtonProps {
  type?: "primary";
  shape?: "circle" | "rect";
  bgColor?: string;
  size?: string;
}
const Button: React.FC<ButtonProps> = ({
  children,
  type = "primary",
  shape = "circle",
  size = "30px",
  bgColor,
  ...rest
}) => {
  return (
    <StyledButton
      shape={shape}
      type={type}
      size={size}
      bgColor={bgColor}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
