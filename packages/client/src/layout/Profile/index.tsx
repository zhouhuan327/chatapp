import React, { memo } from "react";
import StyledProfile, { ContactSection, CloseIcon } from "./style";
import { Modal, message } from "antd";
import Avatar from "/@/components/Avatar";
import ParaGraph from "/@/components/ParaGraph";
import Emoji from "/@/components/Emoji";
import Divider from "/@/components/Divider";
import Text from "/@/components/Text";
import { useHistory } from "react-router-dom";
import { ReactComponent as Cross } from "/@/assets/icons/cross.svg";
import { useRecoilState } from "recoil";
import { detailDrawerAtom } from "/@/store";
import Button from "../../components/Button";
import moment from "moment";
import { RecentChat } from "share/types";
const Profile = ({ ...rest }) => {
  const history = useHistory();
  const [detailDrawer, setDetailDrawer] = useRecoilState(detailDrawerAtom);
  const userDetail = detailDrawer.data;
  const type = detailDrawer.data?.username ? "user" : "group";
  const handleSend = () => {
    const { id, avatarSrc, username } = detailDrawer.data;
    const newChat: RecentChat = {
      id,
      avatarSrc,
      name: username,
      time: "0 分钟前",
      type: "friend",
      unreadCount: 0,
      onlineStatus: "offline",
      intro: "",
      content: "",
      contentType: "text",
    };
    history.push("/chat/message", { newChat });
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
      onCancel: () => Promise.resolve(),
    });
  };
  return (
    <StyledProfile {...rest}>
      <CloseIcon
        icon={Cross}
        onClick={() => {
          setDetailDrawer({ visible: false, data: {} });
        }}
      />
      <Avatar
        css={`
          margin: 26px 0;
        `}
        src={userDetail?.avatarSrc}
        size="120px"
      />
      <ParaGraph
        css={`
          margin-bottom: 12px;
        `}
        size="xlarge"
      >
        {userDetail?.username || userDetail.groupName || "-"}
      </ParaGraph>
      <ParaGraph
        css={`
          margin-bottom: 18px;
        `}
        size="medium"
        type="secondary"
      >
        {userDetail?.address}
      </ParaGraph>
      <ParaGraph
        css={`
          margin-bottom: 10px;
        `}
        size="medium"
      >
        <Emoji label="fire">{userDetail?.intro || "这个人很懒，什么也没写"}</Emoji>
      </ParaGraph>
      <Divider
        css={`
          margin: 10px;
        `}
      />
      <ContactSection>
        {type === "user" && (
          <>
            <Description label="性别">{userDetail?.sex || "-"}</Description>
            <Description label="电子邮件">{userDetail?.email || "-"}</Description>
          </>
        )}

        <Description label="创建时间">
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
          {type === "user" ? "删除" : "退出"}
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
