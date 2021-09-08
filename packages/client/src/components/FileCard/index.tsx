import React, { memo } from "react";
import PropTypes from "prop-types";
import StyledContactCard, { FileName, FileSize, Time, FileIcon } from "./style";
import { ReactComponent as zip } from "/@/assets/icons/fileZip.svg";
function FileCard({ ...rest }) {
  return (
    <StyledContactCard {...rest}>
      <FileIcon icon={zip} />
      <FileName>SourceCode.zip</FileName>
      <FileSize>100M</FileSize>
      <Time>2020/9/16</Time>
    </StyledContactCard>
  );
}

FileCard.propTypes = {
  children: PropTypes.any,
};

export default memo(FileCard);
