import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Ar from './Translations/Ar/Ar.json'
import Fr from './Translations/Fr/Fr.json'
import En from './Translations/En/En.json'


const resources = {
    en: {
        translation: En,
    },
    fr: {
        translation: Fr,
    },
    ar: {
        translation: Ar,
    }
};

// i18n.use(initReactI18next).init({
//     resources,
//     lng: 'en', // Default language
//     fallbackLng: 'en', // Fallback language
//     interpolation: {
//         escapeValue: false,
//     },
// });

export default i18n;