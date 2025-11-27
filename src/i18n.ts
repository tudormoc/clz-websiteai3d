import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { en } from './locales/en';
import { it } from './locales/it';
import { fr } from './locales/fr';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en,
      it,
      fr
    },
    fallbackLng: 'it', // Default to Italian
    debug: false,
    interpolation: {
      escapeValue: false, // React already safes from XSS
    }
  });

export default i18n;