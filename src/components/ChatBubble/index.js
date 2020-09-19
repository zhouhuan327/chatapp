import React from 'react';
import PropTypes from 'prop-types';
import StyledChatBubble, { Avatar, Bubble, Tip, MessageText, Time } from './style.js';
import { ReactComponent as BubbleIcon } from 'assets/icons/bubbleTip.svg';
import face1 from 'assets/images/avatar.jpeg';
function ChatBubble({ children, type, time, ...rest }) {
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
}

ChatBubble.propTypes = {
  children: PropTypes.any,
  type: PropTypes.oneOf(['mine']),
  time: PropTypes.string,
};

export default ChatBubble;
