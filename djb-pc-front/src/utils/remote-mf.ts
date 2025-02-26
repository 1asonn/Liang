export const getVersion = () => {
  // window.authSystem 为示例，系统使用的组件库版本号需要找组件库成员确认
  return window.OverseaDjb;
};
/* eslint-disable no-var */
/**
 * @param {*} config
 * url：远程项目地址。
 * scope：远程项目的名字。
 * module：远程项目中的指定模块。
 * @returns
 */
export async function loadRemoteComponent(config: any) {
  return loadScript(config, true).then(() => loadComponentByWebpack(config));
}

export function loadScript(config: any, isRemove?: any) {
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = config.url;
    script.type = 'text/javascript';
    script.async = true;
    script.addEventListener('load', () => {
      isRemove && script.remove();
      resolve();
    });
    script.onerror = () => {
      script.remove();
      reject();
    };
    document.head.append(script);
  });
}

declare global {
  // var __webpack_init_sharing__: any;
  var __webpack_share_scopes__: any;
}

interface Module {
  [key: string]: any;
}

export let Module: Module | undefined = undefined;
async function loadComponentByWebpack({ scope, module }: any) {
  // 初始化共享作用域，这将使用此构建和所有远程提供的已知模块填充它

  // eslint-disable-next-line no-undef
  await __webpack_init_sharing__('default');
  const container = window[scope] as any; // 获取容器

  // 初始化容器，它可以提供共享模块
  // eslint-disable-next-line no-undef
  console.log(__webpack_share_scopes__, scope, window[scope]);
  // eslint-disable-next-line no-undef
  await container.init(__webpack_share_scopes__.default);
  const factory = await container.get(module);
  // 返回远程模块对象
  Module = factory();
  return Module;
}
