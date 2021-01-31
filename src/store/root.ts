import { atom } from "recoil";
// 是否显示个人信息抽屉
export const profileVisible = atom({
  key: "profileVisible",
  default: false,
});
// 当前选中的消息
export const activeMessage = atom({
  key: "activeMessage",
  default: 0,
});
