import React, { memo, useEffect, useState } from "react";
import { Modal, Form, Radio, Input, message, Upload } from "antd";
import Avatar from "../../components/Avatar";
import { getUploadUrl, updateUser } from "/@/api";
import { userInfoAtom } from "/@/store";
import { useRecoilState } from "recoil";
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const EditModal = ({ visible, setVisible, type }) => {
  const [form] = Form.useForm();
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);

  useEffect(() => {
    if (userInfo.id) {
      form.setFieldsValue(userInfo);
      setAvatarSrc(userInfo.avatarSrc);
    }
  }, [form, userInfo]);

  const handleSubmit = async () => {
    const fields = form.getFieldsValue();
    fields.id = userInfo.id;
    const res = await updateUser(fields);
    if (res.code === 200) {
      message.success("保存成功");
      setUserInfo(res.data);

      setVisible(false);
    }
  };

  const [avatarSrc, setAvatarSrc] = useState("xxx");
  const handleUpload = info => {
    const res = info?.file.response;
    if (res?.code === 200) {
      setAvatarSrc(res?.data?.fileName);
      form.setFieldsValue({ avatarSrc: res?.data?.fileName });
    }
  };
  const userItems = (
    <>
      <Form.Item label="头像">
        <Upload action={getUploadUrl()} name="file" maxCount={1} onChange={handleUpload}>
          <Form.Item noStyle name="avatarSrc">
            <Avatar src={avatarSrc} />
          </Form.Item>
        </Upload>
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
          <Radio value="男">男</Radio>
          <Radio value="女">女</Radio>
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
      forceRender
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
