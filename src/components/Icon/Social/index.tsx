import React, { FC } from "react";
import Button from "components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export interface SocialIconProps {
  icon?: any;
  bgColor?: string;
  href?: string;
}
const SocialIcon: FC<SocialIconProps> = ({ icon = "plus", bgColor, href }) => {
  return (
    <Button
      size="30px"
      bgColor={bgColor}
      onClick={() => href && window.open(href, "_blank")}
    >
      <FontAwesomeIcon icon={icon} style={{ fontSize: 16 }} />
    </Button>
  );
};

export default SocialIcon;
