import { lazyLoad } from "../utils/lodable";
import {
  faCog,
  faCommentDots,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export const routers: Array<Route> = [
  {
    path: "/",
    exact: true,
    icon: faCommentDots,
    component: lazyLoad(() => import("../layout/MessageList")),
  },
  {
    path: "/contacts",
    exact: true,
    icon: faUsers,
    component: lazyLoad(() => import("../layout/ContactList")),
  },
  {
    path: "/settings",
    exact: true,
    icon: faCog,
    component: lazyLoad(() => import("../layout/setting")),
  },
];
