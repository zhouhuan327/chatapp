import React, { FunctionComponent } from "react";
import SocialIcon from "./Social";
import StyledIcon from "./style";
type Icon = FunctionComponent<React.SVGProps<any>>;
export interface IconProps {
  icon?: Icon;
  width?: number | string;
  height?: number | string;
  color?: string;
  opacity?: number;
}
type IconComponentType = React.FC<IconProps> & { Social };
const Icon: IconComponentType = ({
  icon: IconComponent,
  width = 24,
  height = 24,
  color,
  opacity,
  ...rest
}) => {
  return (
    <StyledIcon color={color} opacity={opacity} {...rest}>
      {IconComponent && <IconComponent width={width} height={height} />}
    </StyledIcon>
  );
};
Icon.Social = SocialIcon;

export default Icon;
