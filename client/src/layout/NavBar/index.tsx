import React, { memo } from "react";
import StyledNavBar, { StyledMenuItem, MenuItems, MenuIcon } from "./style";
import Badge from "components/Badge";
import Avatar from "components/Avatar";
import img from "assets/images/avatar.jpeg";
import "styled-components/macro";
import { Link, matchPath, useLocation } from "react-router-dom";
import { routers } from "../../router";
const NavBar = () => {
  return (
    <StyledNavBar>
      <Avatar src={img} status="online" />
      <MenuItems>
        {routers.map(route => (
          <MenuItem key={route.path} to={route.path} icon={route.icon} />
        ))}
      </MenuItems>
    </StyledNavBar>
  );
};
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
