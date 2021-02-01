import React from 'react';
import MessageCard from '.';
import face1 from 'assets/images/avatar.jpeg';
export default {
  title: 'UI组件/MessageCard',
  component: MessageCard,
};

export const Default = () => {
  return (
    <MessageCard
      avatarSrc={face1}
      name="周杰伦"
      avatarStatus="online"
      statusText="在线"
      time="3 小时之前"
      message="加油 奥利给"
      unreadCount={2}
    ></MessageCard>
  );
};
export const Active = () => {
  return (
    <MessageCard
      avatarSrc={face1}
      name="周杰伦"
      avatarStatus="online"
      statusText="在线"
      time="3 小时之前"
      message="激活状态"
      unreadCount={2}
      active
    ></MessageCard>
  );
};
export const Replied = () => {
  return (
    <>
      <MessageCard
        avatarSrc={face1}
        name="周杰伦"
        avatarStatus="online"
        statusText="在线"
        time="3 小时之前"
        message="已回复"
        unreadCount={2}
        replied
      ></MessageCard>
      <MessageCard
        avatarSrc={face1}
        name="周杰伦"
        avatarStatus="online"
        statusText="在线"
        time="3 小时之前"
        message="已回复"
        unreadCount={2}
        active
        replied
      ></MessageCard>
    </>
  );
};
