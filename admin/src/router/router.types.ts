import type { EAppLayouts } from "@/layouts/layouts.types";
import type { VueElement } from "vue";

declare module "vue-router" {
  interface RouteMeta {
    layout?: EAppLayouts;
    layoutComponent?: VueElement;
    title?: string;
    middleware?: Array<any>;
    accessScopes?: string[];
  }
}

export enum ERouteNames {
  //auth
  login = "login",
  accessError = "accessError",
  emailVerifySuccess = "emailVerifySuccess",
  forgotPassword = "forgotPassword",
  resetPassword = "resetPassword",
  //
  homePage = "homePage",
}
