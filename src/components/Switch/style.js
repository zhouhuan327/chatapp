import styled from "styled-components";

const StyledSwitch = styled.label`
  width: 51px;
  height: 30px;
  position: relative;
  display: inline-block;
  cursor: pointer;
`;
const Slider = styled.span`
  background-color: ${(props) => props.theme.gray4};
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border-radius: 16px;
  transition: 0.4s;
  ::before {
    display: block;
    position: absolute;
    content: "";
    width: 28px;
    height: 28px;
    border-radius: 50%;
    top: 1px;
    left: 1px;
    background-color: white;
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.05), 0px 2px 2px rgba(0, 0, 0, 0.1);
    transition: 0.4s;
  }
`;
const Checkbox = styled.input.attrs({ type: "checkbox" })`
  width: 0;
  height: 0;
  opacity: 0;
  :checked + ${Slider} {
    background-color: ${(props) => props.theme.primaryColor};
    ::before {
      transform: translateX(20px);
    }
  }
`;
export default StyledSwitch;
export { Slider, Checkbox };
