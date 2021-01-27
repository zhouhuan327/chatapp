import React from "react";
import StyledFileList, { Files } from "./style";
import FilterList from "../FilterList";
import FileCard from "components/FileCard";
import { animated } from "react-spring";
import useAnimesList from "hooks/useAnimesList";
function FileList({ ...rest }) {
  const animes = useAnimesList(6);
  return (
    <StyledFileList {...rest}>
      <FilterList
        option={["最新文件优先", "按文件名排序"]}
        actionLabel="添加文件"
      >
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
