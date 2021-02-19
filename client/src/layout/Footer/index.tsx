import React, { memo, useEffect, useState } from "react";
import StyledFooter, { IconContainer, StyledPopoverContent } from "./style";
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
import { useRecoilValue } from "recoil";
import { socketInstance } from "store/socket";

const PopoverContent = () => (
  <StyledPopoverContent>
    <Emoji label="smile">😁</Emoji>
    <Emoji label="cry">😢</Emoji>
    <Emoji label="ok">👌</Emoji>
    <Emoji label="cool">😎</Emoji>
    <Icon icon={OptionsIcon} style={{ marginLeft: "24px" }} />
  </StyledPopoverContent>
);
function Footer({ userId, currentChat, setList, animeProps }) {
  const socket = useRecoilValue(socketInstance);
  const [message, setMessage] = useState<string>("");

  const onSubmit = () => {
    const { id, type } = currentChat;
    if (!id) return;
    if (type === "friend") {
      socket.emit("friendChatMessage", {
        senderId: userId,
        receiverId: id,
        content: message,
        type: "text",
      });
    } else {
      socket.emit("groupChatMessage", {
        senderId: userId,
        groupId: id,
        content: message,
        type: "text",
      });
    }
  };
  return (
    <StyledFooter style={{ ...animeProps }}>
      <Input
        placeholder="输入想要说的话"
        prefix={<Icon icon={ClipIcon} />}
        onChange={v => {
          setMessage(v);
        }}
        suffix={
          <IconContainer>
            <Popover offset={{ x: "-25%" }} content={<PopoverContent />}>
              <Icon icon={SmileIcon} />
            </Popover>
            <Icon icon={MicrophoneIcon} />
            <Button size="52px" onClick={onSubmit}>
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

export default memo(Footer);
