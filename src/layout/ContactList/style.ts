import styled from "styled-components";
import { scrollbar } from "utils/mixin";

const StyledContactList = styled.div``;
const Contacts = styled.div`
  margin-top: -8px;
  & > * {
    margin: 8px 0;
  }
  overflow-y: auto;
  ${scrollbar}
`;

export default StyledContactList;
export { Contacts };
