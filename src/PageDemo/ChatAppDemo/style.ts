import styled, { css } from "styled-components";

const Nav = styled.nav`
  flex-shrink: 0;
  position: relative;
  z-index: 100;
`;
const SideBar = styled.aside`
  max-width: 448px;
  min-width: 344px;
  height: 100vh;
  flex: 1;
  background-color: ${props => props.theme.grediantGray};
  position: relative;
  z-index: 50;
  > div {
    will-change: transform, opacity;
    position: absolute;
    width: 100%;
  }
`;
const Content = styled.main`
  flex: 2;
  position: relative;
  overflow-y: hidden;
  min-width: 555px;
`;

const Drawer = styled.div<{ show?: boolean }>`
  position: fixed;
  top: 110px;
  right: 0;
  width: 0;
  height: 100%;
  background-color: white;
  border-left: 1px solid #efece8;
  border-bottom: 1px solid #efece8;
  will-change: transform;
  transform: translateX(300px);
  ${({ show }) =>
    show &&
    css`
      width: initial;
      transform: translateX(0);
    `};
  transition: all 0.4s;
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
