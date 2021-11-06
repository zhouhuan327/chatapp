import React, { useEffect } from "react";
import { RecentChat } from "share/types";

const useSyncListStatus = (socket, list, setList) => {
  const listRef = React.useRef<RecentChat[]>(list);
  // 实时拿到在线人数,更新列表在线状态
  useEffect(() => {
    socket.on("onlineStatus", onlineUser => {
      const filter = listRef.current.map(item => {
        if (item.type === "group") return item;
        if (onlineUser.includes(String(item.id))) {
          return { ...item, onlineStatus: "online" };
        }
        return { ...item, onlineStatus: "offline" };
      });
      listRef.current = filter as any;
    });
  }, [socket]);

  useEffect(() => {
    listRef.current = list;
    // 自己的上线触发不了onlineStatus回调,只能手动触发
    socket.emit("onlineStatus");
  }, [list]);
  // 首次加载更新在线状态
  useEffect(() => {
    setTimeout(() => {
      setList(listRef.current);
    }, 1000);
  }, []);
  useEffect(() => {
    // 定时器,5s更新一次列表的在线状态
    const timer = setInterval(() => {
      setList(listRef.current);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return [];
};
export default useSyncListStatus;
