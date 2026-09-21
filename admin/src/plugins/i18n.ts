import { createI18n } from "vue-i18n";
import locales from "../locales/index";

export default createI18n({
  legacy: false,
  locale: localStorage.getItem("language_code") || "en",
  fallbackLocale: "en",
  messages: locales,
});
