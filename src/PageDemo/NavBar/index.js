/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import StyledNavBar, { StyledMenuItem, MenuItems, MenuIcon } from './style.js';
import Badge from 'components/Badge/index.js';
import Avatar from 'components/Avatar/index.js';
import img from 'assets/images/avatar.jpeg';
import 'styled-components/macro';
import {
  faCommentDots,
  faUsers,
  faFolder,
  faStamp,
  faEllipsisH,
  faCog,
} from '@fortawesome/free-solid-svg-icons';
import { Link, matchPath, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
function NavBar({ children, ...rest }) {
  return (
    <StyledNavBar {...rest}>
      <Avatar src={img} status="online"></Avatar>
      <MenuItems>
        <MenuItem to="/" showBadge icon={faCommentDots} />
        <MenuItem to="/contacts" icon={faUsers} />
        <MenuItem to="/files" icon={faFolder} />
        <MenuItem to="/notes" icon={faStamp} />
        <MenuItem icon={faEllipsisH} />
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
function MenuItem({ to, icon, showBadge, ...rest }) {
  const location = useLocation();
  const active = matchPath(location.pathname, {
    path: to,
    exact: to === '/',
  });

  return (
    <StyledMenuItem active={active} {...rest}>
      <Link to={to}>
        <Badge show={showBadge}>
          <MenuIcon active={active} icon={icon}></MenuIcon>
        </Badge>
      </Link>
    </StyledMenuItem>
  );
}

NavBar.propTypes = {
  active: PropTypes.bool,
};

export default NavBar;
export { MenuItem };
