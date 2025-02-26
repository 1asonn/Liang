/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable no-var */
/**
 *  此文件注册全局组件类型定义
 */
import type { AnchorHTMLAttributes as InnerAnchorHTMLAttributes } from 'vue';
declare module 'vue' {
  export interface GlobalComponents {
    RouterView: (typeof import('vue-router'))['RouterView'];
    RouterLink: (typeof import('vue-router'))['RouterLink'];
    Component: import('vue').Component<{
      is: any;
    }>;
    STable: (typeof import('@surely-vue/table'))['STable'];
    STableColumn: (typeof import('@surely-vue/table'))['STableColumn'];
    STableColumnGroup: (typeof import('@surely-vue/table'))['STableColumnGroup'];
    STableSummary: (typeof import('@surely-vue/table'))['STableSummary'];
    STableSummaryCell: (typeof import('@surely-vue/table'))['STableSummaryCell'];
    STableSummaryRow: (typeof import('@surely-vue/table'))['STableSummaryRow'];
  }
  export interface ComponentCustomProperties {
    document?: Document;
  }
  interface AnchorHTMLAttributes extends InnerAnchorHTMLAttributes {
    disabled?: boolean;
  }
}

declare global {
  var __httpConfig__: any;
  var OverseaDjb: any;
  var Sentry: any;
}

export {};
