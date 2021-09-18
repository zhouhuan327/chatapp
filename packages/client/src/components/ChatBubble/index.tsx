import React, { memo } from "react";
import StyledChatBubble, { Avatar, Bubble, Tip, MessageText, Time } from "./style";
import { ReactComponent as BubbleIcon } from "/@/assets/icons/bubbleTip.svg";
import { getDownloadUrl } from "/@/api";
export interface ChatBubbleProps {
  type?: "mine" | "others";
  contentType: "text" | "file";
  time?: string;
  [rest: string]: any;
}
const ChatBubble: React.FC<ChatBubbleProps> = ({
  type = "others",
  contentType = "text",
  time,
  avatarSrc,
  children,
  ...rest
}) => {
  const handleImgError = e => {
    console.log(e);
    const img = e.target;
    img.src = getDownloadUrl("file_icon.png");
    img.οnerrοr = null;
  };
  let content;
  if (contentType === "text") {
    content = children;
  }
  if (contentType === "file") {
    content = (
      <img
        style={{ width: 200, height: "auto" }}
        src={getDownloadUrl(children)}
        alt="该文件不支持预览"
      />
    );
  }
  return (
    <StyledChatBubble type={type} {...rest}>
      <Avatar src={avatarSrc} />
      <div>
        <Bubble>
          <Tip icon={BubbleIcon} color="white" width={38} height={28} />
          <MessageText>{content}</MessageText>
        </Bubble>
        <Time>{time}</Time>
      </div>
    </StyledChatBubble>
  );
};

export default memo(ChatBubble);
