import React, { FC, FunctionComponent } from "react";
import SocialIcon, { SocialIconProps } from "./Social";
import StyledIcon from "./style";
type SVGComponent = FunctionComponent<React.SVGProps<any>>;
export interface IconProps {
  icon?: SVGComponent;
  width?: number | string;
  height?: number | string;
  color?: string;
  opacity?: number;
  [rest: string]: any;
}
type IconType = FC<IconProps> & { Social: FC<SocialIconProps> };
const Icon: IconType = ({
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
