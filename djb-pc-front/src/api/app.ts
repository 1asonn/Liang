import request from '@/utils/request';

export type AuthCodeParams = {
  pageConfigureId: string;
  queryButton: string;
  queryField: string;
};

export async function getPageAuthCode(url: string, params: AuthCodeParams) {
  return request.get<any, any>(url, {
    params,
    headers: {
      'ram-token': sessionStorage.getItem('token'),
      'ram-system': process.env.VUE_APP_SYS_ID,
      'ram-org': sessionStorage.getItem('org'),
      'ram-tenant': sessionStorage.getItem('tenant'),
    },
  });
}

export async function getPageConfig(id: string) {
  return request.get<any, any>(
    `https://page-configure.oss-cn-shenzhen.aliyuncs.com/page-configure/${
      process.env.VUE_APP_PAGE_CONFIG_ENV
    }/${id}.json?t=${Date.now()}`,
  );
}
export async function getHttpConfig(id: string) {
  return request.get<any, any>(
    `https://page-configure.oss-cn-shenzhen.aliyuncs.com/page-configure/${
      process.env.VUE_APP_HTTP_CONFIG_ENV
    }/${id}.json?t=${Date.now()}`,
  );
}
export async function getJsObject(id: string) {
  return request.get<any, any>(
    `https://page-configure.oss-cn-shenzhen.aliyuncs.com/page-configure/${process.env.VUE_APP_PAGE_CONFIG_ENV}/component/${id}.json`,
  );
}
