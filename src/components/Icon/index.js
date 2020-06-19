
import React from 'react';
import PropTypes from 'prop-types';
import StyledIcon from './style.js';
function Icon({ icon: IconComponent, width = 24, height = 24, color, opacity, ...rest }) {
    return (
        <StyledIcon color={color} opacity={opacity} {...rest}>
            {IconComponent && <IconComponent width={width} height={height} />}
        </StyledIcon>
    );
}

Icon.propTypes = {
    children: PropTypes.any
};

export default Icon;
