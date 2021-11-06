// 这里只定义一些通用的状态,大部分状态在具体组件中定义
import { atom } from "recoil";
import { RecentChat } from "share/types";

export const userInfoAtom = atom<UserInfo>({
  key: "userInfoAtom",
  default: {} as UserInfo,
});
// 详情抽屉
export const detailDrawerAtom = atom<{ visible: boolean; data?: any }>({
  key: "detailDrawer",
  default: {
    visible: false,
    data: {},
  },
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
