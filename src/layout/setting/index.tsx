import React from "react";
import PropTypes from "prop-types";
import StyledSettings, {
  StyledSettingsItem,
  SettingsItemControl,
  StyledSettingsGroup,
} from "./style";
import { ReactComponent as ArrowMenuRight } from "assets/icons/arrowMenuRight.svg";
import Paragraph from "components/ParaGraph";
import Switch from "components/Switch";
import Icon from "components/Icon";

function Settings({ ...rest }) {
  return (
    <StyledSettings {...rest}>
      <SettingsGroup groupName="隐私设置">
        <SettingsItem label="添加好友时需要验证" />
        <SettingsItem
          label="推荐通讯录好友"
          description="上传的通讯录只用来匹配好友列表，本应用不会记录和发送任何信息给其它机构或"
        />
        <SettingsItem label="只能通过手机号找到我" />
      </SettingsGroup>
      <SettingsGroup groupName="通知设置">
        <SettingsItem label="新消息通知" />
        <SettingsItem label="语音和视频通话提醒" />
        <SettingsItem label="显示通知详情" />
        <SettingsItem label="声音" />
        <SettingsItem label="查看已静音的好友列表" type="menu" />
      </SettingsGroup>
    </StyledSettings>
  );
}

function SettingsGroup({ groupName, children, ...rest }) {
  return (
    <StyledSettingsGroup>
      <Paragraph size="xxlarge" style={{ paddingBottom: "24px" }}>
        {groupName}
      </Paragraph>
      {children}
    </StyledSettingsGroup>
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

Settings.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.any,
};

export default Settings;
