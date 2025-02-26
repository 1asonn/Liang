import pages from '../lang/vi';
import antd from 'ant-design-vue/es/locale/vi_VN';
import dayjs from 'dayjs/locale/vi';

// import settingDrawerLocales from '@/components/setting-drawer/locales/vi';

// import dashboardAnalysis from '@/views/dashboard/analysis/locales/vi';
// import dashboardMonitor from '@/views/dashboard/monitor/locales/vi';

// import basicFormLocales from '@/views/form/basic-form/locales/vi';
// import stepFormLocales from '@/views/form/step-form/locales/vi';
// import advanceFormLocales from '@/views/form/advance-form/locales/vi';

const locales = {
  localeName: 'vi',
  dayjsLocaleName: 'vi',
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
