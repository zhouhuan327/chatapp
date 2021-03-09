import React, { useCallback, useEffect } from "react";

const useSyncListStatus = (socket, list, setList) => {
  const listRef = React.useRef<RecentChat[]>(list);
  useEffect(() => {
    listRef.current = list;
    // 自己的上线触发不了onlineStatus回调,只能手动触发
    socket.emit("onlineStatus");
  }, [list]);
  useEffect(() => {
    // 实时拿到在线人数
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
    setList(listRef.current);
  }, [500]);
  useEffect(() => {
    // 定时器,5s更新一次列表的在线状态
    const timer = setInterval(() => {
      setList(listRef.current);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return [];
};
export default useSyncListStatus;
