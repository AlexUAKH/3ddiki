import { ACCESS_TOKEN_COOKIE } from "@/constants/cookies";
import { accessGuardMiddleware } from "@/middleware/acessMiddleware";
import { layoutMiddleware } from "@/middleware/layoutMiddleware";
import Cookies from "js-cookie";
import { createRouter, createWebHistory } from "vue-router";
import middlewarePipeline from "./middlewarePipeline";
import { routes } from "./routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }
    if (savedPosition) return savedPosition;
    else return { top: 0, behavior: "smooth" };
  },
});

router.beforeEach((to: any, from: any) => {
  if (to.meta) {
    window.document.title = to.meta.title ? to.meta.title : "Home";
  }

  if (!to?.meta?.middleware) {
    return true;
  }

  const middlewares = to.meta.middleware;
  const accessToken = Cookies.get(ACCESS_TOKEN_COOKIE);
  const token = accessToken === "undefined" ? "" : accessToken;

  // middlewares.forEach((middleware: any) => {
  //   middleware({
  //     to,
  //     from,
  //     store: authStore,
  //   });
  // });

  const context = {
    to,
    from,
    token,
  };

  return middlewares[0]({
    ...context,
    next: middlewarePipeline(context, middlewares, 1),
  });
});

router.beforeEach(layoutMiddleware);
router.beforeEach(accessGuardMiddleware);

export default router;
