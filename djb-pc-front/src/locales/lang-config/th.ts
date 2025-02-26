import pages from '../lang/th';
import antd from 'ant-design-vue/es/locale/th_TH';
import dayjs from 'dayjs/locale/th';

// import settingDrawerLocales from '@/components/setting-drawer/locales/th';

// import dashboardAnalysis from '@/views/dashboard/analysis/locales/th';
// import dashboardMonitor from '@/views/dashboard/monitor/locales/th';

// import basicFormLocales from '@/views/form/basic-form/locales/th';
// import stepFormLocales from '@/views/form/step-form/locales/th';
// import advanceFormLocales from '@/views/form/advance-form/locales/th';

const locales = {
  localeName: 'th',
  dayjsLocaleName: 'th',
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
