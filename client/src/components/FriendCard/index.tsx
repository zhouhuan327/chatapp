import React, { memo } from "react";
import StyledFriendCard, { Name, Intro } from "./style";
import Avatar from "components/Avatar";
interface FriendCardProps {
  avatarSrc: string;
  status?: "online" | "offline";
  name: string;
  intro: string;
}
const FriendCard: React.FC<FriendCardProps> = ({
  avatarSrc,
  name,
  intro,
  status,
  ...rest
}) => {
  return (
    <StyledFriendCard {...rest}>
      <Avatar src={avatarSrc} status={status} />
      <Name>{name}</Name>
      <Intro>{intro}</Intro>
    </StyledFriendCard>
  );
};

export default memo(FriendCard);
