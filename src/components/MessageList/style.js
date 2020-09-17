import styled from "styled-components";
import StyledMessageCard from "components/MessageCard/style";
import StyledFilter from "components/Filter/style";
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
  ${StyledFilter} {
    margin: 10px 0;
  }
`;

export default StyledMessageList;
export { ChatList };
