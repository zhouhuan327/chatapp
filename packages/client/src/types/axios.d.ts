export {};
declare module "axios" {
  export interface AxiosResponse<any> extends Promise<any> {}
}
