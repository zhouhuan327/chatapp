import React from "react";
import StyledText from "./style";
interface TextPrps {
  type?: "primary" | "secondary" | "danger";
  size?: "xxsmall" | "xsmall" | "small" | "normal" | "medium" | "large" | "xlarge" | "xxlarge";
  bold?: boolean;
  [rest: string]: any;
}
const Text: React.FC<TextPrps> = ({
  type = "primary",
  size = "normal",
  bold,
  children,
  ...rest
}) => {
  return (
    <StyledText type={type} size={size} bold={bold} {...rest}>
      {children}
    </StyledText>
  );
};

export default Text;
