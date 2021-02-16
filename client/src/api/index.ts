import request from "../utils/request";

export const login = data =>
  request({ url: "/api/auth/login", method: "post", data });
