
import React from 'react';
import Icon from '.';
import { ReactComponent as SmileIcon } from 'assets/icons/smile.svg'
export default {
    title: "UI组件/Icon",
    component: Icon
}

export const Default = () => {
    return <Icon icon={SmileIcon} />;
};
