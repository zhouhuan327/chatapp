export {};
declare global {
  interface ResponseData<T> {
    code: number;
    message: string;
    data: T | any;
  }
  type MessageType = string | "text" | "image";
  // 最近聊天的群/好友
  type RecentChat = Partial<{
    _id?: number; // 好友id和群id可能重复,需要额外的唯一值
    id: number; // groupId或者userId
    avatarSrc: string;
    name: string;
    intro: string;
    content: string;
    contentType: MessageType;
    time: string;
    type: "friend" | "group";
    unreadCount: number; // 未读消息
  }>;
}
