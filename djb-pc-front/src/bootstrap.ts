import 'ant-design-vue/dist/reset.css';
import '@surely-vue/table/dist/index.less';
import 'uno.css';
// import STable from '@surely-vue/table';
import Antd from 'ant-design-vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import router from './router';
import i18n from './locales';
import App from './App.vue';

import { ProProvider, PageContainer, TransformVnode } from '@/components';
// import { useIcons } from '@/icons';
import Authority from './utils/authority/authority.vue';
import './app.less';
import './router/router-guards';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { store } from '@/vuex';

import 'xe-utils';
import VXETable from 'vxe-table';
// import * as Sentry from '@sentry/vue';
import * as Icons from '@ant-design/icons-vue';
import VXETablePluginAntd from 'vxe-table-plugin-antd';
import 'vxe-table-plugin-antd/dist/style.css';
import 'vxe-table/lib/style.css';
import { loadRemoteComponent, loadScript, getVersion } from './utils/remote-mf';
import { getHttpConfig } from '@/api/app';
dayjs.extend(relativeTime);

VXETable.use(VXETablePluginAntd);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

loadScript({
  url: process.env.VUE_APP_REMOTE_ENTRY,
}).then(() => {
  const url = `${process.env.VUE_APP_REMOTE_URL}/${getVersion()}/web/lyyRemoteEntry.js`;

  // const url = 'http://localhost:9001/lyyRemoteEntry.js';

  loadRemoteComponent({
    url,
    scope: 'leyaoyaoPcRender',
    module: './pcrender',
  }).then(async Module => {
    const app = createApp(App);
    app.config.warnHandler = () => null;
    const { store: compStore, configManager } = Module ?? {};
    configManager?.setConfig({
      isSpecialStyle: true,
    });
    app.config.globalProperties.store = compStore;
    try {
      const httpConfig = await getHttpConfig(process.env.VUE_APP_SYS_ID);
      window.__httpConfig__.setHttpConfig(httpConfig);
    } catch {
      console.log('请求出错');
    }
    // Sentry.init({
    //   app,
    //   dsn: 'https://a716e6eec5ce41a3842865b8e1668369@lyysentry-pro.leyaoyao.com/72',
    //   environment: process.env.VUE_APP_PAGE_CONFIG_ENV,
    //   maxBreadcrumbs: 20,
    //   ignoreErrors: ['warning'],
    //   // Set tracesSampleRate to 1.0 to capture 100%
    //   // of transactions for performance monitoring.
    //   // We recommend adjusting this value in production
    //   tracesSampleRate: 1,
    // });
    // window.Sentry = Sentry;
    app.use(pinia);
    app.use(store);
    app.use(Module?.default);
    app.use(VXETable);
    app
      .use(router)
      .use(i18n)
      .use(Antd)
      .use(ProProvider)
      .component(PageContainer.name, PageContainer)
      .component(TransformVnode.name, TransformVnode)
      .component(Authority.name, Authority);

    // useIcons(app);

    app.mount('#app');
    app.use({
      install() {
        for (const i in Icons) {
          app.component(i, Icons[i]);
        }
      },
    });
    app.use(Antd);

    // const LyyVuex = sessionStorage.getItem('lyy-vuex');
    // if (LyyVuex) {
    //   const accountInfo = JSON.parse(LyyVuex)?.user?.accountInfo;
    //   Sentry.configureScope(scope => {
    //     scope.setTag('accountName', accountInfo.name);
    //   });
    // }
  });
});
