import axios from 'axios'
import defaultLang from "./lang/zh.json" assert { type: 'json' }
import langList from "./config.json" assert { type: 'json' }
import md5 from "js-md5"
import fs from "fs"

// 定义谷歌翻译 API 的端点和 API 密钥
const apiUrl = 'https://translation.googleapis.com/language/translate/v2';
const apiKey = 'AIzaSyCUCRCJaDFyoU7YPf1MDZhU4vHvwYC-SPI';


// 谷歌翻译 API 调用函数
async function translateText(text, targetLanguage) {
  const params = {
    key: apiKey,
    q: text,
    target: targetLanguage
  };

  try {
    const response = await axios.post(apiUrl, null, {
      params: params,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error('翻译 API 调用出错:', error);
    throw error;
  }
}

// 翻译 JSON 的函数
async function translateJSON(defaultLang, targetLanguage) {
  try {
    const translatedJSON = {};

    for (const [key, value] of Object.entries(defaultLang)) {
      if (typeof value === 'object') {
        translatedJSON[key] = await translateJSON(value, targetLanguage);
      } else {
        translatedJSON[key] = await translateText(value, targetLanguage);
      }
    }

    return translatedJSON;
  } catch (error) {
    console.error('翻译 JSON 出错:', error);
    throw error;
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



const langs = Object.keys(langList) // 需要翻译的语言列表,需要对应百度翻译开发者文档上的列表

const langListFun = async () => {
  const promises = langs.map((langItem) => {
    console.log("🚀 ~ file: generate-language-pack.mjs:145 ~ promises ~ langItem:", langItem)
    // 翻译 JSON
    if (langItem != 'zh') {

      translateJSON(defaultLang, langItem)
        .then(translatedJSON => {
          console.log('翻译结果:', translatedJSON);
          writeFileFun(translatedJSON, langItem)
        })
        .catch(error => {
          console.error('翻译 JSON 出错:', error);
        });
    }

  });

};

langListFun()