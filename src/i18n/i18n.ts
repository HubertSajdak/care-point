import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import Backend from "i18next-http-backend"
import { initReactI18next } from "react-i18next"

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(Backend)
  .use(LanguageDetector)
  .init({
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    fallbackLng: "en",
    detection: {
      order: ["localStorage", "cookie", "htmlTag", "navigator", "path"],
      caches: ["localStorage", "cookie"],
    },
    ns: [
      "buttons",
      "form",
      "authPages",
      "sidebar",
      "common",
      "table",
      "appointment",
      "clinic",
      "specializations",
    ],
  })

export default i18n
