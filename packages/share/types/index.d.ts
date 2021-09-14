// 接口返回
export interface Response<T> {
  code: number;
  message: string;
  data: T | any;
}

type MessageType = "text" | "file" | "emoji";

// 最近聊天的群/好友
type RecentChat = {
  _id?: number; // 好友id和群id可能重复,需要额外的唯一值
  id: number; // groupId或者userId
  avatarSrc: string;
  name: string;
  intro: string;
  content: string;
  contentType: MessageType;
  onlineStatus?: string;
  time: string;
  type: "friend" | "group";
  unreadCount: number; // 未读消息
};
