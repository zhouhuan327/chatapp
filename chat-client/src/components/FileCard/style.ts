import Icon from "components/Icon";
import ParaGraph from "components/ParaGraph";
import Popover from "components/Popover";
import styled from "styled-components";
import { card } from "utils/mixin";

const StyledFileCard = styled.div`
  ${card()};
  display: grid;
  grid-template-areas:
    "icon name options "
    "icon size time";
  grid-template-columns: 74px 1fr 1fr;
`;
const FileName = styled(ParaGraph)`
  font-weight: bold;
  grid-area: name;
  align-self: center;
`;
const FileSize = styled(ParaGraph).attrs({ type: "secondary" })`
  grid-area: size;
  align-self: center;
`;
const Time = styled(ParaGraph).attrs({ type: "secondary" })`
  grid-area: time;
  justify-self: right;
  align-self: center;
`;
const FileIcon = styled(Icon).attrs({ width: 60, height: 60 })`
  grid-area: icon;
  justify-self: left;
`;
const Option = styled(Popover)`
  grid-area: option;
  align-self: center;
  justify-self: right;
`;
export default StyledFileCard;
export { FileName, FileSize, Time, Option, FileIcon };
