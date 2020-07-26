/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import PropTypes from "prop-types";
import StyledNavBar, { StyledMenuItem, MenuItems, MenuIcon } from "./style.js";
import Badge from "components/Badge/index.js";
import Avatar from "components/Avatar/index.js";
import img from "assets/images/avatar.jpeg";
import "styled-components/macro";
import {
    faCommentDots,
    faUsers,
    faFolder,
    faStamp,
    faEllipsisH,
    faCog,
} from "@fortawesome/free-solid-svg-icons";
function NavBar({ children, ...rest }) {
    return (
        <StyledNavBar {...rest}>
            <Avatar src={img} status="online"></Avatar>
            <MenuItems>
                <MenuItem showBadge active icon={faCommentDots} />
                <MenuItem icon={faUsers} />
                <MenuItem icon={faFolder} />
                <MenuItem icon={faStamp} />
                <MenuItem icon={faEllipsisH} />
                <MenuItem
                    icon={faCog}
                    css={`
                        align-self: end;
                    `}
                />
            </MenuItems>
        </StyledNavBar>
    );
}
function MenuItem({ icon, active, showBadge, ...rest }) {
    return (
        <StyledMenuItem active={active} {...rest}>
            <a href="#">
                <Badge show={showBadge}>
                    <MenuIcon active={active} icon={icon}></MenuIcon>
                </Badge>
            </a>
        </StyledMenuItem>
    );
}

NavBar.propTypes = {
    active: PropTypes.bool,
};

export default NavBar;
export { MenuItem };
