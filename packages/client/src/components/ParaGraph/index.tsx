import React from "react";
import StyledParaGraph from "./style";
interface ParaGraphProps {
  /** 超出部分是否显示为... */
  ellipsis?: boolean;
  [rest: string]: any;
}
const ParaGraph: React.FC<ParaGraphProps> = ({ children, ellipsis, ...rest }) => {
  return (
    <StyledParaGraph as="p" ellipsis={ellipsis} {...rest}>
      {children}
    </StyledParaGraph>
  );
};

export default ParaGraph;
