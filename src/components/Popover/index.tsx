import React, { useState } from "react";
import StyledPopover, { Triangle, Content, Target } from "./style";
interface PopoverProps {
  content?: any;
  offset?: {
    x?: string;
    y?: string;
  };
  onVisible?: Function;
  onHide?: Function;
}
const Popover: React.FC<PopoverProps> = ({
  children,
  content,
  onHide,
  onVisible,
  offset = {},
  ...rest
}) => {
  const [visible, setVisible] = useState(false);
  const handleClick = () => {
    if (visible) {
      setVisible(false);
      onHide && onHide();
    } else {
      setVisible(true);
      onVisible && onVisible();
    }
  };
  return (
    <StyledPopover onClick={handleClick} {...rest}>
      <Content visible={visible} offset={offset}>
        {content}
      </Content>
      <Triangle visible={visible} offset={offset} />
      <Target>{children}</Target>
    </StyledPopover>
  );
};

export default Popover;
