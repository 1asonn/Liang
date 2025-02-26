import request from '@/utils/request';

export type LoginType = 'account' | 'telephone';
export type LoginStatus = 'ok' | 'error';

export interface LoginParams {
  type: LoginType;
  username: string;
  password: string;
}
export interface LoginRes {
  code: string;
  body: {
    token: string;
    [key: string]: any;
  };
  [key: string]: any;
}
export interface LoginResp {
  type: LoginType;
  success: boolean;
  token: string;
  // currentAuthority: string;
}

export interface DataType<T> {
  data: T;
  body: T;
  code?: number | string;
  message?: string;
  result?: number;
  description?: string;
  resultCode: number;
}
export enum Action {
  ADD = 'add',
  DELETE = 'delete',
  UPDATE = 'update',
  QUERY = 'query',
  IMPORT = 'import',
  EXPORT = 'export',
}

export interface Permission {
  /* 权限ID */
  id: string | number;
  /* 权限归属的角色 */
  roleId?: string | number;
  /* 权限名称 */
  name: string;
  /* 权限显示的名字 */
  label?: string;
  /* 权限拥有的操作 [增,删,改,查] */
  actions?: Action[];
}

export interface Role {
  /* 角色ID */
  id: string | number;
  /* 角色名称 */
  name: string;
  /* 角色描述 */
  describe: string;
  /* 角色绑定的权限 */
  permissions?: Permission[];
}

// export interface UserInfo {
//   id: string | number;
//   address: string;
//   avatar: string;
//   country: string;
//   email: string;
//   group: string;
//   name: string;
//   phone: string;
//   signature: string;
//   role: Role;
//   unreadCount?: number;
//   totalCount?: number;
// }
export type UserInfo = {
  // 姓名
  name?: string;
  // 密码
  telephone?: string;
  // 邮件
  email?: string | null;
  [key: string]: any;
};
export interface CaptchaResp {
  captcha: number;
}

export interface SmsCaptchaRequest {
  mobile: string;
}

// 后端的结构体定义
export type RouteItem = {
  id: number | string;
  parentId: number | string;
  name: string;
  path: string;
  redirect: string;
  component: string;
  meta: {
    title: string | false;
    icon?: string;
    target?: '_blank' | '_self';
    hideInMenu?: boolean;
    hideChildrenInMenu?: boolean;
    hideInBreadcrumb?: boolean;
    authority?: string | string[];
    [key: string]: any;
  };
};

export interface GetLoginUrlType {
  ssoLogin: boolean;
  ssoLoginUrl: string;
}

export interface LoginDataType {
  ticket: string;
}

export type AccountInfo = {
  // 账号id
  authAccountId: string;
  // 姓名
  name: string;
  // 密码
  password: string;
  // 联系电话
  telephone: string;
  // 邮件
  email: string | null;
  // 微信unionid
  wxUnionid: string | null;
  // 企业微信id
  wxWorkId: string | null;
  // 是否激活
  isActive?: 'Y' | 'N';
  // 创建时间
  created: string;
  // 更新时间
  updated: string;
  // 由谁创建
  createdby: string;
  // 由谁更新
  updatedby: string;
};

export type TenantInfo = {
  [key: string]: any;
};
export interface RegionRes {
  code: string;
  body: Region;
  [key: string]: any;
}
export type Region = {
  [key: string]: any;
};
export const SSO = '/gw/erp/sso';

export async function postAccountLogin(params: LoginParams) {
  return request.post<LoginParams, LoginResp>('/login/account', params);
}

export async function getCurrentUser() {
  return request.get<any, UserInfo>('/currentUser');
}

export async function getCurrentUserNav() {
  return request.get<any, RouteItem[]>('/currentUserNav');
}

export async function postLogout() {
  return request.post<any, any>('/logout');
}

export async function getSmsCaptcha(params: SmsCaptchaRequest) {
  return request.get<SmsCaptchaRequest, CaptchaResp>('/message/captcha/sms', {
    params,
  });
}

/**
 * @returns 单点登录
 */
export function getLoginUrlApi() {
  return request.get<any, GetLoginUrlType>(`${SSO}/getLoginUrl`) as any;
}

export function loginApi(params: LoginDataType) {
  return request.get<any, any>(`${SSO}/doLoginByTicket`, {
    params,
  }) as any;
}

export interface LogoutRes {
  code: string;
  body: any;
}
export const logout = () => {
  return request.post<any, LogoutRes>(
    '/gw/ram-service/permission/account/logout',
    {
      authSystemId: process.env.VUE_APP_SYS_ID,
      clientType: 'pc', // 客户端类型：pc、 mini. h5. app
      token: sessionStorage.getItem('token'),
    },
    {
      headers: {
        'ram-token': sessionStorage.getItem('token'),
        'ram-system': process.env.VUE_APP_SYS_ID,
      },
    },
  );
};

/**
 * 获取用户信息
 */

export interface AccountInfoRes {
  code: string;
  body: AccountInfo;
  [key: string]: any;
}
export const getUserInfo = () => {
  return request.get<any, AccountInfoRes>('/gw/ram-service/permission/account/info', {
    headers: {
      'ram-token': sessionStorage.getItem('token'),
      'ram-system': process.env.VUE_APP_SYS_ID,
    },
    params: {
      token: sessionStorage.getItem('token'),
    },
  });
};

/**
 * 获取租户信息
 */

export const getTenantInfo = () => {
  return request.get<any, TenantInfo>('/gw/merchant/info/account', {
    headers: {
      'ram-token': sessionStorage.getItem('token'),
      'ram-system': process.env.VUE_APP_SYS_ID,
      'ram-tenant': sessionStorage.getItem('tenant'),
    },
  });
};

interface MenuTreeRes {
  code: string;
  body: object[];
}
export const getMenuTree = () => {
  const org = JSON.parse(sessionStorage.getItem('orgInfo') as string) || ({} as any);
  const attrLabel = org.type === 3 ? 'headQuarters' : 'store';
  return request.get<any, MenuTreeRes>(
    `/gw/ram-service/permission/menu/tree?authSystemId=${process.env.VUE_APP_SYS_ID}&attrLabel=${attrLabel}`,
    {
      headers: {
        'ram-token': sessionStorage.getItem('token'),
        'ram-system': process.env.VUE_APP_SYS_ID,
        'ram-tenant': sessionStorage.getItem('tenant'),
        'ram-org': sessionStorage.getItem('org'),
      },
    },
  );
};

export async function login(data: any) {
  return request.post<any, LoginRes>('/gw/ram-service/sso/login', data, {
    headers: {
      'ram-token': sessionStorage.getItem('token') || '',
      'ram-system': process.env.VUE_APP_SYS_ID,
      'ram-tenant': sessionStorage.getItem('tenant') || '',
    },
  });
}
export async function getRegion() {
  return request.get<any, Region>('/gw/merchant/info/region', {
    headers: {
      'ram-token': sessionStorage.getItem('token'),
      'ram-system': process.env.VUE_APP_SYS_ID,
      'ram-tenant': sessionStorage.getItem('tenant'),
    },
    params: {
      token: sessionStorage.getItem('token'),
    },
  });
}
export async function getTimezoneCurrency() {
  return request.get<any, RegionRes>('/gw/entertainment/pc/merchant/account/info', {
    headers: {
      'ram-token': sessionStorage.getItem('token'),
      'ram-system': process.env.VUE_APP_SYS_ID,
      'ram-tenant': sessionStorage.getItem('tenant'),
      'ram-org': sessionStorage.getItem('org'),
    },
  });
}
