import styled from "styled-components";
import { scrollbar } from "utils/mixin";

const StyledGroupList = styled.div``;
const Groups = styled.div`
  margin-top: -8px;
  & > * {
    margin: 8px 0;
  }
  overflow-y: auto;
  height: 100%;
  ${scrollbar}
`;
export default StyledGroupList;
export { Groups };
