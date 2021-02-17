import React, { memo } from "react";
import StyledMessageList, { ChatList } from "./style";
import MessageCard from "components/MessageCard";
import face1 from "assets/images/avatar.jpeg";
import FilterList from "../../components/FilterList";
import { animated } from "react-spring";
import useAnimeList from "hooks/useAnimesList";
import { selector, useRecoilState, useRecoilValue } from "recoil";
import { activeMessage } from "store";
import { getRecent } from "../../api";

const recentChats = selector({
  key: "recentChats",
  get: async ({ get }) => {
    const res = await getRecent();
    if (res?.code === 200) {
      return res.data;
    }
    return [];
  },
});
function MessageList({ ...rest }) {
  const anime = useAnimeList(6);
  const [active, setActive] = useRecoilState(activeMessage);
  const recentChatList = useRecoilValue(recentChats);

  return (
    <StyledMessageList {...rest}>
      <FilterList
        filterLabel="列表排序"
        actionLabel="创建会话"
        option={["最新消息优先", "在线好友优先"]}
      >
        <ChatList>
          {recentChatList.map((item, index) => (
            <animated.div key={item.id} style={anime[index]}>
              <MessageCard
                active={index === active}
                replied={index % 2 === 0}
                avatarSrc={face1}
                name={item.name}
                avatarStatus="online"
                statusText="在线"
                time="3 小时之前"
                message={item.content}
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
