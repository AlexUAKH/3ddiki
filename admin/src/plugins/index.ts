import type { App } from "vue";

import router from "../router";

import i18n from "./i18n";
import pinia from "./pinia";
import { options, Vue3Toasity } from "./toastify";
import vuetify from "./vuetify";

export function registerPlugins(app: App) {
  app.use(vuetify);
  app.use(pinia);
  app.use(i18n);
  app.use(router);
  app.use(Vue3Toasity, options);
}
