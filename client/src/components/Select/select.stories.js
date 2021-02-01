import React from "react";
import Select from ".";
import Option from "components/Option";

export default {
  title: "UI组件/Form/Select",
  component: Select,
};

export const Default = () => (
  <Select>
    <Option>最新消息优先</Option>
    <Option>在线好友优先</Option>
  </Select>
);
export const FormSelect = () => {
  return (
    <Select type="form">
      <Option>北京</Option>
      <Option>上海</Option>
    </Select>
  );
};
