import { createI18n } from "vue-i18n";
import locales from "../locales/index";

export default createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  locales,
});
