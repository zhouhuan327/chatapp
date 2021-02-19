import { connect } from "socket.io-client";
import { atom, selector } from "recoil";
import { userInfoState } from "./index";

export const socketInstance = selector({
  key: "socketInstance",
  get: ({ get }) => {
    const user = get(userInfoState);
    const socket: SocketIOClient.Socket = connect(
      `http://localhost:3000?userId=${user.id}`,
    );
    socket.on("connect", () => {
      console.log("socket连接成功");
    });
    return socket;
  },
  dangerouslyAllowMutability: true,
});
