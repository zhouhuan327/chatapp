import React from "react";
import styled from "styled-components";
const Emoji: React.FC<{ label: string }> = ({ children, label, ...rest }) => {
  return (
    <StyledEmoji role="img" aria-label={label} {...rest}>
      {children}
    </StyledEmoji>
  );
};

const StyledEmoji = styled.span`
  margin: 0 0.5rem;
`;
export default Emoji;
