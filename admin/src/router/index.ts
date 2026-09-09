import { accessGuardMiddleware } from "@/middleware/acessMiddleware";
import { layoutMiddleware } from "@/middleware/layoutMiddleware";
import { useAuthStore } from "@/stores/auth";
import { createRouter, createWebHistory } from "vue-router";
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
  const authStore = useAuthStore();

  middlewares.forEach((middleware: any) => {
    middleware({
      to,
      from,
      store: authStore,
    });
  });

  // const context = {
  //   to,
  //   from,
  //   store: authStore,
  // };

  // return middleware[0]({
  //   ...context,
  //   next: middlewarePipeline(context, middleware, 1),
  // });
});

router.beforeEach(layoutMiddleware);
router.beforeEach(accessGuardMiddleware);

export default router;
