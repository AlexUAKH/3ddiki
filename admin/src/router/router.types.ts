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
  userProfile = "userProfile",
  verifyEmail = "verifyEmail",
  //
  homePage = "homePage",
  customers = "customers",
  filaments = "filaments",
  products = "products",
  productsCreate = "productsCreate",
  productsEdit = "productsEdit",
  orders = "orders",
  ordersCreate = "ordersCreate",
  ordersEdit = "ordersEdit",
  // settings
  filamentBrands = "filamentBrands",
  filamentColors = "filamentColors",
  filamentTypes = "filamentTypes",
  productCategories = "productCategories",
  // radobot image extractor
  radobot = "radobot",
  // 404
  notFound = "notFound",
}
