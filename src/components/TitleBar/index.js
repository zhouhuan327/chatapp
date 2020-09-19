import React from 'react';
import PropTypes from 'prop-types';
import StyledTitleBar, { Actions, Drawer } from './style.js';
import Avatar from 'components/Avatar/index.js';
import { Title } from './style';
import ParaGraph from 'components/ParaGraph/index.js';
import Text from 'components/Text/index';
import Icon from 'components/Icon/index.js';
import { ReactComponent as Call } from 'assets/icons/call.svg';
import { ReactComponent as Camera } from 'assets/icons/camera.svg';
import { ReactComponent as Options } from 'assets/icons/options.svg';
import face1 from 'assets/images/avatar.jpeg';
function TitleBar({ name, status, children, ...rest }) {
  return (
    <StyledTitleBar {...rest}>
      <Avatar status={status} src={face1} />
      <Title>
        <ParaGraph size="large">{name}</ParaGraph>
        <ParaGraph type="secondary">
          <Text>{status === 'online' ? '在线' : '离线'}</Text>
          <Text>~ 最后阅读： 3小时</Text>
        </ParaGraph>
      </Title>
      <Actions>
        <Icon opacity={0.3} icon={Call}></Icon>
        <Icon opacity={0.3} icon={Camera}></Icon>
        <Icon opacity={0.3} icon={Options}></Icon>
      </Actions>
    </StyledTitleBar>
  );
}

TitleBar.propTypes = {
  children: PropTypes.any,
};

export default TitleBar;
