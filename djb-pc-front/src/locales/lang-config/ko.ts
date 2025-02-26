import pages from '../lang/ko';
import antd from 'ant-design-vue/es/locale/ko_KR';
import dayjs from 'dayjs/locale/ko';

// import settingDrawerLocales from '@/components/setting-drawer/locales/ko';

// import dashboardAnalysis from '@/views/dashboard/analysis/locales/ko';
// import dashboardMonitor from '@/views/dashboard/monitor/locales/ko';

// import basicFormLocales from '@/views/form/basic-form/locales/ko';
// import stepFormLocales from '@/views/form/step-form/locales/ko';
// import advanceFormLocales from '@/views/form/advance-form/locales/ko';

const locales = {
  localeName: 'ko',
  dayjsLocaleName: 'ko',
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
