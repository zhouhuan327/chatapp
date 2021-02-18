import React, { memo } from "react";
import StyledSettings, {
  StyledSettingsItem,
  SettingsItemControl,
  StyledGroup,
} from "./style";
import { ReactComponent as ArrowMenuRight } from "assets/icons/arrowMenuRight.svg";
import Paragraph from "components/ParaGraph";
import Switch from "components/Switch";
import Icon from "components/Icon";
import { authAction } from "../../utils/auth";
import { useHistory } from "react-router-dom";
import { message } from "antd";

const Settings = () => {
  const history = useHistory();
  const handleLogout = () => {
    authAction.remove();
    history.push("/login");
    message.success("登出成功");
  };
  return (
    <StyledSettings>
      <Group groupName="通知设置">
        <SettingsItem label="新消息通知" />
        <SettingsItem label="显示通知详情" />
        <SettingsItem label="声音" />
        {/*<SettingsItem*/}
        {/*  label="推荐通讯录好友"*/}
        {/*  description="上传的通讯录只用来匹配好友列表，本应用不会记录和发送任何信息给其它机构或"*/}
        {/*/>*/}
        <SettingsItem label="退出登录" type="menu" onClick={handleLogout} />
      </Group>
    </StyledSettings>
  );
};

function Group({ groupName, children }) {
  return (
    <StyledGroup>
      <Paragraph size="xxlarge" style={{ paddingBottom: "24px" }}>
        {groupName}
      </Paragraph>
      {children}
    </StyledGroup>
  );
}

export function SettingsItem({
  type = "switch",
  label = "",
  description = "",
  ...rest
}) {
  return (
    <StyledSettingsItem {...rest}>
      <SettingsItemControl>
        <Paragraph size="large">{label}</Paragraph>
        {type === "switch" && <Switch />}
        {type === "menu" && <Icon icon={ArrowMenuRight} />}
      </SettingsItemControl>

      {description && (
        <Paragraph type="secondary" style={{ margin: "4px 0" }}>
          {description}
        </Paragraph>
      )}
    </StyledSettingsItem>
  );
}

export default memo(Settings);
