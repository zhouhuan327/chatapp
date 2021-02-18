import { atom, selector } from "recoil";
// 这里只定义一些通用的状态,大部分状态在具体组件中定义

// 用户信息
export const userInfoState = selector({
  key: "userInfoState",
  get: () => JSON.parse(localStorage.getItem("user") || "{}"),
});

// 是否显示个人信息抽屉
export const profileVisible = atom({
  key: "profileVisible",
  default: false,
});

// 当前选中的群/好友 对象
export const currentChatState = atom({
  key: "currentChatState",
  default: {},
});
