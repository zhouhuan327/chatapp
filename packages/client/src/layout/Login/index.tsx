import React, { memo } from "react";
import ScLogin, { Card } from "./style";
import { Form, Input } from "antd";
import Button from "../../components/Button";
import { message } from "antd";
import { authAction } from "/@/utils/auth";
import { login } from "/@/api";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
const Index = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const submit = async () => {
    const res = await login(form.getFieldsValue());
    if (res.code === 200) {
      authAction.set(res.data.token);

      message.success("登陆成功");
      history.push("/chat/message");
    }
  };
  return (
    <ScLogin>
      <Card>
        <h1>登录</h1>
        <Form form={form}>
          <Form.Item label="账号" name="username">
            <InputUnderLine />
          </Form.Item>
          <Form.Item label="密码" name="password">
            <InputUnderLine type="password" />
          </Form.Item>
        </Form>
        <Button shape="rect" onClick={submit}>
          登录 / 注册为新用户
        </Button>
      </Card>
    </ScLogin>
  );
};
const InputUnderLine = styled(Input)`
  border: none;
  font-size: ${props => props.theme.normal};
  border-bottom: 1px solid ${props => props.theme.gray4};
  width: 100%;
  padding: 5px 0;
  background: none;
  transition: all 0.2s ease;
  &::placeholder {
    color: ${props => props.theme.gray5};
  }
  :focus,
  :hover {
    border-bottom-color: ${props => props.theme.primaryColor};
  }
`;
export default memo(Index);
