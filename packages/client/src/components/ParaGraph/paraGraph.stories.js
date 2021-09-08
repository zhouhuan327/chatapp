import React from "react";
import ParaGraph from ".";

export default {
  title: "排版/ParaGraph",
  component: ParaGraph,
};

export const Default = () => {
  return (
    <>
      <ParaGraph>这是一个段落</ParaGraph>
      <ParaGraph>这是一个段落</ParaGraph>
    </>
  );
};
export const Ellipsis = () => {
  return (
    <>
      <ParaGraph ellipsis>
        这是一个超长文本这是一个超长文本这是一个超长文本这是一个超长文本这是一个超长文本这是一个超长文本这是一个超长文本这是一个超长文本
      </ParaGraph>
    </>
  );
};
