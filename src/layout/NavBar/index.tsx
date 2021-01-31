/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo } from "react";
import StyledNavBar, { StyledMenuItem, MenuItems, MenuIcon } from "./style";
import Badge from "components/Badge";
import Avatar from "components/Avatar";
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
import { Link, matchPath, useLocation } from "react-router-dom";
function NavBar({ ...rest }) {
  return (
    <StyledNavBar {...rest}>
      <Avatar src={img} status="online" />
      <MenuItems>
        <MenuItem to="/" showBadge icon={faCommentDots} />
        <MenuItem to="/contacts" icon={faUsers} />
        <MenuItem to="/files" icon={faFolder} />
        <MenuItem to="/notes" icon={faStamp} />
        <MenuItem to="/setting" icon={faEllipsisH} />
        <MenuItem
          to="settings"
          icon={faCog}
          css={`
            align-self: end;
          `}
        />
      </MenuItems>
    </StyledNavBar>
  );
}
const MenuItem = ({ to, icon, showBadge = false, ...rest }) => {
  const location = useLocation();
  const active = matchPath(location.pathname, {
    path: to,
    exact: to === "/",
  });

  return (
    <StyledMenuItem active={active} {...rest}>
      <Link to={to}>
        <Badge show={showBadge}>
          <MenuIcon active={active} icon={icon} />
        </Badge>
      </Link>
    </StyledMenuItem>
  );
};

export default memo(NavBar);
export { MenuItem };
