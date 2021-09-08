import styled from "styled-components";
import StyledIcon from "/@/components/Icon/style";
import { animated } from "react-spring";
export const Title = styled.div`
  display: grid;
`;
export const Actions = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  ${StyledIcon} {
    cursor: pointer;
  }
`;

const StyledTitleBar = styled(animated.div)`
  display: grid;
  grid-template-columns: 62px 1fr 112px;
  max-height: 110px;
  padding: 30px;
  border-bottom: 1px solid ${({ theme }) => theme.gray4};
`;
export default StyledTitleBar;
