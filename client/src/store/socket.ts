import { connect } from "socket.io-client";
import { atom, selector } from "recoil";
import { userIdState } from "./index";

export const socketInstance = selector({
  key: "socketInstance",
  get: ({ get }) => {
    const userId = get(userIdState);
    const socket: SocketIOClient.Socket = connect(
      `http://localhost:3305?userId=${userId}`,
    );
    socket.on("connect", () => {
      console.log("socket连接成功");
    });
    return socket;
  },
  dangerouslyAllowMutability: true,
});
