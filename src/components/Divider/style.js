import styled from 'styled-components';

const StyledDivider = styled.div`
  width: 100%;
  height: 1px;
  border-bottom: 1px solid ${(props) => props.theme.gray4};
`;

export default StyledDivider;
