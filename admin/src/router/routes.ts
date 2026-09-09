import { EAppLayouts } from "@/layouts/layouts.types";
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
      layout: EAppLayouts.auth,
      middleware: [guest],
    },
  },
  // {
  //   path: "/password-reset/:token",
  //   name: ERouteNames.resetPassword,
  //   component: () => import("@/views/auth/ChangePassword.vue"),
  //   meta: {
  //     title: "Reset password",
  //     layout: EAppLayouts.auth,
  //     middleware: [guest]
  //   }
  // },
  {
    path: "/",
    name: ERouteNames.homePage,
    component: () => import("@/pages/index.vue"),
    meta: {
      title: "Home screen",
      layout: EAppLayouts.auth,

      // middleware: [auth],
    },
  },
  // {
  //   path: "/accessError",
  //   name: ERouteNames.accessError,
  //   component: () => import("@/views/AccessError.vue"),
  //   meta: {
  //     title: "Access denied",
  //     middleware: [guest, auth]
  //   }
  // },
  // {
  //   path: "/:pathMatch(.*)*",
  //   name: ERouteNames.notFound,
  //   component: () => import("@/views/PageNotFound.vue"),
  //   meta: {
  //     title: "Page Not Found",
  //     middleware: [auth]
  //   }
  // }
];
