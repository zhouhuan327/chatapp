import { connect } from "socket.io-client";
import { selector } from "recoil";
import { userInfoAtom } from "./index";
import { API } from "/@/constants";
export const socketInstance = selector({
  key: "socketInstance",
  get: ({ get }) => {
    const { id } = get(userInfoAtom);
    const socket: SocketIOClient.Socket = connect(`${API}?userId=${id}`, {
      transports: ["websocket"],
    });
    socket.on("connect", () => {
      console.log("socket连接成功");
    });
    return socket;
  },
  dangerouslyAllowMutability: true,
});
