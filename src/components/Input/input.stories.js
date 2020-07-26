import React from "react";
import Input from ".";
import Icon from "components/Icon";
import { ReactComponent as smileIcon } from "assets/icons/smile.svg";
export default {
    title: "UI组件/Input",
    component: Input,
};

export const Default = () => {
    return <Input />;
};
export const Search = () => <Input.Search />;

export const WithSurffix = () => (
    <Input.Search suffix={<Icon color="gray" icon={smileIcon} />} />
);
