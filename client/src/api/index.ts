import request from "../utils/request";

export const url =
  process.env.NODE_ENV === "development" ? "http://192.168.31.159:3305" : "";

// 登录
export const login = data =>
  request({ url: "/api/auth/login", method: "post", data });

//好友列表
export const getFriends = (params: { name?: string }) =>
  request({ url: "/api/friend", method: "get", params });

// 群列表
export const getGroups = params =>
  request({ url: "/api/group", method: "get", params });

// 最新消息列表
export const getRecentMessage = () =>
  request({ url: "/api/message/list", method: "get" });

// 和好友的聊天记录
export const getFriendMessage = (params: { friendId: number }) =>
  request({ url: "/api/message/friend", method: "get", params });
// 群的聊天记录
export const getGroupMessage = (params: { groupId: number }) =>
  request({ url: "/api/message/group", method: "get", params });

// 搜索用户
export const searchUsers = (params: { name: string }) =>
  request.get("/api/user", { params });
// 搜索用户
export const searchGroups = (params: { name: string }) =>
  request.get("/api/group/search", { params });
// 添加好友
export const addFriend = (body: { friendId: number }) =>
  request.post("/api/friend", body);
// 加入群
export const joinGroup = (body: { groupId: number }) =>
  request.post("/api/group/join", body);
export const getUserDetail = (params: { id: number }) =>
  request.get("/api/user/detail", { params });
export const getGroupDetail = (params: { id: number }) =>
  request.get("/api/group/detail", { params });
export const updateUser = (body: UserInfo) => request.patch("/api/user", body);
