import React from "react";
import PropTypes from "prop-types";
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
function TitleBar({ name, status, children, animeProps, style, ...rest }) {
  return (
    <StyledTitleBar style={{ ...style, ...animeProps }} {...rest}>
      <Avatar status={status} src={face1} />
      <Title>
        <ParaGraph size="large">{name}</ParaGraph>
        <ParaGraph type="secondary">
          <Text>{status === "online" ? "在线" : "离线"}</Text>
          <Text>~ 最后阅读： 3小时</Text>
        </ParaGraph>
      </Title>
      <Actions>
        <Icon opacity={0.3} icon={Call}></Icon>
        <Icon opacity={0.3} icon={Camera}></Icon>
        <Icon opacity={0.3} icon={Options}></Icon>
      </Actions>
    </StyledTitleBar>
  );
}

TitleBar.propTypes = {
  children: PropTypes.any,
};

export default TitleBar;
