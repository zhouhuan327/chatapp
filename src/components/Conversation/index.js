import React from 'react';
import PropTypes from 'prop-types';
import StyledConversation, { Conversations, MyChatBubble } from './style.js';
import TitleBar from 'components/TitleBar/index.js';
import Footer from 'components/Footer/index.js';
import ChatBubble from 'components/ChatBubble/index.js';
import VoiceMessage from 'components/VoiceMessage/index.js';
function Conversation({ children, ...rest }) {
  return (
    <StyledConversation {...rest}>
      <TitleBar name="sean" />
      <Conversations>
        <ChatBubble time="昨天 下午13：25">hi ,在忙什么</ChatBubble>
        <MyChatBubble time="昨天 下午13：35">加班改bug</MyChatBubble>
        <ChatBubble time="昨天 下午15：25">
          <VoiceMessage time="01:44" />
        </ChatBubble>
        <MyChatBubble time="昨天 下午15：45">顶不住了</MyChatBubble>
        <ChatBubble time="昨天 下午15：25">啊这</ChatBubble>
        <MyChatBubble time="昨天 下午15：45">顶不住了</MyChatBubble>
        <ChatBubble time="昨天 下午15：25">
          <VoiceMessage time="01:44" />
        </ChatBubble>
        <MyChatBubble time="昨天 下午15：45">顶不住了</MyChatBubble>
        <ChatBubble time="昨天 下午15：25">
          很长很长 很长很长 很长很长 很长很长 很长很长 很长很长 很长很长 很长很长 很长很长
          很长很长 很长很长 很长很长 很长很长 很长很长 很长很长 很长很长 很长很长 很长很长
        </ChatBubble>
        <MyChatBubble time="昨天 下午15：45">
          很长很长 很长很长 很长很长 很长很长 很长很长 很长很长 很长很长 很长很长 很长很长
          很长很长 很长很长 很长很长 很长很长 很长很长 很长很长 很长很长 很长很长 很长很长
        </MyChatBubble>
      </Conversations>
      <Footer />
    </StyledConversation>
  );
}

Conversation.propTypes = {
  children: PropTypes.any,
};

export default Conversation;
