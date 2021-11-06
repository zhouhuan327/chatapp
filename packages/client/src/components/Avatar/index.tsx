import React, { FC, memo } from "react";
import { StyledAvatar, StatusIcon, AvatarWrapper } from "./style";
import { getDownloadUrl } from "/@/api";
interface AvatarProps {
  /** 图片路径 */
  src?: string;
  /** 尺寸 默认48px */
  size?: string;
  /** 状态 online在线 offline不在线 */
  status?: "online" | "offline";
  /** 状态icon尺寸 默认8px */
  statusIconSize?: string;
  [rest: string]: any;
}
const Avatar: FC<AvatarProps> = ({
  src = "123",
  size = "48px",
  status,
  statusIconSize = "6px",
  ...rest
}) => (
  <StyledAvatar {...rest}>
    {status && <StatusIcon status={status} size={statusIconSize} />}
    <AvatarWrapper size={size}>
      <img src={getDownloadUrl(src)} alt="" />
    </AvatarWrapper>
  </StyledAvatar>
);

export default memo(Avatar);
