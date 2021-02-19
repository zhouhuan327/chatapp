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
  // const socket = useRecoilValue(socketInstance);
  // 消息列表的引用
  const ref = useRef<HTMLDivElement>(null);
  // 自己的id
  const { id } = useRecoilValue<UserInfo>(userInfoState);
  // 当前的好友/群
  const currentChat = useRecoilValue<RecentChat>(currentChatState);
  // 消息列表
  const [list, setList] = useState([]);

  const fetchList = useCallback(async () => {
    if (!currentChat.id) return;
    if (currentChat.type === "friend") {
      const res = await getFriendMessage({ friendId: currentChat.id });
      res.code === 200 && setList(res.data);
    } else {
      const res = await getGroupMessage({ groupId: currentChat.id });
      res.code === 200 && setList(res.data);
    }
  }, [currentChat]);
  // 切换聊天室请求拿到聊天记录
  useEffect(() => {
    fetchList().then(() => scrollToBottom());
  }, [fetchList]);

  // 加入连接,发送消息时也要将轮动条拉到最低
  useEffect(() => {
    scrollToBottom();
  }, [list]);
  const renderBubbleElement = list => {
    return list.map(item => {
      if (item.notice) {
        return <NoticeBubble key={Math.random()}>{item.notice}</NoticeBubble>;
      }
      let isMe = false;
      const time = moment(item.createTime).format("HH:mm");
      // 好友消息
      if (item.receiver?.id) {
        isMe = item.sender.id === id;
        // 群消息
      } else if (item.group?.id) {
        isMe = item.user.id === id;
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
  // 动画参数
  const { topBarAnime, msgAnime, footerAnime } = useChatAnime();

  const scrollToBottom = () => {
    const el = ref.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  };
  // 与好友建立连接
  useEffect(() => {}, []);
  return (
    <StyledChatPanel>
      <TitleBar name="sean" status="online" animeProps={topBarAnime} />
      <Panels ref={ref} style={msgAnime}>
        {renderBubbleElement(list)}
      </Panels>
      <Footer
        userId={id}
        currentChat={currentChat}
        setList={setList}
        animeProps={footerAnime}
      />
    </StyledChatPanel>
  );
};

export default memo(ChatPanel);
