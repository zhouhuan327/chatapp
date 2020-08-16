import React from 'react';
import PropTypes from 'prop-types';
import  StyledButton from './style.js';
function Button({
    children,
    type = "primary",
    shape = "circle",
    size = "30px",
    bgColor,
    ...rest
}) {
    return (
        <StyledButton 
            shape={shape} 
            type={type} 
            size={size} 
            bgColor={bgColor} 
            {...rest}
        >
           {children}
        </StyledButton>
    );
}

Button.propTypes = {
   children:PropTypes.any,
   type: PropTypes.oneOf(['primary']),
   shape: PropTypes.oneOf(['circle','rect']),
   size: PropTypes.string,
};

export default Button;
