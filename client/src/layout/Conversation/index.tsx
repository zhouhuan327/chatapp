import React, { memo, useCallback, useEffect, useState } from "react";
import StyledConversation, { Conversations, MyChatBubble } from "./style";
import TitleBar from "layout/TitleBar";
import Footer from "../Footer";
import ChatBubble from "components/ChatBubble";
import { useSpring } from "react-spring";
import { useRecoilValue } from "recoil";
import { currentChatState, userInfoState } from "../../store";
import { getFriendMessage, getGroupMessage } from "../../api";
import moment from "moment";

const Conversation = () => {
  // 自己的id
  const { id } = useRecoilValue<UserInfo>(userInfoState);

  const currentChat = useRecoilValue<RecentChat>(currentChatState);
  // 消息列表
  const [list, setList] = useState<any>([]);

  const fetchFriendMessage = useCallback(async friendId => {
    const res = await getFriendMessage({ friendId });
    if (res?.code !== 200) return;
    const data: Array<FriendMessage> = res.data;
    setList(
      data.map(item => {
        // 判断这条消息是自己发的还是好友发的
        const isMe = item.sender.id == id;
        return renderBubbleElement(item, isMe);
      }),
    );
  }, []);
  const fetchGroupMessage = useCallback(async groupId => {
    const res = await getGroupMessage({ groupId });
    if (res?.code !== 200) return;
    const data: Array<GroupMessage> = res.data;
    setList(
      data.map(item => {
        // 判断这条消息是自己发的还是别人群员
        const isMe = item.user.id == id;
        return renderBubbleElement(item, isMe);
      }),
    );
  }, []);
  const renderBubbleElement = (item, isMe: boolean) => {
    const time = moment(item.createTime).format("HH:mm");
    return isMe ? (
      <MyChatBubble time={time}>{item.content}</MyChatBubble>
    ) : (
      <ChatBubble time={time}>{item.content}</ChatBubble>
    );
  };

  useEffect(() => {
    const { id, type } = currentChat;
    if (type === "friend") {
      fetchFriendMessage(id);
    } else {
      fetchGroupMessage(id);
    }
  }, [currentChat]);
  const tBarAnimeProps = useSpring({
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    from: { opacity: 0, transform: "translate3d(0px, -50px, 0px)" },
    delay: 500,
  });

  const convsAnimeProps = useSpring({
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    from: { opacity: 0, transform: "translate3d(50px, 0px, 0px)" },
    delay: 800,
  });

  const ftAnimeProps = useSpring({
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    from: { opacity: 0, transform: "translate3d(0px, 50px, 0px)" },
    delay: 950,
  });
  return (
    <StyledConversation>
      <TitleBar name="sean" status="online" animeProps={tBarAnimeProps} />
      <Conversations style={convsAnimeProps}>{list}</Conversations>
      <Footer animeProps={ftAnimeProps} />
    </StyledConversation>
  );
};

export default memo(Conversation);
