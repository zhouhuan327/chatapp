import React from 'react';
import PropTypes from 'prop-types';
import  StyledSelect from './style.js';
function Select({ children, ...rest }) {
    return (
        <StyledSelect {...rest}>
           {children}
        </StyledSelect>
    );
}

Select.propTypes = {
   children:PropTypes.any
};

export default Select;
