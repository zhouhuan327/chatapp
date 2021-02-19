import React, { memo, useEffect } from "react";
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
import { socketInstance } from "../../store/socket";
import { newMessageState } from "../../store";

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
  const [newMessage, setNewMessage] = useRecoilState(newMessageState);
  useEffect(() => {
    socket.on("friendChatConnect", res => {
      addNotice("连接成功");
    });
    socket.on("groupChatConnect", res => {
      addNotice(res.message);
    });
  }, []);
  useEffect(() => {
    const { id, type } = currentChat;
    if (!id) return;
    if (type === "friend") {
      socket.emit("friendChatConnect", {
        senderId: userId,
        receiverId: id,
      });
    } else {
      socket.emit("groupChatConnect", {
        senderId: userId,
        groupId: id,
      });
    }
    console.log("current chagne ");
  }, [currentChat]);
  const addNotice = msg => {
    setList(old => [...old, { notice: msg }]);
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

export default memo(Footer);
