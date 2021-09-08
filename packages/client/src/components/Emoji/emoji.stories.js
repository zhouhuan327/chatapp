/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import Emoji from ".";

export default {
  title: "UI组件/Emoji",
  component: Emoji,
};

export const Default = () => {
  return (
    <>
      <Emoji label="smile">😁</Emoji>
      <Emoji label="anger">👿</Emoji>
    </>
  );
};
