import styled from "styled-components";
import StyledInputText from "../../components/Input/InputText/style";

const ScLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;
export const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  width: 500px;
  height: 400px;
  border: 1px solid #f0f0f0;

  h1 {
    margin-bottom: 20px;
    text-align: center;
  }
  ${StyledInputText} {
    width: 100%;
    margin: 20px 0;
  }
`;
export default ScLogin;
