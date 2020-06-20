
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
    icon: PropTypes.element,
    width: PropTypes.oneOfType(
        [PropTypes.number, PropTypes.string]
    ),
    height: PropTypes.oneOfType(
        [PropTypes.number, PropTypes.string]
    ),
    color: PropTypes.string,
    opacity: PropTypes.number
};

export default Icon;
