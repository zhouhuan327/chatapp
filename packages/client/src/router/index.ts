import { lazyLoad } from "../utils/lodable";
import { faCog, faCommentDots, faUsers, faObjectGroup } from "@fortawesome/free-solid-svg-icons";
export const pageRouters: Array<Route> = [
  {
    path: "/chat",
    exact: false,
    component: lazyLoad(() => import("../layout")),
  },
  {
    path: "/login",
    exact: false,
    component: lazyLoad(() => import("../layout/Login")),
  },
];
export const routers: Array<Route> = [
  {
    path: "/chat/message",
    exact: false,
    title: "最近聊天",
    icon: faCommentDots,
    component: lazyLoad(() => import("../layout/RecentChatList")),
  },
  {
    path: "/chat/friends",
    exact: false,
    title: "好友列表",
    icon: faUsers,
    component: lazyLoad(() => import("../layout/FriendList")),
  },
  {
    path: "/chat/groups",
    exact: false,
    title: "群聊列表",
    icon: faObjectGroup,
    component: lazyLoad(() => import("../layout/GroupList")),
  },
  {
    path: "/chat/settings",
    exact: false,
    title: "设置",
    icon: faCog,
    component: lazyLoad(() => import("../layout/setting")),
  },
];
