export {};
declare global {
  interface ResponseData<T> {
    code: number;
    message: string;
    data: T | any;
  }
  type MessageType = string | 'text' | 'image';
  // 最近聊天的群/好友
  interface RecentChat {
    id: number;
    avatar: string;
    name: string;
    intro: string;
    content: string;
    contentType: MessageType;
    time: string;
    type: 'friend' | 'group';
  }
}
