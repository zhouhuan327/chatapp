import React from 'react';
import Avatar from '.';
import Image from 'assets/images/avatar.jpeg';
import 'styles/story.css';
export default {
    title: 'UI组件/Avatar',
    component: Avatar,
};

export const Default = () => {
    return <Avatar src={Image} />;
};

export const Sizes = () => {
    return (
        <div className="row">
            <Avatar src={Image} size="48px" />
            <Avatar src={Image} size="58px" />
            <Avatar src={Image} size="68px" />
            <Avatar src={Image} size="88px" />
        </div>
    );
};
export const Status = () => {
    return (
        <div className="row">
            <Avatar src={Image} status="online" />
            <Avatar src={Image} status="offline" />
            <Avatar src={Image} status="online" statusIconSize="10px" />
            <Avatar src={Image} status="offline" statusIconSize="6px" />
        </div>
    );
};
