import React from "react";
import StyledConversation, { Conversations, MyChatBubble } from "./style";
import TitleBar from "PageDemo/TitleBar";
import Footer from "../Footer";
import ChatBubble from "components/ChatBubble";
import VoiceMessage from "components/VoiceMessage";
import { useSpring } from "react-spring";
function Conversation({ ...rest }) {
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
    <StyledConversation {...rest}>
      <TitleBar name="sean" status="online" animeProps={tBarAnimeProps} />
      <Conversations style={convsAnimeProps}>
        <ChatBubble time="昨天 下午13：25">hi ,在忙什么</ChatBubble>
        <MyChatBubble time="昨天 下午13：35">加班改bug</MyChatBubble>
        <ChatBubble time="昨天 下午15：25">
          <VoiceMessage time="01:44" />
        </ChatBubble>
        <MyChatBubble time="昨天 下午15：45">顶不住了</MyChatBubble>
        <ChatBubble time="昨天 下午15：25">啊这</ChatBubble>
        <MyChatBubble time="昨天 下午15：45">顶不住了</MyChatBubble>
        <ChatBubble time="昨天 下午15：25">
          <VoiceMessage time="01:44" />
        </ChatBubble>
        <MyChatBubble time="昨天 下午15：45">顶不住了</MyChatBubble>
        <ChatBubble time="昨天 下午15：25">
          很长很长 很长很长 很长很长 很长很长 很长很长 很长很长 很长很长
          很长很长 很长很长 很长很长 很长很长 很长很长 很长很长 很长很长
          很长很长 很长很长 很长很长 很长很长
        </ChatBubble>
        <MyChatBubble time="昨天 下午15：45">
          很长很长 很长很长 很长很长 很长很长 很长很长 很长很长 很长很长
          很长很长 很长很长 很长很长 很长很长 很长很长 很长很长 很长很长
          很长很长 很长很长 很长很长 很长很长
        </MyChatBubble>
      </Conversations>
      <Footer animeProps={ftAnimeProps} />
    </StyledConversation>
  );
}

export default Conversation;
