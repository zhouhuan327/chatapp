// 这里只定义一些通用的状态,大部分状态在具体组件中定义
import { atom, selector } from "recoil";
import { logout } from "../utils/auth";
import { RecentChat } from "share/types";
// 是否显示个人信息抽屉
export const profileVisible = atom({
  key: "profileVisibleState",
  default: false,
});
export const detail = atom<UserInfo>({
  key: "detailState",
  default: {} as UserInfo,
});
// 当前选中的群/好友 对象
export const currentChatState = atom({
  key: "currentChatState",
  default: {},
});

export const recentChatsState = atom<RecentChat[]>({
  key: "recentChatsState",
  default: [],
});
// 当前发送的新消息
export const newMessageState = atom<string>({
  key: "newMessageState",
  default: "",
});

// 用户信息
export const userIdState = selector({
  key: "userIdState",
  get: () => {
    const id = parseInt(localStorage.getItem("userId") || "");
    if (!id || isNaN(id)) {
      logout();
      return 0;
    }
    return id;
  },
});
