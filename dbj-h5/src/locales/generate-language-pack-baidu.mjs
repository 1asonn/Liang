import axios from 'axios'
import defaultLang from "./lang/zh.json" assert { type: 'json' }
import langList from "./config.json" assert { type: 'json' }
import md5 from "js-md5"
import fs from "fs"

// 随机数
const generateRandomCode = (num) => {
  const random = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, num - 1));
  return random;
}
const appid = "20230824001792307"
const key = 'ffPOlTvnIiIan4Sb1Kk0'
const salt = generateRandomCode(10);

// 请求
const request = (url, params) => {
  return axios.get(url, { params })
    .then(response => {
      if (response.status == 200) {
        return response.data
      } else {
        return response.status
      }
    })
    .catch(error => {
      console.error(error);
    });
}

// 调用请求
const getFanyiJson = async (value, langType) => {
  const query = value.join('\n')
  const str1 = appid + query + salt + key;
  const sign = md5(str1); // 签名
  const dataReq = {
    q: query,
    from: "zh",
    to: langType,
    appid: appid,
    salt: salt,
    sign: sign
  }
  try {
    const fanyiJson = await request('http://api.fanyi.baidu.com/api/trans/vip/translate', dataReq)
    console.log("🚀 ~ file: generate-language-pack.mjs:46 ~ getFanyiJson ~ fanyiJson:", fanyiJson)
    return fanyiJson
  } catch (error) {
    console.log("🚀 ~ file: index.ts:52 ~ getFanyiJson ~ error:", error)
  }
}

// 生成文件方法
const writeFileFun = (content, fileName) => {
  if (fileName != 'zh') {
    const filePath = `./src/locales/lang/${fileName}.json`;
    fs.writeFile(filePath, JSON.stringify(content), 'utf8', (error) => {
      if (error) {
        console.log('文件创建失败:', error);
      } else {
        console.log('文件创建成功并写入内容');
      }
    });
  }

}

// 处理翻译完之后的数据生成一个json
const formatData = (data, objData) => {
  // 构建翻译后的JSON对象
  const translatedJSON = {};
  Object.keys(objData).forEach((key, index) => {
    translatedJSON[key] = data[index];
  });
  return translatedJSON
}

const langs = Object.keys(langList) // 需要翻译的语言列表,需要对应百度翻译开发者文档上的列表

const langListFun = async () => {
  const promises = langs.map((langItem) => {
    let dataObj = {};
    const innerPromises = [];
    if (langItem != "zh") {
      for (const key in defaultLang) {
        const innerObj = defaultLang[key];
        const enValueObj = Object.values(innerObj);
        const promise = getFanyiJson(enValueObj, langItem).then((res) => {
          const data = res.trans_result;
          const translatedValues = data.map(result => result.dst);
          dataObj[key] = formatData(translatedValues, innerObj);
        });

        innerPromises.push(promise);
      }
    }
    return Promise.all(innerPromises).then(() => {
      return writeFileFun(dataObj, langItem);
    });
  });

  await Promise.all(promises);
};
langListFun()