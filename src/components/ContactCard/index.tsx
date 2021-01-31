import React, { memo } from "react";
import StyledContactCard, { Name, Intro } from "./style";
import Avatar from "components/Avatar";
interface ContactCardProps {
  avatarSrc: string;
  name: string;
  intro: string;
}
const ContactCard: React.FC<ContactCardProps> = ({
  avatarSrc,
  name,
  intro,
  ...rest
}) => {
  return (
    <StyledContactCard {...rest}>
      <Avatar src={avatarSrc} status="online" />
      <Name>{name}</Name>
      <Intro>{intro}</Intro>
    </StyledContactCard>
  );
};

export default memo(ContactCard);
