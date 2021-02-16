import { connect } from "socket.io-client";
import { atom } from "recoil";
console.log("socket 连接中");
const socket: SocketIOClient.Socket = connect("http://localhost:3000?userId=1");
socket.on("connect", function () {
  console.log("socket 连接成功");
});
socket.on("groupChatConnect", res => {
  console.log("groupChatConnect", res);
});
export const socketInstance = atom({
  key: "socketInstance",
  default: socket,
});
