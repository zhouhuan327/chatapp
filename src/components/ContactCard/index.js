import React from 'react';
import PropTypes from 'prop-types';
import StyledContactCard, { Name, Intro } from './style.js';
import avatar from 'assets/images/avatar.jpeg';
import Avatar from 'components/Avatar/index.js';
function ContactCard({ ...rest }) {
  return (
    <StyledContactCard {...rest}>
      <Avatar src={avatar} status="online" />
      <Name>周杰伦</Name>
      <Intro>这个人很懒，没有个性签名</Intro>
    </StyledContactCard>
  );
}

ContactCard.propTypes = {
  children: PropTypes.any,
};

export default ContactCard;
