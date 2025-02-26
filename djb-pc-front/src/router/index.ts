import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';
import type { MenuDataItem } from './typing';
import UserLayout2 from '@/layouts/user-layout2.vue';

export const staticRoutes: MenuDataItem[] = [
  {
    path: '/user',
    name: 'user',
    meta: { hideInMenu: true, title: 'pages.layouts.userLayout.title' },
    component: UserLayout2,
    children: [
      {
        path: '/login',
        name: 'login',
        meta: { title: 'pages.login.accountLogin.tab' },
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/login.vue'),
      },
    ],
  },
  {
    path: '/select-merchant',
    name: 'selectMerchant',
    meta: { title: '选择租户' },
    component: () =>
      import(/* webpackChunkName: "merchant" */ '@/views/user/selectMerchant/index.vue'),
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import(/* webpackChunkName: "exception" */ '@/views/exception/404.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.VUE_APP_PUBLIC_PATH),
  routes: staticRoutes as RouteRecordRaw[],
  scrollBehavior: (to, from) => {
    if (to.path !== from.path) {
      setTimeout(() => {
        document.getElementById('app').scrollTop = 0;
      });
    }
    return { top: 0 };
  },
});

export default router;
