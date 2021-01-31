import React, { memo } from "react";
import StyledChatBubble, {
  Avatar,
  Bubble,
  Tip,
  MessageText,
  Time,
} from "./style";
import { ReactComponent as BubbleIcon } from "assets/icons/bubbleTip.svg";
import face1 from "assets/images/avatar.jpeg";
export interface ChatBubbleProps {
  type?: "mine" | "others";
  time?: string;
  [rest: string]: any;
}
const ChatBubble: React.FC<ChatBubbleProps> = ({
  type = "others",
  time,
  children,
  ...rest
}) => {
  return (
    <StyledChatBubble type={type} {...rest}>
      <Avatar src={face1} />
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
