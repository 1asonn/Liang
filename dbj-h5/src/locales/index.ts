import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import config from "./config.json"
let resources = {
}


export const loadModules = async () => {
    const modulesFiles = require.context(`./lang`, true, /\.json$/);
    try {
        let list: any = []
        modulesFiles.keys().reduce((modules: any, modulePath: any) => {
            // 获取文件名 './zh.json' => 'zh' ;/^\.\/(\w+)\.json$/
            // const moduleName = modulePath.replace(/(.*\\)*([^.]+).*/ig, "$2")
            const moduleName = modulePath.match(/^\.\/(\w+)\.json$/)[1]
            const value = modulesFiles(modulePath)
            // const value = Object.assign(value,{unit: '硬币'});
            // console.log("🚀 ~ file: index.ts:75 ~ modulesFiles.keys ~ value:", moduleName)
            list.push(moduleName)
            resources[config[moduleName]] = {
                translation: value
            }
        }, {})
        console.log("🚀 ~ file: index.ts:29 ~ loadModules ~ list:", resources)

        return list
    } catch (error) {
        console.log("🚀 ~ file: index.ts:15 ~ loadModules ~ error:", error)
    }

};

loadModules()


i18n
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3', // 对安卓进行兼容
        resources,
        lng: 'zh-CH',
        fallbackLng: 'zh', // 默认语言，也是设置语言时设置了不存在的语言时使用的
        interpolation: {
            escapeValue: false
        }
    }, (err) => {
        // 錯誤
        if (err) throw err;
        // 这里放多一层函数是为了方便之后切换语言的同时做一些其他的统一处理
        i18n.setLocalLanguage = function (value) {
            // 設置項目文本的語言
            this.changeLanguage(value);
            // 做点别的，比如同时切换别的插件的语言
        }
        // 初始化
        i18n.setLocalLanguage(i18n.language);
    });


export default i18n;

