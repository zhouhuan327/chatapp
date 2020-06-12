import React from 'react';
import head1 from '../../assets/images/avatar.jpeg';
import { StyledAvatar } from './style.js';
function Avatar(props) {
    return (
        <StyledAvatar>
            <div className="statusIcon"></div>
            <div className="avatar-wrapper">
                <img src={head1} alt="" />
            </div>
        </StyledAvatar>
    );
}

Avatar.propTypes = {};

export default Avatar;
