import React from "react";
import StyledMessageList from "./style.js";
import { ChatList } from "./style.js";
import MessageCard from "components/MessageCard/index.js";
import face1 from "assets/images/avatar.jpeg";
import FilterList from "../FilterList";
import { animated } from "react-spring";
import useAnimesList from "hooks/useAnimesList";
function MessageList({ ...rest }) {
  const animes = useAnimesList(6);
  return (
    <StyledMessageList {...rest}>
      <FilterList
        filterLabel="列表排序"
        actionLabel="创建会话"
        option={["最新消息优先", "在线好友优先"]}
      >
        <ChatList>
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <animated.div key={index} style={animes[index]}>
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
            </animated.div>
          ))}
        </ChatList>
      </FilterList>
    </StyledMessageList>
  );
}

export default MessageList;
