import fs from 'fs';
import { readdir, readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取目录下所有 ts 文件
async function readTsFiles(dirPath, tsFiles = {}) {
  const files = await readdir(dirPath);
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    if (file === 'zh-CN.ts') {
      // 读取并解析 ts 文件
      const content = await readFile(filePath, 'utf-8');
      tsFiles[path.dirname(filePath)] = content;
    }
  }
  return tsFiles;
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
    const sourceFiles = await readTsFiles(path.join(__dirname, 'lang-config'));
    // 处理每个语言
    for (const langItem of langs) {
      if (langItem === 'zh-CN') continue;

      // 处理每个子目录
      for (const [absPath, content] of Object.entries(sourceFiles)) {
        const writePath = path.join(absPath, `${langItem.json}.ts`);
        const replaceContent = content
          .replaceAll('zh-CN', langItem.json)
          .replaceAll('zh_CN', langItem.antd)
          .replaceAll('zh-cn', langItem.dayjs)
          .replaceAll('zhCN', langItem.json.replace('-', ''));
        await fs.promises.writeFile(writePath, replaceContent, 'utf8');
        console.log(`Created ${writePath} successfully`);
      }
    }
  } catch (error) {
    console.error('Generation failed:', error);
  }
}

main();
