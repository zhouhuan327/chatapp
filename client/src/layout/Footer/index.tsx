import React, { memo } from "react";
import StyledFooter, { IconContainer, StyledPopoverContent } from "./style";
import { Input, Search } from "components/Input";
import Icon from "components/Icon";
import { ReactComponent as ClipIcon } from "assets/icons/clip.svg";
import { ReactComponent as SmileIcon } from "assets/icons/smile.svg";
import { ReactComponent as MicrophoneIcon } from "assets/icons/microphone.svg";
import { ReactComponent as PlaneIcon } from "assets/icons/plane.svg";
import { ReactComponent as OptionsIcon } from "assets/icons/options.svg";
import Button from "components/Button";
import Emoji from "components/Emoji";
import Popover from "components/Popover";
import { useRecoilState, useRecoilValue } from "recoil";
import { socketInstance } from "store/socket";
import { recentChatsState } from "../../store";
import { Form, message } from "antd";
import produce from "immer";

const PopoverContent = () => (
  <StyledPopoverContent>
    <Emoji label="smile">😁</Emoji>
    <Emoji label="cry">😢</Emoji>
    <Emoji label="ok">👌</Emoji>
    <Emoji label="cool">😎</Emoji>
    <Icon icon={OptionsIcon} style={{ marginLeft: "24px" }} />
  </StyledPopoverContent>
);
function Footer({ userId, currentChat, setList, animeProps }) {
  const [form] = Form.useForm();
  const socket = useRecoilValue(socketInstance);
  // 最近消息列表
  const [recentChats, setRecentChats] = useRecoilState<RecentChat[]>(
    recentChatsState,
  );
  const handleSubmit = () => {
    const { content } = form.getFieldsValue();
    if (content?.length === 0) {
      message.warn("请输入内容");
      return;
    }
    const { id, type } = currentChat;
    if (!id) return;
    // 发送私聊/群聊消息
    const sendObj = {
      senderId: userId,
      [type === "friend" ? "receiverId" : "groupId"]: id,
      content: content,
      type: "text",
    };
    socket.emit(`${type}ChatMessage`, sendObj);
    // 更新左侧列表,把当前放到顶部
    setRecentChats(list => {
      const targetIndex = list.findIndex(item => item._id === currentChat._id);
      if (targetIndex > -1) {
        const newState = produce(list, draft => {
          const target = draft[targetIndex];
          target.content = content;
          draft.splice(targetIndex, 1);
          draft.unshift(target);
        });
        return newState;
      } else {
        return list;
      }
    });
    // 发送后清空消息栏
    form.resetFields();
  };
  return (
    <StyledFooter style={{ ...animeProps }}>
      <Form form={form}>
        <Form.Item noStyle name="content">
          <Input
            placeholder="输入想要说的话"
            prefix={<Icon icon={ClipIcon} />}
            suffix={
              <IconContainer>
                <Popover offset={{ x: "-25%" }} content={<PopoverContent />}>
                  <Icon icon={SmileIcon} />
                </Popover>
                <Icon icon={MicrophoneIcon} />
                <Button size="52px" onClick={handleSubmit}>
                  <Icon
                    color="white"
                    icon={PlaneIcon}
                    style={{ transform: "translateX(-2px)" }}
                  />
                </Button>
              </IconContainer>
            }
            onEnter={handleSubmit}
          />
        </Form.Item>
      </Form>
    </StyledFooter>
  );
}

export default memo(Footer);
