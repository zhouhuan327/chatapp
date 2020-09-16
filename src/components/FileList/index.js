import React from "react";
import PropTypes from "prop-types";
import StyledFileList, { Files } from "./style.js";
import FilterList from "components/FilterList/index.js";
import FileCard from "components/FileCard/index.js";
function FileList({ children, ...rest }) {
  return (
    <StyledFileList {...rest}>
      <FilterList option={["最新文件优先", "按文件名排序"]}>
        <Files>
          {new Array(10).fill(0).map((_, index) => (
            <FileCard key={index} />
          ))}
        </Files>
      </FilterList>
    </StyledFileList>
  );
}

FileList.propTypes = {
  children: PropTypes.any,
};

export default FileList;
