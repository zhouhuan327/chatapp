import React, { useCallback, useEffect } from "react";

const useSyncOnlineStatus = (socket, list, setList) => {
  const onlineUser = React.useRef<string[]>([]);
  useEffect(() => {
    // 实时拿到在线人数
    socket.on("onlineStatus", res => {
      onlineUser.current = res;
    });
    // 自己的上线触发不了onlineStatus回调,只能手动触发
    socket.emit("onlineStatus");
  }, [socket]);
  useEffect(() => {
    // 定时器,5s更新一次列表的在线状态
    const timer = setInterval(() => {
      update(list);
    }, 5000);
    return () => clearInterval(timer);
  }, [list]);

  const update = useCallback(list => {
    const filter = list.map(item => {
      if (item.type === "group") return item;
      if (onlineUser.current.includes(String(item.id))) {
        return { ...item, onlineStatus: "online" };
      }
      return { ...item, onlineStatus: "offline" };
    });
    setList(filter as any);
  }, []);
  return update;
};
export default useSyncOnlineStatus;
