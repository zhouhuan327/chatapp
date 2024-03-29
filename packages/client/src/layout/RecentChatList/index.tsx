import React, { memo, useCallback, useEffect, useRef } from "react";
import StyledRecentChatList, { ChatList } from "./style";
import MessageCard from "/@/components/MessageCard";
import FilterList from "../../components/FilterList";
import { animated } from "react-spring";
import { useAnimeList } from "/@/hooks/useAnime";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentChatState, recentChatsState } from "/@/store";
import { socketInstance } from "/@/store/socket";
import { getRecentMessage } from "../../api";
import useSyncListStatus from "/@/hooks/useSyncListStatus";
import produce from "immer";
import { useLocation } from "react-router-dom";
import { RecentChat } from "share/types";
const RecentChatList = () => {
  // socket实例
  const socket = useRecoilValue(socketInstance);
  const anime = useAnimeList(6);
  // 最近消息列表
  const [recentChats, setRecentChats] = useRecoilState<RecentChat[]>(recentChatsState);

  // 当前选中的聊天
  const [currentChat, setCurrentChat] = useRecoilState<RecentChat>(currentChatState as any);
  useSyncListStatus(socket, recentChats, setRecentChats);

  useEffect(() => {
    getRecentMessage().then(res => {
      if (res.code === 200) {
        setRecentChats(res.data);
        if (res.data.length) {
          // 默认用列表的第一条作为当前选中的聊天
          const first = res.data[0];
          if (first) {
            setCurrentChat(res.data[0]);
            currentChatRef.current = res.data[0];
          }
        }
      }
    });
  }, []);
  // notice回调里面拿到的当前选中聊天是旧的,用ref保存最新的
  const currentChatRef = useRef<any>({});
  // 拿到最新消息,更新列表
  useEffect(() => {
    socket.on("notice", res => {
      const data = res.data;
      setRecentChats(list =>
        produce(list, draft => {
          const target = draft.find(item => item.id === data?.sender?.id);
          if (target === undefined) return;
          target.content = data?.content;
          // 不是正在聊天的好友发来的消息,需要提示
          if (target.id !== currentChatRef.current.id) {
            target.unreadCount = target.unreadCount + 1;
          }
        }),
      );
    });
  }, [socket]);
  const handleClick = useCallback(current => {
    setCurrentChat(current);
    currentChatRef.current = current;
    setRecentChats(list => {
      const newState = produce(list, draft => {
        const target = draft.find(item => item.id === current.id);
        if (target) {
          target.unreadCount = 0;
        }
      });
      return newState;
    });
  }, []);
  const location = useLocation<{ newChat?: RecentChat }>();
  useEffect(() => {
    const newChat = location.state?.newChat;
    if (!newChat) return;
    console.log(newChat);
    // 查看这个是否已经在最近聊天列表中
    const target = recentChats.find(item => item.id === newChat.id);
    if (target) {
      setCurrentChat(target);
    } else {
      const currentIndexId = recentChats.length;
      setRecentChats(old => [{ ...newChat, _id: currentIndexId + 1 }, ...old]);
    }
  }, [location, recentChats, setCurrentChat]);
  return (
    <StyledRecentChatList>
      <FilterList>
        <ChatList>
          {recentChats.map((item, index) => (
            <animated.div key={item._id} style={anime[index]}>
              <MessageCard
                active={item._id === currentChat?._id}
                replied={index % 2 === 0}
                avatarSrc={item.avatarSrc}
                avatarStatus={(item.type === "friend" && item.onlineStatus) ?? "offline"}
                name={item.name}
                statusText={
                  item.type === "friend" && item.onlineStatus === "online" ? "在线" : "离线"
                }
                time={item.time}
                message={item.content}
                unreadCount={item.unreadCount}
                onClick={() => handleClick(item)}
              />
            </animated.div>
          ))}
        </ChatList>
      </FilterList>
    </StyledRecentChatList>
  );
};

export default memo(RecentChatList);
