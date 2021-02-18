import React, { memo, useEffect } from "react";
import StyledRecentChatList, { ChatList } from "./style";
import MessageCard from "components/MessageCard";
import face1 from "assets/images/avatar.jpeg";
import FilterList from "../../components/FilterList";
import { animated } from "react-spring";
import useAnimeList from "hooks/useAnimeList";
import { selector, useRecoilState, useRecoilValue } from "recoil";
import { currentChatState } from "store";
import { getRecentMessage } from "../../api";

const recentChatsState = selector({
  key: "recentChatsState",
  get: async () => {
    const res = await getRecentMessage();
    return res?.code === 200 ? res.data : [];
  },
});

const RecentChatList = () => {
  const anime = useAnimeList(6);
  // 最近消息列表
  const recentChats = useRecoilValue<Array<RecentChat>>(recentChatsState);
  // 当前选中的聊天
  const [currentChat, setCurrentChat] = useRecoilState<RecentChat>(
    currentChatState,
  );
  // 默认用列表的第一条作为当前选中的聊天
  useEffect(() => {
    if (recentChats.length) {
      setCurrentChat(recentChats[0]);
    }
  }, [recentChats, setCurrentChat]);
  return (
    <StyledRecentChatList>
      <FilterList
        filterLabel="列表排序"
        actionLabel="创建会话"
        option={["最新消息优先", "在线好友优先"]}
      >
        <ChatList>
          {recentChats.map((item, index) => (
            <animated.div key={item._id} style={anime[index]}>
              <MessageCard
                active={item._id === currentChat?._id}
                replied={index % 2 === 0}
                avatarSrc={face1}
                name={item.name}
                avatarStatus="online"
                statusText="在线"
                time={item.time}
                message={item.content}
                unreadCount={2}
                onClick={() => setCurrentChat(item)}
              />
            </animated.div>
          ))}
        </ChatList>
      </FilterList>
    </StyledRecentChatList>
  );
};

export default memo(RecentChatList);
