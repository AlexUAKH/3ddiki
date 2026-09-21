import { EAppLayouts } from "@/layouts/layouts.types";
import auth from "@/middleware/authMiddleware";
import guest from "@/middleware/guestMiddleware";
import type { RouteRecordRaw } from "vue-router";
import { ERouteNames } from "./router.types";

export const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: ERouteNames.login,
    component: () => import("@/pages/auth/Login.vue"),
    meta: {
      title: "Login",
      layout: EAppLayouts.auth,
      middleware: [guest],
    },
  },
  // {
  //   path: "/email/verify/:success",
  //   name: ERouteNames.emailVerifySuccess,
  //   component: () => import("@/views/auth/EmailVerifySuccess.vue"),
  //   meta: {
  //     title: "Email verified",
  //     layout: EAppLayouts.auth,
  //     middleware: [guest]
  //   }
  // },
  {
    path: "/forgot-password",
    name: ERouteNames.forgotPassword,
    component: () => import("@/pages/auth/ForgotPassword.vue"),
    meta: {
      title: "Forgot password",
      layout: EAppLayouts.default,
      middleware: [guest],
    },
  },
  // {
  //   path: "/radobot",
  //   name: ERouteNames.radobot,
  //   component: () => import("@/pages/radobot/index.vue"),
  //   meta: {
  //     title: "Radobot image extractor",
  //     layout: EAppLayouts.default,
  //     middleware: [guest],
  //   },
  // },
  {
    path: "/user-profile",
    name: ERouteNames.userProfile,
    component: () => import("@/pages/auth/userProfile.vue"),
    meta: {
      title: "User Profile",
      layout: EAppLayouts.default,
      middleware: [auth],
    },
  },
  {
    path: "/customers",
    name: ERouteNames.customers,
    component: () => import("@/pages/customers/index.vue"),
    meta: {
      title: "Customers",
      layout: EAppLayouts.default,
      middleware: [auth],
    },
  },
  {
    path: "/filaments",
    name: ERouteNames.filaments,
    component: () => import("@/pages/filaments/index.vue"),
    meta: {
      title: "Filaments",
      layout: EAppLayouts.default,
      middleware: [auth],
    },
  },
  {
    path: "/products",
    name: ERouteNames.products,
    component: () => import("@/pages/products/index.vue"),
    meta: {
      title: "Products",
      layout: EAppLayouts.default,
      middleware: [auth],
    },
  },
  // settings
  {
    path: "/filament-brands",
    name: ERouteNames.filamentBrands,
    component: () => import("@/pages/settings/FilamentBrands.vue"),
    meta: {
      title: "Filament Brands",
      layout: EAppLayouts.default,
      middleware: [auth],
    },
  },
  {
    path: "/filament-colors",
    name: ERouteNames.filamentColors,
    component: () => import("@/pages/settings/FilamentColors.vue"),
    meta: {
      title: "Filament Colors",
      layout: EAppLayouts.default,
      middleware: [auth],
    },
  },
  {
    path: "/filament-types",
    name: ERouteNames.filamentTypes,
    component: () => import("@/pages/settings/FilamentTypes.vue"),
    meta: {
      title: "Filament Types",
      layout: EAppLayouts.default,
      middleware: [auth],
    },
  },
  {
    path: "/product-categories",
    name: ERouteNames.productCategories,
    component: () => import("@/pages/settings/ProductCategories.vue"),
    meta: {
      title: "Filament Categories",
      layout: EAppLayouts.default,
      middleware: [auth],
    },
  },
  // home
  {
    path: "/",
    name: ERouteNames.homePage,
    component: () => import("@/pages/index.vue"),
    meta: {
      title: "Home screen",
      layout: EAppLayouts.default,
      middleware: [auth],
    },
  },
  {
    path: "/accessError",
    name: ERouteNames.accessError,
    component: () => import("@/pages/AccessError.vue"),
    meta: {
      title: "Access denied",
      // middleware: [auth],
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: ERouteNames.notFound,
    component: () => import("@/pages/PageNotFound.vue"),
    meta: {
      title: "Page Not Found",
      // middleware: [auth]
    },
  },
];
