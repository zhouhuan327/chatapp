import React, { memo, FC } from "react";
import StyledProfile, { ContactSection, CloseIcon } from "./style";
import "styled-components/macro";
import Avatar from "components/Avatar";
import avatar from "assets/images/avatar.jpeg";
import ParaGraph from "components/ParaGraph";
import Emoji from "components/Emoji";
import Divider from "components/Divider";
import Text from "components/Text";
import { ReactComponent as Cross } from "assets/icons/cross.svg";
import { useSetRecoilState } from "recoil";
import { profileVisible } from "store";
import Button from "../../components/Button";
interface ProfileProps {
  userInfo?: UserInfo;
  [rest: string]: any;
}
const Profile: FC<ProfileProps> = ({ userInfo, ...rest }) => {
  const setVisible = useSetRecoilState(profileVisible);
  return (
    <StyledProfile {...rest}>
      <CloseIcon icon={Cross} onClick={() => setVisible(false)} />
      <Avatar
        css={`
          margin: 26px 0;
        `}
        src={userInfo?.avatarSrc || avatar}
        size="120px"
      />
      <ParaGraph
        css={`
          margin-bottom: 12px;
        `}
        size="xlarge"
      >
        {userInfo?.username || "XXX"}
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
          margin-bottom: 10px;
        `}
        size="medium"
      >
        <Emoji label="fire">
          {userInfo?.intro || "这个人很懒，什么也没写"}
        </Emoji>
      </ParaGraph>
      <Divider
        css={`
          margin: 10px;
        `}
      />
      <ContactSection>
        <Description label="性别">{userInfo?.sex || "-"}</Description>
        <Description label="电子邮件">{userInfo?.email || "-"}</Description>
        <Description label="注册时间">
          {userInfo?.createTime || "-"}
        </Description>
      </ContactSection>
      <Divider
        css={`
          margin: 30px;
        `}
      />
      <ContactSection>
        <Button shape="rect">发送消息</Button>
      </ContactSection>
    </StyledProfile>
  );
};
function Description({ label, children }) {
  return (
    <ParaGraph>
      <Text type="secondary">{label}: </Text>
      <Text>{children}</Text>
    </ParaGraph>
  );
}

export default memo(Profile);
