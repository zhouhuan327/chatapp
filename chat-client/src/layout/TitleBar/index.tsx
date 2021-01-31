import React, { memo } from "react";
import StyledTitleBar, { Actions } from "./style";
import Avatar from "components/Avatar";
import { Title } from "./style";
import ParaGraph from "components/ParaGraph";
import Text from "components/Text";
import Icon from "components/Icon";
import { ReactComponent as Call } from "assets/icons/call.svg";
import { ReactComponent as Camera } from "assets/icons/camera.svg";
import { ReactComponent as Options } from "assets/icons/options.svg";
import face1 from "assets/images/avatar.jpeg";
import { useSetRecoilState } from "recoil";
import { profileVisible } from "store/root";

function TitleBar({ name, status, animeProps }) {
  const setVisible = useSetRecoilState(profileVisible);
  const toggleDraw = () => {
    setVisible(v => !v);
  };
  return (
    <StyledTitleBar style={{ ...animeProps }}>
      <Avatar
        style={{ cursor: "pointer" }}
        status={status}
        src={face1}
        onClick={toggleDraw}
      />
      <Title>
        <ParaGraph size="large">{name}</ParaGraph>
        <ParaGraph type="secondary">
          <Text>{status === "online" ? "在线" : "离线"}</Text>
          <Text>~ 最后阅读： 3小时</Text>
        </ParaGraph>
      </Title>
      <Actions>
        <Icon opacity={0.3} icon={Call} />
        <Icon opacity={0.3} icon={Camera} />
        <Icon opacity={0.3} icon={Options} />
      </Actions>
    </StyledTitleBar>
  );
}

export default memo(TitleBar);
