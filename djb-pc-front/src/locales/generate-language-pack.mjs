import axios from 'axios';
import fs from 'fs';
import { readdir, readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// API 配置
const apiUrl = 'https://translation.googleapis.com/language/translate/v2';
const apiKey = 'AIzaSyCUCRCJaDFyoU7YPf1MDZhU4vHvwYC-SPI';

// 读取目录下所有 ts 文件
async function readTsFiles(dirPath, tsFiles = {}) {
  const files = await readdir(dirPath);
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    if (file === 'zh-CN.ts') {
      // 读取并解析 ts 文件
      const content = await readFile(filePath, 'utf-8');
      // 简单处理 ts 文件内容，提取 export default {} 中的内容
      const jsonContent = content.match(/export\s+default\s+({[\s\S]*?});?$/m)[1];
      try {
        // 使用 eval 来解析 JavaScript 对象
        // eslint-disable-next-line no-eval
        const obj = eval('(' + jsonContent + ')');
        tsFiles[path.dirname(filePath)] = obj;
      } catch (error) {
        console.error(`Failed to parse file ${filePath}:`, error);
        throw error;
      }
    }
  }
  return tsFiles;
}

// 翻译文本
async function translateText(text, targetLanguage) {
  const params = {
    key: apiKey,
    q: text,
    target: targetLanguage,
  };

  try {
    const response = await axios.post(apiUrl, null, {
      params: params,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error('翻译 API 调用出错:', error);
    throw error;
  }
}

// 翻译 JSON 对象
async function translateJSON(content, targetLanguage) {
  try {
    const translatedJSON = {};

    for (const [key, value] of Object.entries(content)) {
      if (typeof value === 'object') {
        translatedJSON[key] = await translateJSON(value, targetLanguage);
      } else {
        translatedJSON[key] = await translateText(value, targetLanguage);
        // translatedJSON[key] = `${value}-${targetLanguage}`;
      }
    }
    return translatedJSON;
  } catch (error) {
    console.error('翻译 JSON 出错:', error);
    throw error;
  }
}

// 写入文件
async function writeFileFun(writePath, content) {
  // 生成 TypeScript 内容
  const tsContent = `export default ${JSON.stringify(content, null, 2)} as const;`;

  try {
    await fs.promises.writeFile(writePath, tsContent, 'utf8');
    console.log(`Created ${writePath} successfully`);
  } catch (error) {
    console.error(`Failed to create ${writePath}:`, error);
  }
}

// 主函数
async function main() {
  try {
    // 读取配置文件
    const configPath = path.join(__dirname, 'config.json');
    const configContent = await readFile(configPath, 'utf-8');
    const langList = JSON.parse(configContent);
    const langs = Object.values(langList);
    // 读取所有中文源文件
    const sourceFiles = await readTsFiles(path.join(__dirname, 'lang'));
    // 处理每个语言
    for (const langItem of langs) {
      if (langItem === 'zh-CN') continue;
      // 处理每个子目录
      for (const [absPath, content] of Object.entries(sourceFiles)) {
        const writePath = path.join(absPath, `${langItem.json}.ts`);
        if (typeof content === 'string') {
          const replaceContent = content
            .replaceAll('zh-CN', langItem.json)
            .replaceAll('zh_CN', langItem.antd)
            .replaceAll('zh-cn', langItem.dayjs)
            .replaceAll('zhCN', langItem.json.replace('-', ''));
          await fs.promises.writeFile(writePath, replaceContent, 'utf8');
        } else {
          try {
            const translatedJSON = await translateJSON(content, langItem.json);
            await writeFileFun(writePath, translatedJSON);
          } catch (error) {
            console.error(`Translation failed for ${absPath}/${langItem.json}:`, error);
          }
        }
      }
    }
  } catch (error) {
    console.error('Generation failed:', error);
  }
}

main();
