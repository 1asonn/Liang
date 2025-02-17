import Taro from "@tarojs/taro";
import { SUCCESS } from "./config";
import GLOBAL from "../utils/constant"

export default function request(url, method, params?, headers?) {
  let header = {
    "ram-system": '2',
    "ram-token": 'anonymous',
    "x-accept-language": GLOBAL.xAcceptLanguage,
    "x-timezone": GLOBAL.xTimezone
  };
  if (method == "POST") {
    header["Content-Type"] = "application/json"
  }
  return new Promise<any>((resolve, reject) => {
    const requestTask = Taro.request({
      url: url,
      method: method,
      data: params ? params : undefined,
      header: headers ? headers : header,
      success: (r) => {
        if (r.statusCode == 200) {
          if (r.data && r.data.code == SUCCESS) {
            resolve(r.data.body || {});
          } else {
            Taro.showToast({
                title: r.data.message,
                icon: 'none',
                duration: 2000,
            });
            reject(r.data);
          }
        } else {
          reject(r);
        }
      },
      fail: (error) => {
        reject({ message: "请求异常" })
      },
    });
  });
}
