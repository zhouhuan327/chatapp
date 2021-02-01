import styled, { css } from "styled-components";
import { circle } from "utils/mixin";
import { BadgePros } from ".";
interface Badge extends BadgePros {
  /** 传入了children则为一个左上角的红点，默认为数字圆圈 */
  variant: "dot" | "default";
}
const variants = {
  dot: css<Badge>`
    position: relative;
    padding: 5px;
    &::after {
      display: ${({ show }) => (show ? "block" : "none")};
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      ${({ theme }) => circle(theme.red, "6px")}
    }
  `,
  default: css<Badge>`
    ${({ theme }) => circle(theme.red, "18px")};
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 18px 40px 0px rgba(0, 0, 0, 0.04),
      0px 6px 12px 0px rgba(0, 0, 0, 0.08);
    ${({ showZero, count }) => !showZero && count === 0 && `visibility:hidden`}
  `,
};
const StyledBadge = styled.div<Badge>`
  display: inline-block;
  ${({ variant }) => variants[variant]}
`;
export const Count = styled.div`
  font-size: ${({ theme }) => theme.small};
  color: white;
`;

export default StyledBadge;
