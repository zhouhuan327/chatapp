import React, { FC, memo } from "react";
import StyledBadge, { Count } from "./style";
export interface BadgePros {
  show?: boolean;
  count?: number;
  showZero?: boolean;
  [rest: string]: any;
}
const Badge: FC<BadgePros> = ({ children, show = false, count = 0, showZero = false, ...rest }) => {
  return (
    <StyledBadge
      variant={children ? "dot" : "default"}
      show={show}
      count={count}
      showZero={showZero}
      {...rest}
    >
      {children || <Count>{count}</Count>}
    </StyledBadge>
  );
};

export default memo(Badge);
