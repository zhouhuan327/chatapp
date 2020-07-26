import React from "react";
import PropTypes from "prop-types";
import StyledNavBar from "./style.js";
function NavBar({ children, ...rest }) {
  return <StyledNavBar {...rest}>{children}</StyledNavBar>;
}
function MenuItem({ icon, active, showBadge, ...rest }) {}

NavBar.propTypes = {
  children: PropTypes.any,
};

export default NavBar;
