import styled from "styled-components";
import ChatBubble from "components/ChatBubble";
import { scrollbar } from "utils/mixin";
import { animated } from "react-spring";
export const Panels = styled(animated.div)`
  display: flex;
  flex-direction: column;
  padding: 10px 15px;
  align-items: flex-start;
  width: 100%;
  overflow-y: auto;
  flex: 1;
  & > * {
    margin: 10px 0;
  }
  ${scrollbar()}
`;

export const MyChatBubble = styled(ChatBubble).attrs({ type: "mine" })`
  align-self: flex-end;
`;
const StyledChatPanel = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  border: 1px solid ${props => props.theme.gray4};
  overflow: hidden;
  & > *:last-child {
    align-self: end;
  }
`;
export const NoticeBubble = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  color: gray;
`;

export default StyledChatPanel;
