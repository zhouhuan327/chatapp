import React from 'react';
import Popover from '.';
import Button from 'components/Button';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';

export default {
  title: 'UI组件/Popover',
  component: Popover,
};

export const Default = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '50vh' }}>
      <Popover content="Hello!">
        <Button shape="rect">点我</Button>
      </Popover>
    </div>
  );
};
export const WidthOffset = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '50vh' }}>
      <Popover offset={{ x: '-25%' }} content="Hello!">
        <Button shape="rect">click me</Button>
      </Popover>
    </div>
  );
};
