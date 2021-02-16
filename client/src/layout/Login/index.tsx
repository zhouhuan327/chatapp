import { memo, useState } from "react";
import ScLogin, { Card } from "./style";
import InputText from "../../components/Input/InputText";
import Button from "../../components/Button";
import { message } from "antd";
import { authAction } from "../../utils/auth";
import { login } from "../../api";
import { useHistory } from "react-router-dom";
// TODO 临时登录页
const Index = () => {
  const history = useHistory();
  const [data, setData] = useState({ username: "", password: "" });
  const submit = async () => {
    const res = await login(data);
    if (res.code === 200) {
      message.success("登陆成功");
      authAction.set(res.data?.token);
      history.push("/chat/message");
    }
  };
  return (
    <ScLogin>
      <Card>
        <h1>登录</h1>
        <InputText
          label="账号"
          onChange={v => {
            setData({ ...data, username: v });
          }}
        />
        <InputText
          label="密码"
          onChange={v => {
            setData({ ...data, password: v });
          }}
        />
        <Button shape="rect" onClick={submit}>
          登录
        </Button>
      </Card>
    </ScLogin>
  );
};
export default memo(Index);
