import pages from '../lang/ja';
import antd from 'ant-design-vue/es/locale/ja_JP';
import dayjs from 'dayjs/locale/ja';

// import settingDrawerLocales from '@/components/setting-drawer/locales/ja';

// import dashboardAnalysis from '@/views/dashboard/analysis/locales/ja';
// import dashboardMonitor from '@/views/dashboard/monitor/locales/ja';

// import basicFormLocales from '@/views/form/basic-form/locales/ja';
// import stepFormLocales from '@/views/form/step-form/locales/ja';
// import advanceFormLocales from '@/views/form/advance-form/locales/ja';

const locales = {
  localeName: 'ja',
  dayjsLocaleName: 'ja',
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
