import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
const DeviceWidth = Dimensions.get('window').width;
const UIWidth = 1080;

export const elpx = (UIElePx: number) => {
  return UIElePx * (DeviceWidth / UIWidth);
};

// 缓存值
export const storeData = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    // saving error
  }
}
// 缓存取值
export const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
}

export const formatDateTime = (dateTime: string) => {
  if (!dateTime) { return '' }
  const [date, time] = dateTime.split(' ');
  const [year, month, day] = date.split('-');
  const [hours, minutes, seconds] = time.split(':');
  const formattedDate = `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
  return formattedDate;
}

export const minutesToHHMM = (minutes) => {
  if (!minutes) { return '' }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  const hoursString = String(hours).padStart(2, '0');
  const minsString = String(mins).padStart(2, '0');

  return `${hoursString}:${minsString}`;
}


export const generateRandomNumber = () => {
  const min = Math.pow(10, 15); // 最小值为 10^15
  const max = Math.pow(10, 16) - 1; // 最大值为 10^16 - 1
  return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
}

export const randomWord = () => {
  // 生成 0 到 16777215 之间的随机整数
  var randomInt = Math.floor(Math.random() * 16777216);
  // 将随机整数转换为十六进制字符串
  var hexString = randomInt.toString(16);
  // 如果十六进制字符串长度不足12位，则在前面补零
  while (hexString.length < 12) {
    hexString = '0' + hexString;
  }
  return hexString;


}

// 指令参数格式化
// js 一个字符串如果是两位则在后面补两个0，如果是三位则在前面补一个0，并且将前两位跟后两位对调位置
export const paramsHex = (str) => {
  str = parseInt(str)
  let str16 = str.toString(16)
  if (str16.length == 1) {
    // 在字符串后面补两个零
    str16 = '0' + str16 + '00';
  } if (str16.length == 2) {
    // 在字符串后面补两个零
    str16 += '00';
  } else if (str16.length == 3) {
    // 在字符串前面补一个零
    str16 = '0' + str16;
    // 将前两位和后两位对调位置
    str16 = str16.slice(2) + str16.slice(0, 2);
  }
  return str16;
}


// 指令参数格式化
// 16进制转10进制，需要先将前两位和后两位调换位置
export const paramsHexToNumber = (hex) => {
  // 传入"B7 D4", 翻转去除空格"4D7B", 结果19835
  // console.log("传入的值: ", hex);
  // let res = hex.slice(2) + hex.slice(0, 2);
  hex = hex.toString()
  var groupedDigits = [];
  for (var i = 0; i < hex.length; i += 2) {
    groupedDigits.push(hex.slice(i, i + 2));
  }
  var reversedGroups = groupedDigits.reverse();
  var result = reversedGroups.join('');
  result = parseInt(result, 16)
  // console.log("16转10的值: ", result);//十六进制转十进制
  return result
}

// 字符串转16进制
export const stringToHEX = (str) => {
  let val = "";
  for (let i = 0; i < str.length; i++) {
    if (val == "")
      val = str.charCodeAt(i).toString(16);
    else
      val += str.charCodeAt(i).toString(16);
  }
  return val
}


// 计算字节长度
export const byteLength = (str) => {
  var cnt = 0;
  for (var i = 0; i < str.length; i++) {
    var c = str.charAt(i);
    if (/^[\u0000-\u00ff]$/.test(c)) {
      cnt++;
    } else {
      cnt += 2;
    }
  }
  cnt = cnt + 3
  let cntStr = cnt.toString(16)
  if (cntStr.length < 2) {
    cntStr = "0" + cntStr
  }
  return cntStr
}