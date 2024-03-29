import React, { memo } from "react";
import StyledMessageCard, { Name, Status, Time, Message, MessageText, UnreadBadge } from "./style";
import Avatar from "/@/components/Avatar";
import { useTheme } from "styled-components";
import Icon from "/@/components/Icon";
import { ReactComponent as Replied } from "/@/assets/icons/replied.svg";
interface MessageCardProps {
  avatarSrc?: string;
  avatarStatus: any;
  statusText: any;
  name: any;
  time: any;
  message: any;
  unreadCount?: number;
  active: boolean;
  replied: boolean; // 是否回复
  [rest: string]: any;
}
const MessageCard: React.FC<MessageCardProps> = ({
  avatarSrc = "",
  avatarStatus,
  statusText,
  name,
  time,
  message,
  unreadCount = 0,
  active,
  replied,
  ...rest
}) => {
  const theme: any = useTheme();
  return (
    <StyledMessageCard active={active} {...rest}>
      <Avatar status={avatarStatus} src={avatarSrc} />
      <Name>{name}</Name>
      <Status>{statusText}</Status>
      <Time>{time}</Time>
      <Message replied={replied}>
        {replied && (
          <Icon
            width={16}
            height={14}
            icon={Replied}
            color={active ? theme.inactiveColorDark : theme.inactiveColor}
            opacity={active ? 0.4 : 1}
            style={{
              justifyContent: "start",
            }}
          />
        )}
        <MessageText>{message}</MessageText>
        <UnreadBadge count={unreadCount} />
      </Message>
    </StyledMessageCard>
  );
};

export default memo(MessageCard);
