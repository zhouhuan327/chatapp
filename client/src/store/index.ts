// 这里只定义一些通用的状态,大部分状态在具体组件中定义
import { atom, selector } from "recoil";
import { logout } from "../utils/auth";
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

export const recentChatsState = atom<RecentChat[]>({
  key: "recentChatsState",
  default: [],
});
// export const recentChatsSelector = selector<RecentChat[]>({
//   key: "recentChatsSelector",
//   get: async ({ get }) => {
//     console.log("trigger selector get");
//     const res = await getRecentMessage();
//     return res?.code === 200 ? res.data : [];
//   },
// });

// 当前发送的新消息
export const newMessageState = atom<string>({
  key: "newMessageState",
  default: "",
});

// 用户信息
export const userInfoState = selector({
  key: "userInfoState",
  get: () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.id) {
      logout();
      return {};
    }
    return user;
  },
});
