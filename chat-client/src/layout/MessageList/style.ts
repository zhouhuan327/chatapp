import styled from "styled-components";
import StyledMessageCard from "components/MessageCard/style";
import { scrollbar } from "utils/mixin";
const ChatList = styled.div`
  ${StyledMessageCard} {
    margin-bottom: 20px;
  }
  overflow-y: auto;
  ${scrollbar}
`;
const StyledMessageList = styled.div`
  height: 100vh;
`;

export default StyledMessageList;
export { ChatList };
