import React from 'react';
import PropTypes from 'prop-types';
import StyledMessageList from './style.js';
import { ChatList } from './style.js';
import Filter from 'components/Filter/index';
import Select from 'components/Select';
import Option from 'components/Option';
import Button from 'components/Button';
import Icon from 'components/Icon';
import { ReactComponent as Plus } from 'assets/icons/plus.svg';
import Input from 'components/Input/index.js';
import MessageCard from 'components/MessageCard/index.js';
import face1 from 'assets/images/avatar.jpeg';
const { Filters, Action } = Filter;

function ChatFilter() {
  return (
    <Filter>
      <Filters label="列表排序">
        <Select>
          <Option>最新消息优先</Option>
          <Option>在线好友优先</Option>
        </Select>
      </Filters>
      <Action label="创建会话">
        <Button>
          <Icon icon={Plus} width={12} height={12} />
        </Button>
      </Action>
    </Filter>
  );
}

function MessageList({ children, ...rest }) {
  return (
    <StyledMessageList {...rest}>
      <Input.Search />
      <ChatFilter />
      <ChatList>
        {[1, 2, 3, 4, 5, 6].map((item, index) => (
          <MessageCard
            key={index}
            active={index === 3}
            replied={index % 2 === 0}
            avatarSrc={face1}
            name="周杰伦"
            avatarStatus="online"
            statusText="在线"
            time="3 小时之前"
            message="不错哦"
            unreadCount={2}
          />
        ))}
      </ChatList>
    </StyledMessageList>
  );
}

MessageList.propTypes = {
  children: PropTypes.any,
};

export default MessageList;
