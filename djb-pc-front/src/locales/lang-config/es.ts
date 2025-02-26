import pages from '../lang/es';
import antd from 'ant-design-vue/es/locale/es_ES';
import dayjs from 'dayjs/locale/es';

// import settingDrawerLocales from '@/components/setting-drawer/locales/es';

// import dashboardAnalysis from '@/views/dashboard/analysis/locales/es';
// import dashboardMonitor from '@/views/dashboard/monitor/locales/es';

// import basicFormLocales from '@/views/form/basic-form/locales/es';
// import stepFormLocales from '@/views/form/step-form/locales/es';
// import advanceFormLocales from '@/views/form/advance-form/locales/es';

const locales = {
  localeName: 'es',
  dayjsLocaleName: 'es',
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
