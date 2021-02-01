import React from "react";
import Icon from ".";
import { ReactComponent as SmileIcon } from "assets/icons/smile.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
export default {
    title: "UI组件/Icon",
    component: Icon,
};

export const Default = () => {
    return <Icon icon={SmileIcon} />;
};
export const CustomColor = () => {
    return (
        <div className="row">
            <Icon icon={SmileIcon} color="#cccccc" />
            <Icon icon={SmileIcon} color="#666" />
            <Icon icon={SmileIcon} color="red" />
        </div>
    );
};
export const CustomSize = () => {
    return (
        <div className="row">
            <Icon icon={SmileIcon} width={28} height={28} />
            <Icon icon={SmileIcon} width={38} height={38} />
            <Icon icon={SmileIcon} width={48} height={48} />
        </div>
    );
};
export const CustomOpacity = () => {
    return (
        <div className="row">
            <Icon icon={SmileIcon} width={48} height={48} opacity={0.8} />
            <Icon icon={SmileIcon} width={48} height={48} opacity={0.6} />
            <Icon icon={SmileIcon} width={48} height={48} opacity={0.3} />
        </div>
    );
};
export const FontAwesome = () => {
    return (
        <div className="row">
            <FontAwesomeIcon style={{ fontSize: 20 }} icon={faCommentDots} />
            <FontAwesomeIcon style={{ fontSize: 40 }} icon={faCommentDots} />
            <FontAwesomeIcon style={{ color: "red", fontSize: 40 }} icon={faCommentDots} />
        </div>
    );
};
