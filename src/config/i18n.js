import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  fallbackLng: "vn",
  resources: {
    en: {
      translation: {
        welcome: "Welcome to React with EN",
      },
    },
    vn: {
      translation: {
        welcome: "Welcome to React with VN",
      },
    },
  },
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  debug: true,
  lng: localStorage.getItem("i18n"),
});

export default i18n;
