import styled from 'styled-components';
import StyledMessageCard from 'components/MessageCard/style';
import StyledFilter from 'components/Filter/style';
const ChatList = styled.div`
  ${StyledMessageCard} {
    margin-bottom: 20px;
  }
`;
const StyledMessageList = styled.div`
  ${StyledFilter} {
    margin: 10px 0;
  }
`;

export default StyledMessageList;
export { ChatList };
