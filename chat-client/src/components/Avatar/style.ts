import styled, { css } from "styled-components";
import { circle } from "utils/mixin";

const circleMixin = (color, size = "8px") => css`
  content: "";
  display: block;
  position: absolute;
  ${circle(color, size)}
`;

const StyledAvatar = styled.div`
  position: relative;
`;
const StatusIcon = styled.div<{ size: string; status: "online" | "offline" }>`
  position: absolute;
  left: 2px;
  top: 2px;
  &::before {
    ${({ size }) => circleMixin("white", size)}
    transform:scale(2);
  }
  &::after {
    ${({ theme, status, size }) => {
      if (status === "online") {
        return circleMixin(theme.green, size);
      } else if (status === "offline") {
        return circleMixin(theme.gray, size);
      }
    }}
  }
`;
const AvatarWrapper = styled.div<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 50%;
  overflow: hidden;
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

export { StyledAvatar, StatusIcon, AvatarWrapper };
