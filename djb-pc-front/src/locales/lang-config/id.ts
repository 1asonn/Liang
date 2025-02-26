import pages from '../lang/id';
import antd from 'ant-design-vue/es/locale/id_ID';
import dayjs from 'dayjs/locale/id';

// import settingDrawerLocales from '@/components/setting-drawer/locales/id';

// import dashboardAnalysis from '@/views/dashboard/analysis/locales/id';
// import dashboardMonitor from '@/views/dashboard/monitor/locales/id';

// import basicFormLocales from '@/views/form/basic-form/locales/id';
// import stepFormLocales from '@/views/form/step-form/locales/id';
// import advanceFormLocales from '@/views/form/advance-form/locales/id';

const locales = {
  localeName: 'id',
  dayjsLocaleName: 'id',
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
