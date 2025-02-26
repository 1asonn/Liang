import type { MenuDataItem } from './typing';
// import type { RouteItem } from '@/api/user/login';
import { getMenuTree } from '@/api/user/login';
import renderComp from '@/views/render/index.vue';
import IconFont from '@/components/icon-font/index.vue';
import { h } from 'vue';

// 根级菜单
const rootRouter: MenuDataItem = {
  name: 'index',
  path: '/',
  meta: {
    title: '首页',
    cache: false,
    hide: true,
  },
  component: () => import('@/layouts/index.vue'),
  children: [],
};

// const defineRouteComponentKeys = Object.keys(defineRouteComponents);

// export const generator = (
//   routeMap: RouteItem[],
//   parentId: string | number,
//   routeItem?: RouteRecordRaw | MenuDataItem,
// ) => {
//   return routeMap
//     .filter(item => item.parentId === parentId)
//     .map(item => {
//       const { title, hideInMenu, hideChildrenInMenu, target, icon, authority } = item.meta || {};
//       const currentRouter: MenuDataItem = {
//         // 如果路由设置了 path，则作为默认 path，否则 路由地址 动态拼接生成如 /dashboard/workplace
//         path: item.path || `${(routeItem && routeItem.path) || ''}/${item.name}`,
//         // 路由名称，建议唯一
//         name: item.name || `${item.id}`,
//         // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
//         meta: {
//           title,
//           icon: icon || undefined,
//           hideInMenu,
//           hideChildrenInMenu,
//           target: target,
//           authority: authority,
//         },
//         // 该路由对应页面的 组件 (动态加载 @/views/ 下面的路径文件)
//         component:
//           item.component && defineRouteComponentKeys.includes(item.component)
//             ? defineRouteComponents[item.component]
//             : () => import(`/src/views/${item.component}.vue`),
//       };

//       // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
//       if (!currentRouter.path.startsWith('http')) {
//         currentRouter.path = currentRouter.path.replace('//', '/');
//       }

//       // 重定向
//       item.redirect && (currentRouter.redirect = item.redirect);

//       // 子菜单，递归处理
//       currentRouter.children = generator(routeMap, item.id, currentRouter);
//       if (currentRouter.children === undefined || currentRouter.children.length <= 0) {
//         delete currentRouter.children;
//       }
//       return currentRouter;
//     })
//     .filter(item => item);
// };

export const generator = (menus, actualRoutes: MenuDataItem[] = []) => {
  const displayRoutes: MenuDataItem[] = [];
  let active = '';
  for (const menu of menus) {
    const route = { ...menu };
    const {
      hide,
      name,
      children,
      path,
      id,
      icon,
      isCache,
      queryButtonAuthCode,
      queryFieldAuthCode,
    } = menu;
    route.name = path === null ? id : `render-${path}`;
    route.path = path === null ? '' : `/${path}`;
    route.meta = {
      hide: hide === 'Y',
      title: name,
      icon: h(IconFont, { type: icon }),
      cache: isCache === 'Y',
      queryButtonAuthCode: queryButtonAuthCode ?? false,
      queryFieldAuthCode: queryFieldAuthCode ?? false,
    };
    if (hide === 'N') {
      active = route.path;
    }
    if (hide === 'Y') {
      route.meta.active = active;
    }
    if (children) {
      const { displayRoutes } = generator(children, actualRoutes);
      route.children = displayRoutes;
    } else {
      // const render = {
      //   name: route.name,
      //   template: `<renderComp></renderComp>`,
      //   components: { renderComp },
      //   mounted() {
      //     // console.log('compName', this.$options)
      //   },
      // };
      // route.component = renderComp
      route.component = renderComp;
      actualRoutes.push(route);
    }
    displayRoutes.push(route);
  }
  return { displayRoutes, actualRoutes };
};

export const generatorDynamicRouter = () => {
  return new Promise<any>((resolve, reject) => {
    getMenuTree()
      .then(({ code, body }) => {
        if (code === '0000000') {
          console.log('menuNav', body);
          // root id = 0;
          const { displayRoutes, actualRoutes } = generator(body);
          // routes.push(notFoundRouter);
          rootRouter.children = rootRouter.children.concat(actualRoutes);
          resolve({ displayRoutes, actualRoutes: rootRouter });
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};
