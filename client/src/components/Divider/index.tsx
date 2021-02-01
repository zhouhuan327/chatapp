import React from "react";
import styled from "styled-components";
function Divider({ ...rest }) {
  return <StyledDivider {...rest}></StyledDivider>;
}

const StyledDivider = styled.div`
  width: 100%;
  height: 1px;
  border-bottom: 1px solid ${props => props.theme.gray4};
`;

export default Divider;
