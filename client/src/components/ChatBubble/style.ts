import styled, { css } from "styled-components";
import ParaGraph from "components/ParaGraph";
import Icon from "components/Icon";
import Text from "components/Text";
import Avatar from "components/Avatar";
import { ChatBubbleProps } from ".";
const Ava = styled(Avatar)`
  margin: 0 10px;
`;
const Time = styled(ParaGraph).attrs({ type: "secondary", size: "small" })`
  margin: 6px;
  margin-left: 24px;
  word-spacing: 1rem;
`;
const Tip = styled(Icon)`
  position: absolute;
  bottom: -9px;
  left: 0;
  z-index: 1;
`;
const Bubble = styled.div`
  padding: 10px 16px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  position: relative;
  z-index: 10;
`;
const MessageText = styled(Text)`
  display: inline-block;
  max-width: 300px;
`;

const StyledChatBubble = styled.div<ChatBubbleProps>`
  display: flex;
  flex-direction: row;
  flex: 1 0 auto;
  ${({ type }) =>
    type === "mine" &&
    css`
      flex-direction: row-reverse;
      ${Bubble} {
        background-color: ${({ theme }) => theme.primaryColor};
      }
      ${Tip} {
        transform: rotateY(180deg);
        left: unset;
        right: 0;
        path {
          fill: ${({ theme }) => theme.primaryColor};
        }
      }
      ${Time} {
        text-align: right;
        margin-left: 0;
        margin-right: 24px;
      }
      ${MessageText} {
        color: white;
      }
    `};
`;
export default StyledChatBubble;
export { Ava as Avatar, Bubble, Tip, MessageText, Time };
