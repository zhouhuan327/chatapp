import styled from "styled-components";
import { IconProps } from ".";
const StyledIcon = styled.div<IconProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  svg,
  svg * {
    ${({ color }) => (color ? `fill:${color}` : "")};
    ${({ opacity }) => (opacity ? `opacity:${opacity}` : "")};
  }
`;
export default StyledIcon;
