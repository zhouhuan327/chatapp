export {};
declare global {
  interface ResponseData<T> {
    code: number;
    message: string;
    data: T | any;
  }
  type MessageType = string | 'text' | 'image';
}
