import styled from "styled-components";
import StyledText from "components/Text/style";

const Filters = styled.div`
  > span {
    margin-right: 10px;
  }
`;

const Action = styled.div`
  justify-self: end;
  ${StyledText} {
    padding-right: 1rem;
  }
`;

const StyledFilter = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
  padding: 0 1rem;
  margin: 10px 0;
`;

export default StyledFilter;
export { Filters, Action };
