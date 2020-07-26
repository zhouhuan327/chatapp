import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { activeBar } from "utils/mixin";
const StyledNavBar = styled.div``;
const StyledMenuItem = styled.div`
    & > a {
        width: 100%;
        height: 74px;
        display: flex;
        align-items: center;
        justify-content: center;
        ${activeBar()};
        ${({ active }) => (active ? "" : "&::before, &::after {height:0}")};
    }
`;
const MenuIcon = styled(FontAwesomeIcon)`
    color: white;
    font-size: 24px;
    opacity: ${({ active }) => (active ? 1 : 0.3)};
`;
export default StyledNavBar;
export { StyledMenuItem, MenuIcon };
