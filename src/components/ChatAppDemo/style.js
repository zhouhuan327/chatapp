import styled from "styled-components";

const Nav = styled.nav`
  flex-shrink: 0;
`;
const SideBar = styled.aside`
  max-width: 448px;
  min-width: 344px;
  height: 100vh;
  flex: 1;
  background-color: ${(props) => props.theme.grediantGray};
`;
const Content = styled.main`
  flex: 2;
  position: relative;
`;
const Drawer = styled.div`
  max-width: 310px;
`;

const StyledChatApp = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

export default StyledChatApp;
export { Nav, SideBar, Content, Drawer };
