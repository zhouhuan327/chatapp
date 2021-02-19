import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import StyledChatPanel, { Panels, MyChatBubble, NoticeBubble } from "./style";
import TitleBar from "layout/TitleBar";
import Footer from "../Footer";
import ChatBubble from "components/ChatBubble";
import { useRecoilValue } from "recoil";
import { currentChatState, userInfoState } from "store";
import { getFriendMessage, getGroupMessage } from "api";
import moment from "moment";
import { useChatAnime } from "hooks/useAnime";
import { socketInstance } from "store/socket";

const ChatPanel = () => {
  // 动画参数
  const { topBarAnime, msgAnime, footerAnime } = useChatAnime();
  // socket
  const socket = useRecoilValue(socketInstance);
  // 消息列表的引用
  const ref = useRef<HTMLDivElement>(null);
  // 自己的id
  const { id: userId } = useRecoilValue<UserInfo>(userInfoState);
  // 当前的好友/群
  const currentChat = useRecoilValue<RecentChat>(currentChatState);
  // 消息列表
  const [list, setList] = useState<Array<any>>([]);

  const fetchList = useCallback(async currentChat => {
    if (!currentChat.id) return;
    if (currentChat.type === "friend") {
      const res = await getFriendMessage({ friendId: currentChat.id });
      res.code === 200 && setList(res.data);
    } else {
      const res = await getGroupMessage({ groupId: currentChat.id });
      res.code === 200 && setList(res.data);
    }
  }, []);
  // 记录已经建立过连接的好友/群 id
  // 避免重复连接
  const connectedFriend = useRef<Set<number>>(new Set());
  const connectedGroup = useRef<Set<number>>(new Set());
  useEffect(() => {
    socket.on("friendChatConnect", res => {
      console.log("friend connect", res);
      addMessage({ notice: "连接成功" });
      connectedFriend.current.add(res?.data?.receiverId);
    });
    socket.on("groupChatConnect", res => {
      console.log("group connect", res);
      addMessage({ notice: res.message });
      connectedGroup.current.add(res?.data?.groupId);
    });
    // 消息实时更新
    socket.on("friendChatMessage", res => {
      console.log("new friend message", res);
      addMessage(res.data);
    });
    socket.on("groupChatMessage", res => {
      console.log("new group message", res);
      addMessage(res.data);
    });
  }, []);
  useEffect(() => {
    if (!currentChat.id) return;
    const { id, type } = currentChat;
    if (type === "friend" && !connectedFriend.current.has(id)) {
      socket.emit("friendChatConnect", {
        senderId: userId,
        receiverId: id,
      });
    } else if (type === "group" && !connectedGroup.current.has(id)) {
      socket.emit("groupChatConnect", {
        senderId: userId,
        groupId: id,
      });
    }
    // 切换聊天时,请求拿到聊天记录
    fetchList(currentChat).then(() => scrollToBottom());
  }, [currentChat]);

  // 加入连接,发送消息时也要将轮动条拉到最低
  useEffect(() => {
    scrollToBottom();
  }, [list]);
  const addMessage = obj => {
    setList(list => [...list, obj]);
  };
  const scrollToBottom = () => {
    const el = ref.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  };
  const renderBubbleElement = list => {
    return list.map(item => {
      if (item.notice) {
        return <NoticeBubble key={Math.random()}>{item.notice}</NoticeBubble>;
      }
      let isMe = false;
      const time = moment(item.createTime).format("HH:mm");
      if (item.receiver?.id) {
        // 好友消息
        isMe = item.sender.id === userId;
      } else {
        // 群消息
        isMe = item.user.id === userId;
      }
      return isMe ? (
        <MyChatBubble key={item.id} time={time}>
          {item.content}
        </MyChatBubble>
      ) : (
        <ChatBubble key={item.id} time={time}>
          {item.content}
        </ChatBubble>
      );
    });
  };
  return (
    <StyledChatPanel>
      <TitleBar name="sean" status="online" animeProps={topBarAnime} />
      <Panels ref={ref} style={msgAnime}>
        {renderBubbleElement(list)}
      </Panels>
      <Footer
        userId={userId}
        currentChat={currentChat}
        setList={setList}
        animeProps={footerAnime}
      />
    </StyledChatPanel>
  );
};

export default memo(ChatPanel);
