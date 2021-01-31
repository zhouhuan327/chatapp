import React from "react";
import StyledVoiceMessage from "./style";
import { ReactComponent as Play } from "assets/icons/play.svg";
import { ReactComponent as Wave } from "assets/icons/wave.svg";
import { useTheme } from "styled-components";
import Button from "components/Button";
import Icon from "components/Icon";
import Text from "components/Text";
interface Props {
  type?: string;
  time?: string;
}
const VoiceMessage: React.FC<Props> = ({ children, time, type }) => {
  const theme: any = useTheme();
  return (
    <StyledVoiceMessage type={type}>
      <Button size="30px">
        <Icon
          icon={Play}
          color="white"
          width="12"
          height="12"
          style={{ transform: "translateX(1px)" }}
        />
      </Button>
      <Icon icon={Wave} width="100%" height="100%" color={theme.primaryColor} />
      <Text bold>{time}</Text>
    </StyledVoiceMessage>
  );
};

export default VoiceMessage;
