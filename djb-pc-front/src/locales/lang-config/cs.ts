import pages from '../lang/cs';
import antd from 'ant-design-vue/es/locale/cs_CZ';
import dayjs from 'dayjs/locale/cs';

// import settingDrawerLocales from '@/components/setting-drawer/locales/cs';

// import dashboardAnalysis from '@/views/dashboard/analysis/locales/cs';
// import dashboardMonitor from '@/views/dashboard/monitor/locales/cs';

// import basicFormLocales from '@/views/form/basic-form/locales/cs';
// import stepFormLocales from '@/views/form/step-form/locales/cs';
// import advanceFormLocales from '@/views/form/advance-form/locales/cs';

const locales = {
  localeName: 'cs',
  dayjsLocaleName: 'cs',
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
