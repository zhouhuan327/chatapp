import React from 'react';
import PropTypes from 'prop-types';
import  StyledDivider from './style.js';
function Divider({ children, ...rest }) {
    return (
        <StyledDivider {...rest}>
           {children}
        </StyledDivider>
    );
}

Divider.propTypes = {
   children:PropTypes.any
};

export default Divider;
