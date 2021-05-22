import { StyledAvatar } from "/@/components/Avatar/style";
import ParaGraph from "/@/components/ParaGraph";
import styled from "styled-components";
import { card } from "/@/utils/mixin";

const Name = styled(ParaGraph).attrs({ size: "large" })`
  grid-area: name;
`;
const Intro = styled(ParaGraph).attrs({ type: "secondary" })`
  grid-area: intro;
`;
const StyledFriendCard = styled.div`
  ${card()};
  display: grid;
  grid-template-areas:
    "avatar name"
    "avatar intro";
  grid-template-columns: 62px auto;
  ${StyledAvatar} {
    grid-area: avatar;
  }
`;
export default StyledFriendCard;
export { Name, Intro };
