import React from 'react';
import PropTypes from 'prop-types';
import StyledProfile, {
  SocialLinks,
  ContactSection,
  AlbmnSection,
  AlbmnTitle,
  Albmn,
  Photo,
  CloseIcon,
} from './style.js';
import 'styled-components/macro';
import Avatar from 'components/Avatar/index.js';
import avatar from 'assets/images/avatar.jpeg';
import ParaGraph from 'components/ParaGraph/index.js';
import Emoji from 'components/Emoji/index.js';
import Icon from 'components/Icon/index.js';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import Divider from 'components/Divider/index.js';
import Text from 'components/Text/index.js';
import photo1 from 'assets/images/photo1.jpg';
import photo2 from 'assets/images/photo2.jpg';
import photo3 from 'assets/images/photo3.jpg';
import { ReactComponent as Cross } from 'assets/icons/cross.svg';
function Profile({ children, ...rest }) {
  return (
    <StyledProfile {...rest}>
      <CloseIcon icon={Cross} />
      <Avatar
        css={`
          margin: 26px 0;
        `}
        src={avatar}
        size="160px"
        status="online"
        statusIconSize="25px"
      />
      <ParaGraph
        css={`
          margin-bottom: 12px;
        `}
        size="xlarge"
      >
        守夜人
      </ParaGraph>
      <ParaGraph
        css={`
          margin-bottom: 18px;
        `}
        size="medium"
        type="secondary"
      >
        杭州市 滨江区
      </ParaGraph>
      <ParaGraph
        css={`
          margin-bottom: 26px;
        `}
        size="medium"
      >
        <Emoji label="fire">winter is comming</Emoji>
      </ParaGraph>
      <SocialLinks>
        <Icon.Social icon={faLink} bgColor="#f06767"></Icon.Social>
        <Icon.Social icon={faLink} bgColor="black"></Icon.Social>
        <Icon.Social icon={faLink} bgColor="#2438c0"></Icon.Social>
      </SocialLinks>
      <Divider
        css={`
          margin: 30px;
        `}
      />
      <ContactSection>
        <Description label="联系电话">123456</Description>
        <Description label="电子邮件">zsean21598@163.com</Description>
      </ContactSection>
      <Divider
        css={`
          margin: 30px;
        `}
      />
      <AlbmnSection>
        <AlbmnTitle>
          <Text type="secondary">相册(31)</Text>
          <a href="#">查看全部</a>
        </AlbmnTitle>
        <Albmn>
          <Photo src={photo1} />
          <Photo src={photo2} />
          <Photo src={photo3} />
        </Albmn>
      </AlbmnSection>
    </StyledProfile>
  );
}
function Description({ label, children }) {
  return (
    <ParaGraph>
      <Text type="secondary">{label}: </Text>
      <Text>{children}</Text>
    </ParaGraph>
  );
}
Profile.propTypes = {
  children: PropTypes.any,
};

export default Profile;
