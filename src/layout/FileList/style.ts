import styled from "styled-components";
import { scrollbar } from "utils/mixin";

const StyledFileList = styled.div``;
const Files = styled.div`
  margin-top: -8px;
  & > * {
    margin: 8px 0;
  }
  overflow-y: auto;
  ${scrollbar}
`;
export default StyledFileList;
export { Files };
