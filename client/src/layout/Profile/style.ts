import styled from "styled-components";
import arrowRight from "assets/icons/arrowRight.svg";
import Icon from "components/Icon";
const StyledProfile = styled.div`
  position: relative;
  display: grid;
  align-content: start;
  justify-content: center;
  justify-items: center;
  padding: 30px;
  height: auto;
  margin-top: 2vh;
  overflow-y: auto;
`;
const SocialLinks = styled.div`
  & > * {
    margin: 0 9px;
  }
`;
const ContactSection = styled.section`
  display: grid;
  row-gap: 18px;
`;

const CloseIcon = styled(Icon).attrs({ opacity: 0.3 })`
  position: absolute;
  right: 30px;
  top: 30px;
  cursor: pointer;
`;
export default StyledProfile;
export { SocialLinks, ContactSection, CloseIcon };
