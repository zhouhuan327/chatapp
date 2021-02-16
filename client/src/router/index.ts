import { lazyLoad } from "../utils/lodable";
import {
  faCog,
  faCommentDots,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
export const pageRouters: Array<Route> = [
  {
    path: "/chat",
    exact: false,
    icon: null,
    component: lazyLoad(() => import("../layout")),
  },
  {
    path: "/login",
    exact: true,
    icon: null,
    component: lazyLoad(() => import("../layout/Login")),
  },
];
export const routers: Array<Route> = [
  {
    path: "/chat/message",
    exact: false,
    icon: faCommentDots,
    component: lazyLoad(() => import("../layout/MessageList")),
  },
  {
    path: "/chat/contacts",
    exact: false,
    icon: faUsers,
    component: lazyLoad(() => import("../layout/ContactList")),
  },
  {
    path: "/chat/settings",
    exact: false,
    icon: faCog,
    component: lazyLoad(() => import("../layout/setting")),
  },
];
