import pages from '../lang/en';
import antd from 'ant-design-vue/es/locale/en_GB';
import dayjs from 'dayjs/locale/en';

// import settingDrawerLocales from '@/components/setting-drawer/locales/en';

// import dashboardAnalysis from '@/views/dashboard/analysis/locales/en';
// import dashboardMonitor from '@/views/dashboard/monitor/locales/en';

// import basicFormLocales from '@/views/form/basic-form/locales/en';
// import stepFormLocales from '@/views/form/step-form/locales/en';
// import advanceFormLocales from '@/views/form/advance-form/locales/en';

const locales = {
  localeName: 'en',
  dayjsLocaleName: 'en',
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
