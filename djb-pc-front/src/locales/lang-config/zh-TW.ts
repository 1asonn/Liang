import pages from '../lang/zh-TW';
import antd from 'ant-design-vue/es/locale/zh_TW';
import dayjs from 'dayjs/locale/zh-tw';

// import settingDrawerLocales from '@/components/setting-drawer/locales/zh-TW';

// import dashboardAnalysis from '@/views/dashboard/analysis/locales/zh-TW';
// import dashboardMonitor from '@/views/dashboard/monitor/locales/zh-TW';

// import basicFormLocales from '@/views/form/basic-form/locales/zh-TW';
// import stepFormLocales from '@/views/form/step-form/locales/zh-TW';
// import advanceFormLocales from '@/views/form/advance-form/locales/zh-TW';

const locales = {
  localeName: 'zhTW',
  dayjsLocaleName: 'zh-tw',
  antd,
  dayjs,
  ...pages,

  // ...dashboardAnalysis,
  // ...dashboardMonitor,

  // ...basicFormLocales,
  // ...stepFormLocales,
  // ...advanceFormLocales,
};

export default {
  ...locales,
};
