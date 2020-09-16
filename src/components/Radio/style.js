import styled from "styled-components";

const StyledRadio = styled.label`
  display: inline-block;
  position: relative;
  padding-left: 22px;
  cursor: pointer;
  line-height: 16px;
  font-size: ${(props) => props.theme.normal};
`;
const StyledRadioGroup = styled.div`
  display: flex;
  & > *:not(:first-child) {
    margin-left: 24px;
  }
`;
const Circle = styled.span`
  line-height: 16px;
  width: 16px;
  height: 16px;
  border: 1px solid ${(props) => props.theme.primaryColor};
  border-radius: 50%;
  position: absolute;
  left: 0;
  top: 0;
  ::after {
    content: "";
    width: 10px;
    height: 10px;
    background-color: ${(props) => props.theme.primaryColor};
    border-radius: 50%;
    position: absolute;
    left: 2px;
    top: 2px;

    opacity: 0;
    transform: scale(0);
    transition: 0.2s ease;
  }
`;
const RadioButton = styled.input.attrs({ type: "radio" })`
  width: 0;
  height: 0;
  opacity: 0;
  :checked + ${Circle}::after {
    opacity: 1;
    transform: scale(1);
  }
  :not(:checked) + ${Circle}::after {
    opacity: 0;
    transform: scale(0);
  }
`;
export default StyledRadio;
export { Circle, RadioButton, StyledRadioGroup };
