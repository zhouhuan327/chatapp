import styled from 'styled-components';
import ChatBubble from 'components/ChatBubble';
export const Conversations = styled.div`
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
`;

export const MyChatBubble = styled(ChatBubble).attrs({ type: 'mine' })`
  align-self: flex-end;
`;
const StyledConversation = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  border: 1px solid ${({ theme }) => theme.grey4};

  & > *:last-child {
    align-self: end;
  }
`;

export default StyledConversation;
