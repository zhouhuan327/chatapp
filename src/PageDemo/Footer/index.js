/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import PropTypes from "prop-types";
import StyledFooter, { IconContainer, StyledPopoverContent } from "./style.js";
import Input from "components/Input";
import Icon from "components/Icon";
import { ReactComponent as ClipIcon } from "assets/icons/clip.svg";
import { ReactComponent as SmileIcon } from "assets/icons/smile.svg";
import { ReactComponent as MicrophoneIcon } from "assets/icons/microphone.svg";
import { ReactComponent as PlaneIcon } from "assets/icons/plane.svg";
import { ReactComponent as OptionsIcon } from "assets/icons/options.svg";
import Button from "components/Button";
import Emoji from "components/Emoji";
import Popover from "components/Popover";
const PopoverContent = () => (
  <StyledPopoverContent>
    <Emoji lable="smile">😁</Emoji>
    <Emoji lable="cry">😢</Emoji>
    <Emoji lable="ok">👌</Emoji>
    <Emoji lable="cool">😎</Emoji>
    <Icon icon={OptionsIcon} style={{ marginLeft: "24px" }} />
  </StyledPopoverContent>
);
function Footer({ animeProps, style, ...rest }) {
  // const animeProps = useSpring({
  //   opacity: 1,
  //   transform: "translate3d(0,0,0)",
  //   from: { transform: "translate3d(-50px,0,0)" },
  //   delay: 600,
  // });
  return (
    <StyledFooter style={{ ...style, ...animeProps }} {...rest}>
      <Input
        placeholder="输入想要说的话"
        prefix={<Icon icon={ClipIcon} />}
        suffix={
          <IconContainer>
            <Popover offset={{ x: "-25%" }} content={<PopoverContent />}>
              <Icon icon={SmileIcon} />
            </Popover>
            <Icon icon={MicrophoneIcon} />
            <Button size="52px">
              <Icon
                color="white"
                icon={PlaneIcon}
                style={{ transform: "translateX(-2px)" }}
              />
            </Button>
          </IconContainer>
        }
      />
    </StyledFooter>
  );
}

Footer.propTypes = {
  children: PropTypes.any,
};

export default Footer;
