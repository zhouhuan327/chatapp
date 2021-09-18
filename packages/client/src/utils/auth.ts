// import CryptoJS from "crypto-js";
import { message } from "antd";

export const authAction = {
  get: () => localStorage.getItem("Authorization"),
  set: token => {
    localStorage.setItem("Authorization", "Bearer " + token);
  },
  remove: () => {
    localStorage.removeItem("Authorization");
  },
};
export const logout = () => {
  message.warning("登录已过期,将重新登录...", 1, () => {
    // 移除登录状态
    authAction.remove();
    window.location.href = "/login";
  });
};
// /**
//  *加密
//  */
// export const encrypt = (word: string) => {
//   const key = CryptoJS.enc.Utf8.parse("efgabcd12abcdefg");
//   const srcs = CryptoJS.enc.Utf8.parse(word);
//   const encrypted = CryptoJS.AES.encrypt(srcs, key, {
//     mode: CryptoJS.mode.ECB,
//     padding: CryptoJS.pad.Pkcs7,
//   });
//   return encrypted.toString();
// };
// /**
//  *解密
//  */
// export const decrypt = (word: string) => {
//   const key = CryptoJS.enc.Utf8.parse("efgabcd12abcdefg");
//   const decrypt = CryptoJS.AES.decrypt(word, key, {
//     mode: CryptoJS.mode.ECB,
//     padding: CryptoJS.pad.Pkcs7,
//   });
//   return CryptoJS.enc.Utf8.stringify(decrypt).toString();
// };
