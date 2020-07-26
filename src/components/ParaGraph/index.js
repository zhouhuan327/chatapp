import React from "react";
import PropTypes from "prop-types";
import StyledParaGraph from "./style.js";
function ParaGraph({ children, ellipsis, ...rest }) {
    return (
        <StyledParaGraph as="p" ellipsis={ellipsis} {...rest}>
            {children}
        </StyledParaGraph>
    );
}

ParaGraph.propTypes = {
    children: PropTypes.any,
    ellipsis: PropTypes.bool,
};

export default ParaGraph;
