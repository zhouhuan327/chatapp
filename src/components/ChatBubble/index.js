import React from 'react';
import PropTypes from 'prop-types';
import StyledChatBubble, { Bubble, Tip, MessageText, Time } from './style.js';
import { ReactComponent as BubbleIcon } from 'assets/icons/bubbleTip.svg';
function ChatBubble({ children, type, time, ...rest }) {
  return (
    <StyledChatBubble type={type} {...rest}>
      <Bubble>
        <Tip icon={BubbleIcon} color="white" width={48} height={28}></Tip>
        <MessageText>{children}</MessageText>
      </Bubble>
      <Time>{time}</Time>
    </StyledChatBubble>
  );
}

ChatBubble.propTypes = {
  children: PropTypes.any,
  type: PropTypes.oneOf(['mine']),
  time: PropTypes.string,
};

export default ChatBubble;
