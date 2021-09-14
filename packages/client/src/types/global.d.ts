import { MessageType } from "share/types";

export {};
declare global {
  // 路由结构
  interface Route {
    path: string;
    exact: boolean;
    icon?: any;
    title?: string;
    component: lazyLoad<any>;
  }
  type UserInfo = {
    id: number;
    avatarSrc: string;
    username: string;
    intro: string;
    email: string;
    sex: string;
    address: string;
    createTime: string;
  };
  type GroupInfo = Partial<{
    id: number;
    avatarSrc: string;
    groupName: string;
    intro: string;
    createTime: string;
  }>;

  interface Message {
    id: number;
    content: string;
    type: ContentType;
    createTime: string;
  }
  interface GroupMessage extends Message {
    messageType: MessageType;
    user: UserInfo;
  }
  interface FriendMessage extends Message {
    messageType: MessageType;
    sender: UserInfo;
    receiver: UserInfo;
  }
}
