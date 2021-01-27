import React from "react";
import styled from "styled-components";

const LabelContainer = ({ label, children }) => {
  return (
    <Wrapper>
      <span>{label}:</span>
      {children}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${props => props.theme.normal};
  > span {
    margin-bottom: 6px;
  }
`;
export default LabelContainer;
