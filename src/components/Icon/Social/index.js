import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function SocialIcon({ icon, bgColor, href, ...rest }) {
  return (
    <Button
      size="30px"
      bgColor={bgColor}
      onClick={() => href && window.open(href, '_blank')}
    >
      <FontAwesomeIcon icon={icon} style={{ fontSize: 16 }} />
    </Button>
  );
}

SocialIcon.propTypes = {
  icon: PropTypes.element,
  bgColor: PropTypes.string,
  href: PropTypes.string,
};

export default SocialIcon;
