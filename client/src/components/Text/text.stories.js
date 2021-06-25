import React from "react";
import Text from ".";

export default {
  title: "排版/Text",
  component: Text,
};

export const Default = () => {
  return <Text>默认</Text>;
};
export const Secondary = () => {
  return (
    <Text size="large" type="secondary">
      次要文本
    </Text>
  );
};
export const Medium = () => {
  return <Text size="large">large大小文本</Text>;
};
export const LargeAndBold = () => {
  return (
    <Text size="xxlarge" bold>
      xxlarge大小文本,加粗
    </Text>
  );
};
