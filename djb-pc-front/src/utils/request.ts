import type { AxiosRequestConfig, AxiosError } from 'axios';
import axios, { AxiosResponse } from 'axios';
import { localStorage } from '@/utils/local-storage';
import { notification, Modal } from 'ant-design-vue';
import { STORAGE_TOKEN_KEY } from '@/store/app';
// import { loginRoutePath } from '@/router/define-meta';
import router from '@/router';

// 这里是用于设定请求后端时，所用的 Token KEY
// 可以根据自己的需要修改，常见的如 Access-Token，Authorization
// 需要注意的是，请尽量保证使用中横线`-` 来作为分隔符，
// 避免被 nginx 等负载均衡器丢弃了自定义的请求头
export const REQUEST_TOKEN_KEY = 'Access-Token';

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: '',
  timeout: 6000, // 请求超时时间
});
export type RequestError = AxiosError<{
  message?: string;
  result?: any;
  errorMessage?: string;
}>;
// 异常拦截处理器
const errorHandler = (error: RequestError): Promise<any> => {
  if (error.response) {
    const { data = {}, status, statusText } = error.response;
    // 403 无权限
    if (status === 403) {
      notification.error({
        message: 'Forbidden',
        description: (data && data.message) || statusText,
      });
    }
    // 401 未登录/未授权
    if (status === 401) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed',
      });
      router.replace({
        name: 'login',
        query: {
          ...router.currentRoute.value.query,
          routerName: router.currentRoute.value.name as string,
        },
      });
      // 如果你需要直接跳转登录页面
      // location.replace(
      //   `${process.env.VUE_APP_PUBLIC_PATH} + ${loginRoutePath}`.replaceAll('//', '/'),
      // );
    }
  }
  return Promise.reject(error);
};

// 请求拦截器
const requestHandler = (
  config: AxiosRequestConfig,
): AxiosRequestConfig | Promise<AxiosRequestConfig> => {
  const savedToken = localStorage.get(STORAGE_TOKEN_KEY);
  // 如果 token 存在
  // 让每个请求携带自定义 token, 请根据实际情况修改
  if (savedToken) {
    config.headers[REQUEST_TOKEN_KEY] = savedToken;
  }
  return config;
};

// Add a request interceptor
request.interceptors.request.use(requestHandler, errorHandler);

// 响应拦截器
const responseHandler = (response: AxiosResponse<any>) => {
  const res = response.data;
  const { result, code, message } = res;
  // 如果是bolb返回值类型的 直接把整个响应数据返回
  if (
    ['blob'].includes(response.request.responseType) &&
    (typeof code === 'undefined' || typeof result === 'undefined')
  ) {
    return response;
  }
  // 如果请求的是 json 文件
  const url = response.config.url as string;
  const reg = /\.json/;
  if (reg.test(url)) {
    return res;
  }
  if ([200, 203, 204, '0000000'].includes(code) || [200, 203, 204, 0].includes(result)) {
    return res;
  } else if (code === 403 || result === 403) {
    notification.error({
      message: '权限不足',
      description: '你想干什么坏事哈',
    });
    return res;
  } else if (code === 401 || result === 401) {
    Modal.confirm({
      title: '登陆失效',
      content: '登陆已经失效，您可以取消停留在此页面，或重新登录!',
      onOk: () => {
        sessionStorage.setItem('token', '');
        router.replace({
          name: 'login',
          query: {
            ...router.currentRoute.value.query,
            routerName: router.currentRoute.value.name as string,
          },
        });
      },
    });
    return Promise.reject(new Error(message || 'Error'));
  }
  // else {
  //   notification.error({
  //     message: '请求失败',
  //     description: message || code || description,
  //   });
  // }
  return res;
  // return response.data;
};

request.interceptors.response.use(responseHandler, errorHandler);

export { AxiosResponse };

export default request;
