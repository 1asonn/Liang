export const tagTextMap = [
  {
    origin: 1,
    result: '部门',
  },
  {
    origin: 2,
    result: '区域',
  },
  {
    origin: 3,
    result: '总店',
  },
  {
    origin: 4,
    result: '门店',
  },
];

export const storeFieldNames = {
  name: 'name',
  id: 'authOrgId',
};

export const tagConfig = {
  reference: 3,
  field: 'type',
  pipes: [
    {
      pipe: 'textmap',
      option: {
        textMap: tagTextMap,
      },
    },
  ],
};

export default {
  fetch: {
    baseURL: '/gw/ram-service',
    url: '/permission/account/tenants',
    method: 'get',
    headerPayloads: [
      {
        key: 'ram-token',
        value: 'sessionStorage.token',
      },
      {
        key: 'ram-system',
        value: process.env.VUE_APP_SYS_ID,
      },
    ],
    customOption: {
      jsonPath: 'body',
      loading: true,
      codeKey: 'code',
      codeValue: '0000000',
    },
  },
  merchantList: [],
  mainTitle: '选择租户',
  childTitle: '选择门店',
  fieldNames: {
    children: 'tenantOrgList',
  },
  forbid: {
    exp: 'state === 2',
  },
  config: {
    titleField: 'name',
    items: [
      {
        label: '门店数量',
        field: 'tenantOrgListSize',
      },
    ],
  },
  childConfig: {
    tag: tagConfig,
    titleField: 'name',
  },
};
