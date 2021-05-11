import { connect } from "socket.io-client";
import { selector } from "recoil";
import { userIdState } from "./index";
import { url } from "api";
export const socketInstance = selector({
  key: "socketInstance",
  get: ({ get }) => {
    const userId = get(userIdState);
    const socket: SocketIOClient.Socket = connect(`${url}?userId=${userId}`);
    socket.on("connect", () => {
      console.log("socket连接成功");
    });
    return socket;
  },
  dangerouslyAllowMutability: true,
});
