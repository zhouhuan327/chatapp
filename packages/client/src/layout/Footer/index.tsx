import React, { memo } from "react";
import StyledFooter, { IconContainer, StyledPopoverContent } from "./style";
import { Input } from "/@/components/Input";
import Icon from "/@/components/Icon";
import { ReactComponent as ClipIcon } from "/@/assets/icons/clip.svg";
import { ReactComponent as SmileIcon } from "/@/assets/icons/smile.svg";
import { ReactComponent as PlaneIcon } from "/@/assets/icons/plane.svg";
import { ReactComponent as OptionsIcon } from "/@/assets/icons/options.svg";
import Button from "/@/components/Button";
import Emoji from "/@/components/Emoji";
import Popover from "/@/components/Popover";
import { useRecoilState, useRecoilValue } from "recoil";
import { socketInstance } from "/@/store/socket";
import { recentChatsState } from "/@/store";
import { Form, message, Space } from "antd";
import produce from "immer";
import { Upload } from "antd";
import { RecentChat } from "share/types";
import { getUploadUrl } from "/@/api";
const emojiArray = {
  sweat_smile: "😅",
  smile: "😁",
  cry: "😢",
  ok: "👌",
  cool: "😎",
};
function Footer({ userId, currentChat, setList, animeProps }) {
  const [form] = Form.useForm();
  const inputRef = React.useRef<any>(null);
  const socket = useRecoilValue(socketInstance);
  // 最近消息列表
  const [recentChats, setRecentChats] = useRecoilState<RecentChat[]>(recentChatsState);
  const focus = () => {
    setTimeout(() => {
      // 自动聚焦
      inputRef.current!.focus({
        cursor: "end",
      });
    });
  };
  const handleSubmit = () => {
    const { content } = form.getFieldsValue();

    if (!content) {
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
    focus();
  };

  const handleEmojiSelect = emoji => {
    const { content } = form.getFieldsValue();
    form.setFieldsValue({ content: content ? content + emoji : emoji });
    focus();
  };
  // 发送图片/文件
  const handleUpload = info => {
    const res = info?.file.response;
    if (res?.code === 200) {
      const filename = res.data.fileName || "";
      const { id, type } = currentChat;
      if (!id) return;
      const sendObj = {
        senderId: userId,
        [type === "friend" ? "receiverId" : "groupId"]: id,
        content: filename,
        type: "file",
      };
      socket.emit(`${type}ChatMessage`, sendObj);
      form.resetFields();
    }
  };
  return (
    <StyledFooter style={{ ...animeProps }}>
      <Form form={form}>
        <Form.Item noStyle name="content">
          <Input
            ref={inputRef}
            placeholder="输入想要说的话"
            prefix={
              <Space>
                <Upload
                  action={getUploadUrl()}
                  name="file"
                  // accept=".jpg, .jpeg, .png"
                  showUploadList={false}
                  maxCount={1}
                  onChange={handleUpload}
                >
                  <Icon style={{ cursor: "pointer" }} icon={ClipIcon} />
                </Upload>
                <Popover
                  offset={{ x: "-25%" }}
                  content={
                    <StyledPopoverContent>
                      {Object.entries(emojiArray).map(([label, emoji]) => (
                        <Emoji onClick={() => handleEmojiSelect(emoji)} label={label}>
                          {emoji}
                        </Emoji>
                      ))}

                      {/*<Icon icon={OptionsIcon} style={{ marginLeft: "24px" }} />*/}
                    </StyledPopoverContent>
                  }
                >
                  <Icon icon={SmileIcon} />
                </Popover>
              </Space>
            }
            suffix={
              <IconContainer>
                <Button size="52px" onClick={handleSubmit}>
                  <Icon color="white" icon={PlaneIcon} style={{ transform: "translateX(-2px)" }} />
                </Button>
              </IconContainer>
            }
          />
        </Form.Item>
      </Form>
    </StyledFooter>
  );
}

export default memo(Footer);
