import { acceptHMRUpdate, defineStore } from 'pinia';

export interface MerchantState {
  merchantList?: object[];
  curStoreList: object[];
}

export enum ActionsTypes {
  setCurStoreList = 'setCurStoreList',
  setMerchantList = 'setMerchantList',
}

export const SET_MERCHANT_LIST = 'SET_MERCHANT_LIST';
export const SET_CUR_STORE_LIST = 'SET_CUR_STORE_LIST';

export const initState = (): MerchantState => ({
  merchantList: [],
  curStoreList: [],
});

export const useMerchantStore = defineStore('merchant', {
  persist: true,
  state: initState,
  // getters: {
  //   info: state => state.extra,
  //   currentUser: state => state,
  // },
  actions: {
    [SET_MERCHANT_LIST](list: object[]) {
      this.merchantList = list;
    },
    [SET_CUR_STORE_LIST](list: object[]) {
      this.curStoreList = list;
    },
  },
});

const hot = import.meta.webpackHot || (import.meta as any).hot;
if (hot) {
  hot.accept(acceptHMRUpdate(useMerchantStore as any, hot));
}
