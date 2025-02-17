import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: 'Welcome to my app!',
      login: 'Login',
    },
  },
  fr: {
    translation: {
      welcome: 'Bienvenue sur mon application !',
      login: 'Connexion',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
