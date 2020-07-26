import React from "react";
import PropTypes from "prop-types";
import StyledText from "./style.js";
function Text({ type = "primary", size = "normal", bold, children, ...rest }) {
    return (
        <StyledText type={type} size={size} {...rest} bold={bold}>
            {children}
        </StyledText>
    );
}

Text.propTypes = {
    children: PropTypes.any,
    type: PropTypes.oneOf(["primary", "secondary", "danger"]),
    size: PropTypes.oneOf([
        "xxsmall",
        "xsmall",
        "small",
        "normal",
        "medium",
        "large",
        "xlarge",
        "xxlarge",
    ]),
    bold: PropTypes.bool,
};

export default Text;
