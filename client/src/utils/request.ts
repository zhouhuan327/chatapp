import axios from "axios";
import { message } from "antd";
import { authAction } from "./auth";

const service = axios.create({
  timeout: 50000,
});
service.interceptors.request.use(
  config => {
    if (authAction.get()) {
      config.headers["Authorization"] = authAction.get();
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
        message.warning("登录已过期,将重新登录...", 1, () => {
          // 移除登录状态
          authAction.remove();
          window.location.href = "/login";
        });
      } else {
        message.error(data.message);
      }
      return Promise.reject(data);
    } else {
      message.warn("网络连接异常,请稍后再试!");
      return Promise.reject("网络连接异常,请稍后再试!");
    }
  },
);
export default service;