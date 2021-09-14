import { StatusCode } from "../constants";
import * as moment from "moment";
import { Response } from "share/types";
// 通过两个id生成一个不大会重复的固定数值
export const genRoomId = (senderId, receiverId) => {
  const [max, min] = senderId > receiverId ? [senderId, receiverId] : [receiverId, senderId];
  const str = String(Math.atan2(max, min));
  return str.substring(2, 6);
};
// ws返回体
export const successResp = (data, message = "成功"): Response<any> => {
  return { code: StatusCode.Success, data: data, message };
};
export const errorResp = (e): Response<any> => {
  return {
    code: StatusCode.Error,
    data: null,
    message: e.response?.message || e.toString(),
  };
};

export const formatTime = time => {
  return moment(time).format("YYYY-MM-DD HH:mm");
};
export const getTimeDiff = (time: string): string => {
  let res = "";
  const diff = moment().diff(time, "minutes");
  if (diff < 60) {
    res = diff + "分钟前";
  } else if (diff > 60 && diff < 24 * 60) {
    res = Math.round(diff / 60) + "小时前";
  } else {
    res = Math.round(diff / 60 / 24) + "天前";
  }

  return res;
};
