import request from "../utils/request";

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
export const getUsers = (params: { name: string }) =>
  request.get("/api/user", { params });
// 添加好友
export const addFriend = (body: { friendId: number }) =>
  request.post("/api/friend", body);

export const getUserDetail = (params: { id: number }) =>
  request.get("/api/user/detail", { params });
export const updateUser = (body: UserInfo) => request.patch("/api/user", body);
