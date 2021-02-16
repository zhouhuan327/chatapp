import axios from "axios";
import { message } from "antd";
import { createBrowserHistory } from "history";
import { authAction } from "./auth";

const history = createBrowserHistory();
const service = axios.create({
  timeout: 50000,
});
service.interceptors.request.use(
  config => {
    console.log(config);
    if (authAction.get()) {
      config.headers["Authorization"] = "Bearer " + authAction.get();
    }
    return config;
  },
  error => Promise.reject(error),
);
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code !== 200) {
      message.error(res.message);
      return Promise.reject(res.message);
    }
    return res;
  },
  error => {
    // console.error(error);
    const data = error?.response?.data;
    if (typeof data === "object") {
      // 请求已发出，但是不在2xx的范围
      if (data.code === 401) {
        message.warning("登录已过期,将重新登录...", 2, () => {
          // 移除登录状态
          authAction.remove();
          history.push("/chat/message");
        });
      } else {
        message.error(data.message);
      }
    } else {
      message.warn("网络连接异常,请稍后再试!");
      return Promise.reject("网络连接异常,请稍后再试!");
    }
  },
);
export default service;
