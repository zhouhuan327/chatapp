import styled from "styled-components";
import { scrollbar } from "/@/utils/mixin";

const StyledFriendList = styled.div``;
const Friends = styled.div`
  margin-top: -8px;
  & > * {
    margin: 8px 0;
  }
  overflow-y: auto;
  height: 100%;
  ${scrollbar}
`;

export default StyledFriendList;
export { Friends };
