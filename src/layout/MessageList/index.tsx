import React, { memo } from "react";
import StyledMessageList, { ChatList } from "./style";
import MessageCard from "components/MessageCard";
import face1 from "assets/images/avatar.jpeg";
import FilterList from "../../components/FilterList";
import { animated } from "react-spring";
import useAnimeList from "hooks/useAnimesList";
import { useRecoilState } from "recoil";
import { activeMessage } from "store/root";

function MessageList({ ...rest }) {
  const anime = useAnimeList(6);
  const [active, setActive] = useRecoilState(activeMessage);
  return (
    <StyledMessageList {...rest}>
      <FilterList
        filterLabel="列表排序"
        actionLabel="创建会话"
        option={["最新消息优先", "在线好友优先"]}
      >
        <ChatList>
          {[0, 1, 2, 3, 4, 5, 6].map((item, index) => (
            <animated.div key={index} style={anime[index]}>
              <MessageCard
                key={index}
                active={index === active}
                replied={index % 2 === 0}
                avatarSrc={face1}
                name="周杰伦"
                avatarStatus="online"
                statusText="在线"
                time="3 小时之前"
                message="不错哦"
                unreadCount={2}
                onClick={() => setActive(index)}
              />
            </animated.div>
          ))}
        </ChatList>
      </FilterList>
    </StyledMessageList>
  );
}

export default memo(MessageList);
