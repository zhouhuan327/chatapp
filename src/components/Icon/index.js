
import React from 'react';
import PropTypes from 'prop-types';
import  StyledIcon from './style.js';
function Icon({ children, ...rest }) {
    return (
        <StyledIcon {...rest}>
           {children}
        </StyledIcon>
    );
}

Icon.propTypes = {
   children:PropTypes.any
};

export default Icon;
