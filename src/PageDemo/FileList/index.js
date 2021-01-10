import React from "react";
import StyledFileList, { Files } from "./style.js";
import FilterList from "../FilterList/index.js";
import FileCard from "components/FileCard/index.js";
import { animated } from "react-spring";
import useAnimesList from "hooks/useAnimesList";
function FileList({ ...rest }) {
  const animes = useAnimesList(6);
  return (
    <StyledFileList {...rest}>
      <FilterList option={["最新文件优先", "按文件名排序"]}>
        <Files>
          {new Array(10).fill(0).map((_, index) => (
            <animated.div key={index} style={animes[index]}>
              <FileCard />
            </animated.div>
          ))}
        </Files>
      </FilterList>
    </StyledFileList>
  );
}

export default FileList;
