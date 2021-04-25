import React, { memo } from "react";
import StyledProfile, { ContactSection, CloseIcon } from "./style";
import { Modal, message } from "antd";
import "styled-components/macro";
import Avatar from "components/Avatar";
import avatar from "assets/images/avatar.jpeg";
import ParaGraph from "components/ParaGraph";
import Emoji from "components/Emoji";
import Divider from "components/Divider";
import Text from "components/Text";
import { ReactComponent as Cross } from "assets/icons/cross.svg";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { detail, profileVisible } from "store";
import Button from "../../components/Button";
import moment from "moment";
const Profile = ({ ...rest }) => {
  const setVisible = useSetRecoilState(profileVisible);
  const userDetail = useRecoilValue(detail);
  const handleSend = () => {
    console.log(userDetail.id);
  };
  const handleDelete = () => {
    Modal.confirm({
      title: "确定删除好友吗",
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        message.success("删除成功");
        return Promise.resolve();
      },
      onCancel: () => Promise.reject(),
    });
  };
  return (
    <StyledProfile {...rest}>
      <CloseIcon icon={Cross} onClick={() => setVisible(false)} />
      <Avatar
        css={`
          margin: 26px 0;
        `}
        src={userDetail?.avatarSrc || avatar}
        size="120px"
      />
      <ParaGraph
        css={`
          margin-bottom: 12px;
        `}
        size="xlarge"
      >
        {userDetail?.username || "XXX"}
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
          {userDetail?.intro || "这个人很懒，什么也没写"}
        </Emoji>
      </ParaGraph>
      <Divider
        css={`
          margin: 10px;
        `}
      />
      <ContactSection>
        <Description label="性别">{userDetail?.sex || "-"}</Description>
        <Description label="电子邮件">{userDetail?.email || "-"}</Description>
        <Description label="注册时间">
          {moment(userDetail?.createTime).format("YYYY-MM-DD") || "-"}
        </Description>
      </ContactSection>
      <Divider
        css={`
          margin: 30px;
        `}
      />
      <div>
        <Button shape="rect" onClick={handleSend}>
          发送消息
        </Button>
        <Button shape="rect" style={{ marginLeft: 20 }} onClick={handleDelete}>
          删除
        </Button>
      </div>
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
