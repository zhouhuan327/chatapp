import React from 'react';
import Badge from '.';
import Icon from 'components/Icon/.';
import { ReactComponent as smileIcon } from 'assets/icons/smile.svg';
export default {
    title: 'UI组件/Badge',
    component: Badge,
};

export const Default = () => {
    return (
        <div className="row">
            <Badge count={5} />
            <Badge count={10} />
            <Badge showZero={true} count={0} />
        </div>
    );
};
export const DotVariant = () => {
    return (
        <div className="row">
            <Badge show>
                <Icon icon={smileIcon} />
            </Badge>
            <Badge show>
                <span>啊这</span>
            </Badge>
        </div>
    );
};
