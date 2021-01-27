import React from "react";
import FilterList from "./index";

export default {
  title: "页面组件/FilterList",
  component: FilterList,
};

export const Default = () => {
  return <FilterList>默认</FilterList>;
};
export const withLabel = () => (
  <FilterList
    filterLabel="筛选label"
    option={["abddd", "eftsf", "sfds"]}
    actionLabel="动作label"
  >
    list
  </FilterList>
);
