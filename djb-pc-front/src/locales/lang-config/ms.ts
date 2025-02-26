import pages from '../lang/ms';
import antd from 'ant-design-vue/es/locale/ms_MY';
import dayjs from 'dayjs/locale/ms';

// import settingDrawerLocales from '@/components/setting-drawer/locales/ms';

// import dashboardAnalysis from '@/views/dashboard/analysis/locales/ms';
// import dashboardMonitor from '@/views/dashboard/monitor/locales/ms';

// import basicFormLocales from '@/views/form/basic-form/locales/ms';
// import stepFormLocales from '@/views/form/step-form/locales/ms';
// import advanceFormLocales from '@/views/form/advance-form/locales/ms';

const locales = {
  localeName: 'ms',
  dayjsLocaleName: 'ms',
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
