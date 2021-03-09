import React, { memo } from "react";
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
import { useRecoilState, useRecoilValue } from "recoil";
import { socketInstance } from "store/socket";
import { newMessageState } from "../../store";
import { message } from "antd";

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
  const [content, setContent] = useRecoilState<string>(newMessageState);

  const handleSubmit = () => {
    if (content?.length === 0) {
      message.warn("请输入内容");
      return;
    }
    const { id, type } = currentChat;
    if (!id) return;
    if (type === "friend") {
      socket.emit("friendChatMessage", {
        senderId: userId,
        receiverId: id,
        content: content,
        type: "text",
      });
    } else {
      socket.emit("groupChatMessage", {
        senderId: userId,
        groupId: id,
        content: content,
        type: "text",
      });
    }
    // 发送后清空消息栏
    setContent("");
  };
  return (
    <StyledFooter style={{ ...animeProps }}>
      <Input
        placeholder="输入想要说的话"
        prefix={<Icon icon={ClipIcon} />}
        suffix={
          <IconContainer>
            <Popover offset={{ x: "-25%" }} content={<PopoverContent />}>
              <Icon icon={SmileIcon} />
            </Popover>
            <Icon icon={MicrophoneIcon} />
            <Button size="52px" onClick={handleSubmit}>
              <Icon
                color="white"
                icon={PlaneIcon}
                style={{ transform: "translateX(-2px)" }}
              />
            </Button>
          </IconContainer>
        }
        onEnter={handleSubmit}
      />
    </StyledFooter>
  );
}

export default memo(Footer);
