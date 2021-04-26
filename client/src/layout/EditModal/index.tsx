import React, { memo, useEffect, useState } from "react";
import { Modal, Form, Radio, Input, message } from "antd";
import Avatar from "../../components/Avatar";
import { getUserDetail, updateUser } from "../../api";
import { useRecoilValue } from "recoil";
import { userIdState } from "../../store";

const EditModal = ({ visible, setVisible, type }) => {
  const [form] = Form.useForm();
  const userId = useRecoilValue<number>(userIdState);
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };

  const setForm = async () => {
    const res = await getUserDetail({ id: userId });
    setAvatarSrc(res.data.avatarSrc);
    form.setFieldsValue(res.data);
  };
  const handleSubmit = async () => {
    const fields = form.getFieldsValue();
    fields.id = userId;
    const res = await updateUser(fields);
    if (res.code === 200) {
      message.success("保存成功");
      setForm();
    }
  };
  useEffect(() => {
    setForm();
  }, []);
  const [avatarSrc, setAvatarSrc] = useState("");
  const userItems = (
    <>
      <Form.Item label="头像" name="avatarSrc">
        <Avatar src={avatarSrc} />
      </Form.Item>
      <Form.Item label="用户名" name="username">
        <Input disabled={true} />
      </Form.Item>
      <Form.Item label="个人介绍" name="intro">
        <Input />
      </Form.Item>
      <Form.Item label="所在地" name="address">
        <Input />
      </Form.Item>
      <Form.Item label="电子邮件" name="email">
        <Input />
      </Form.Item>
      <Form.Item label="性别" name="sex">
        <Radio.Group>
          <Radio value={1}>男</Radio>
          <Radio value={0}>女</Radio>
        </Radio.Group>
      </Form.Item>
    </>
  );
  return (
    <Modal
      title="个人信息修改"
      visible={visible}
      onCancel={() => setVisible(false)}
      onOk={handleSubmit}
      okText="确定"
      cancelText="取消"
    >
      <Form {...layout} form={form}>
        {userItems}
      </Form>
    </Modal>
  );
};
export default memo(EditModal);
