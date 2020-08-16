import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StyledPopover, { Triangle, Content, Target } from './style.js';
function Popover({ children, content, onHide, onVisible, offset = {}, ...rest }) {
  const [visible, setVisible] = useState(false);
  const handleClick = () => {
    if (visible) {
      setVisible(false);
      onHide && onHide();
    } else {
      setVisible(true);
      onVisible && onVisible();
    }
  };
  return (
    <StyledPopover onClick={handleClick} {...rest}>
      <Content visible={visible} offset={offset}>
        {content}
      </Content>
      <Triangle visible={visible} offset={offset} />
      <Target>{children}</Target>
    </StyledPopover>
  );
}

Popover.propTypes = {
  children: PropTypes.any,
  content: PropTypes.any,
  offset: PropTypes.shape({
    x: PropTypes.string,
    y: PropTypes.string,
  }),
  onVisible: PropTypes.func,
  onHide: PropTypes.func,
};

export default Popover;
