import styled from "styled-components";

const StyledInputText = styled.div``;
const InputUnderLine = styled.input`
  border: none;
  font-size: ${props => props.theme.normal};
  border-bottom: 1px solid ${props => props.theme.gray4};
  width: 100%;
  padding: 5px 0;
  background: none;
  transition: all 0.2s ease;
  &::placeholder {
    color: ${props => props.theme.gray5};
  }
  :focus,
  :hover {
    border-bottom-color: ${props => props.theme.primaryColor};
  }
`;
export default StyledInputText;
export { InputUnderLine };
