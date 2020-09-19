import React from 'react';
import PropTypes from 'prop-types';
import StyledVoiceMessage from './style';

import { ReactComponent as Play } from 'assets/icons/play.svg';
import { ReactComponent as Wave } from 'assets/icons/wave.svg';
import { useTheme } from 'styled-components';
import Button from 'components/Button';
import Icon from 'components/Icon';
import Text from 'components/Text';

function VoiceMessage({ children, time, type, ...rest }) {
  const theme = useTheme();
  return (
    <StyledVoiceMessage type={type} {...rest}>
      <Button size="30px">
        <Icon
          icon={Play}
          color="white"
          width="12"
          height="12"
          style={{ transform: 'translateX(1px)' }}
        />
      </Button>
      <Icon icon={Wave} width="100%" height="100%" color={theme.primaryColor} />
      <Text bold>{time}</Text>
    </StyledVoiceMessage>
  );
}

VoiceMessage.propTypes = {
  children: PropTypes.any,
  type: PropTypes.oneOf(['mine']),
  time: PropTypes.string,
};

export default VoiceMessage;
