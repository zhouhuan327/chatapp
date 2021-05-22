import React, { memo } from "react";
import StyledTitleBar, { Actions } from "./style";
import Avatar from "/@/components/Avatar";
import { Title } from "./style";
import ParaGraph from "/@/components/ParaGraph";
import Text from "/@/components/Text";
import Icon from "/@/components/Icon";
import { ReactComponent as Call } from "/@/assets/icons/call.svg";
import { ReactComponent as Camera } from "/@/assets/icons/camera.svg";
import { ReactComponent as Options } from "/@/assets/icons/options.svg";
function TitleBar({ name, status, avatarSrc, animeProps }) {
  return (
    <StyledTitleBar style={{ ...animeProps }}>
      <Avatar status={status} src={avatarSrc} />
      <Title>
        <ParaGraph size="large">{name}</ParaGraph>
        <ParaGraph type="secondary">
          <Text>{status === "online" ? "在线" : "离线"}</Text>
          <Text>~ 最后阅读： 3小时</Text>
        </ParaGraph>
      </Title>
      <Actions>
        {/*<Icon opacity={0.3} icon={Call} />*/}
        {/*<Icon opacity={0.3} icon={Camera} />*/}
        {/*<Icon opacity={0.3} icon={Options} />*/}
      </Actions>
    </StyledTitleBar>
  );
}

export default memo(TitleBar);
