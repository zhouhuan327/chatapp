export {};
declare global {
  type MessageType = string | "text" | "image";
  interface Route {
    path: string;
    exact: boolean;
    icon?: any;
    title?: string;
    component: lazyLoad<any>;
  }
}
