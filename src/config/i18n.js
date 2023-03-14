import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
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
  lng: "vn",
});

export default i18n;
