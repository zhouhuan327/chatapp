import React from 'react';
import ChatBubble from '.';
import VoiceMessage from 'components/VoiceMessage';

export default {
  title: 'UI组件/ChatBubble',
  component: ChatBubble,
};

export const FromOthers = () => {
  return <ChatBubble time="昨天 下午12：23">住在山里的感觉真不错</ChatBubble>;
};
export const FromMine = () => {
  return (
    <ChatBubble type="mine" time="昨天 下午12：23">
      确实
    </ChatBubble>
  );
};
export const VoiceFromOhters = () => (
  <ChatBubble time="昨天 下午12：23">
    <VoiceMessage time="01:24"></VoiceMessage>
  </ChatBubble>
);

export const VoiceFromMine = () => (
  <ChatBubble type="mine" time="昨天 下午12：23">
    <VoiceMessage type="mine" time="01:24"></VoiceMessage>
  </ChatBubble>
);
