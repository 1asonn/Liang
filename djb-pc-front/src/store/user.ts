import { acceptHMRUpdate, defineStore } from 'pinia';
import type {
  AccountInfo,
  TenantInfo,
  AccountInfoRes,
  LoginRes,
  LogoutRes,
  LoginParams,
  Region,
  RegionRes,
} from '@/api/user/login';
import {
  logout,
  getUserInfo,
  getTenantInfo,
  login,
  getRegion,
  getTimezoneCurrency,
} from '@/api/user/login';
import type { RouteRecordRaw } from 'vue-router';
import { default as router } from '@/router';
import { generatorDynamicRouter } from '@/router/generator-routers';

export interface UserState {
  accountInfo: AccountInfo;
  tenantInfo: TenantInfo;
  merchantList: object[];
  allowRouters: RouteRecordRaw[];
  region: Region;
}
interface TenantInfoRes {
  code: string;
  body: TenantInfo;
  [key: string]: any;
}
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const GET_INFO = 'GET_INFO';
export const GET_TENANT_INFO = 'GET_TENANT_INFO';
export const GET_MENUS = 'GET_MENUS';
export const GENERATE_ROUTES = 'GENERATE_ROUTES';
export const GENERATE_ROUTES_DYNAMIC = 'GENERATE_ROUTES_DYNAMIC';
export const GET_TIMEZONE_CURRENCY = 'GET_TIMEZONE_CURRENCY';
export const GET_REGION = 'GET_REGION';

export const SET_AVATAR = 'SET_AVATAR';
export const SET_ROLE = 'SET_ROLE';
export const SET_ACCOUNT_INFO = 'SET_ACCOUNT_INFO';
export const SET_TENANT_INFO = 'SET_TENANT_INFO';
export const SET_ROUTERS = 'SET_ROUTERS';
export const RESET_CURRENT_USER = 'RESET_CURRENT_USER';
export const SET_REGION = 'SET_REGION';

export const initState = (): UserState => ({
  accountInfo: {
    authAccountId: '',
    name: '',
    password: '',
    telephone: '',
    email: null,
    wxUnionid: null,
    wxWorkId: '',
    isActive: 'Y',
    created: '',
    updated: '',
    createdby: '',
    updatedby: '',
  },
  tenantInfo: {},
  merchantList: [],
  allowRouters: [],
  // 地区信息
  region: {},
});

export const useUserStore = defineStore('user', {
  persist: true,
  state: initState,
  getters: {
    merchantList: state => state.merchantList,
  },
  actions: {
    [SET_ACCOUNT_INFO](accountInfo: AccountInfo) {
      this.accountInfo = accountInfo;
    },
    [SET_TENANT_INFO](tenantInfo: TenantInfo) {
      this.tenantInfo = tenantInfo;
    },
    [SET_ROUTERS](allowRoutes: UserState['allowRouters']) {
      this.allowRouters = allowRoutes;
    },
    [RESET_CURRENT_USER]() {
      this.$reset();
    },
    [SET_REGION](region: Region) {
      this.region = region;
    },
    async [GET_INFO](): Promise<AccountInfoRes> {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then(res => {
            const { body, code } = res;
            if (code === '0000000') {
              this.SET_ACCOUNT_INFO(body);
            }
            resolve(res);
            console.log('res-userInfo', res);
          })
          .catch(err => {
            // 获取登录用户信息后，直接清理掉当前 token 并强制让流程走到登录页
            reject(err);
          });
      });
    },
    async [GET_TENANT_INFO](): Promise<TenantInfoRes> {
      return new Promise((resolve, reject) => {
        getTenantInfo()
          .then(async (res: TenantInfoRes) => {
            const { code, body } = res;
            if (code === '0000000') {
              this.SET_TENANT_INFO(body);
            }
            resolve(res);
          })
          .catch(err => {
            // 获取登录用户信息后，直接清理掉当前 token 并强制让流程走到登录页
            reject(err);
          });
      });
    },

    // 从后端获取路由表结构体，并构建前端路由
    async [GENERATE_ROUTES_DYNAMIC]() {
      return new Promise(resolve => {
        generatorDynamicRouter()
          .then(({ displayRoutes, actualRoutes }) => {
            // 添加到路由表
            router.addRoute(actualRoutes as RouteRecordRaw);
            this.SET_ROUTERS(displayRoutes);
            resolve(displayRoutes);
          })
          .catch(err => {
            console.error('generatorDynamicRouter', err);
          });
      });
    },
    // 获取时区和货币信息
    async [GET_TIMEZONE_CURRENCY]() {
      return new Promise(resolve => {
        getTimezoneCurrency()
          .then(res => {
            const {
              body: { timezone, currencyCode, currencySymbol },
            } = res;
            sessionStorage.setItem('timezone', timezone);
            sessionStorage.setItem('currencyCode', currencyCode);
            sessionStorage.setItem('currencySymbol', currencySymbol);
            resolve(res);
          })
          .catch(err => {
            console.error('getTimezoneCurrency', err);
          });
      });
    },
    async [LOGOUT]() {
      return new Promise<LogoutRes>(resolve => {
        logout().then(res => {
          resolve(res);
        });
      });
    },
    async [LOGIN](info: LoginParams): Promise<LoginRes> {
      return new Promise((resolve, reject) => {
        login(info)
          .then((res: LoginRes) => {
            const {
              body: { token },
            } = res;
            sessionStorage.setItem('needRefreshInfo', 'true');
            sessionStorage.setItem('token', token);
            resolve(res);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    async [GET_REGION](): Promise<Region> {
      return new Promise((resolve, reject) => {
        getRegion()
          .then((res: RegionRes) => {
            const { code, body } = res;
            if (code === '0000000') {
              this.SET_REGION(body);
            }
            resolve(body);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
  },
});

const hot = import.meta.webpackHot || (import.meta as any).hot;
if (hot) {
  hot.accept(acceptHMRUpdate(useUserStore as any, hot));
}
