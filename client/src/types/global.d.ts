export {};
declare global {
  interface RespType<T> {
    code: number;
    data: T;
    message: string;
  }
  // 消息内容的类型
  type ContentType = "text" | "file";
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

  // 最近聊天的群/好友
  type RecentChat = {
    _id?: number; // 好友id和群id可能重复,需要额外的唯一值
    id: number; // groupId或者userId
    avatarSrc: string;
    name: string;
    intro: string;
    content: string;
    contentType: ContentType;
    time: string;
    type: "friend" | "group";
    onlineStatus?: "online" | "offline";
    unreadCount: number; // 未读消息
  };
  // 消息类型 私聊消息和群消息
  type MessageType = "friend" | "group";
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
