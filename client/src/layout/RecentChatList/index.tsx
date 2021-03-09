import React, { memo, useEffect } from "react";
import StyledRecentChatList, { ChatList } from "./style";
import MessageCard from "components/MessageCard";
import face1 from "assets/images/avatar.jpeg";
import FilterList from "../../components/FilterList";
import { animated } from "react-spring";
import { useAnimeList } from "hooks/useAnime";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentChatState, recentChatsState } from "store";
import { socketInstance } from "store/socket";
import { getRecentMessage } from "../../api";
import useSyncListStatus from "hooks/useSyncListStatus";

const RecentChatList = () => {
  // socket实例
  const socket = useRecoilValue(socketInstance);
  const anime = useAnimeList(6);
  // 最近消息列表
  const [recentChats, setRecentChats] = useRecoilState<RecentChat[]>(
    recentChatsState,
  );
  useSyncListStatus(socket, recentChats, setRecentChats);

  // 当前选中的聊天
  const [currentChat, setCurrentChat] = useRecoilState<RecentChat>(
    currentChatState as any,
  );

  useEffect(() => {
    getRecentMessage().then(res => {
      if (res.code === 200) {
        setRecentChats(res.data);
        if (res.data.length) {
          // 默认用列表的第一条作为当前选中的聊天
          const first = res.data[0];
          if (first) {
            setCurrentChat(res.data[0]);
          }
        }
      }
    });
  }, []);
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
                avatarStatus={item.onlineStatus ?? "offline"}
                name={item.name}
                statusText={item.onlineStatus === "online" ? "在线" : "离线"}
                time={item.time}
                message={item.content}
                unreadCount={item.unreadCount}
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
