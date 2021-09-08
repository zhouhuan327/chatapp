import React from "react";
import Radio from ".";

export default {
  title: "UI组件/Form/Radio",
  component: Radio,
};

export const Default = () => {
  return <Radio>默认</Radio>;
};
export const RadioGroup = () => {
  return (
    <Radio.Group label="选项组">
      <Radio name="option">选项1</Radio>
      <Radio name="option">选项2</Radio>
      <Radio name="option">选项3</Radio>
    </Radio.Group>
  );
};
