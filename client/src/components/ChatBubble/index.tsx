import React, { memo } from "react";
import StyledChatBubble, {
  Avatar,
  Bubble,
  Tip,
  MessageText,
  Time,
} from "./style";
import { ReactComponent as BubbleIcon } from "assets/icons/bubbleTip.svg";
export interface ChatBubbleProps {
  type?: "mine" | "others";
  time?: string;
  [rest: string]: any;
}
const ChatBubble: React.FC<ChatBubbleProps> = ({
  type = "others",
  time,
  avatarSrc,
  children,
  ...rest
}) => {
  return (
    <StyledChatBubble type={type} {...rest}>
      <Avatar src={avatarSrc} />
      <div>
        <Bubble>
          <Tip icon={BubbleIcon} color="white" width={38} height={28}></Tip>
          <MessageText>{children}</MessageText>
        </Bubble>
        <Time>{time}</Time>
      </div>
    </StyledChatBubble>
  );
};

export default memo(ChatBubble);
