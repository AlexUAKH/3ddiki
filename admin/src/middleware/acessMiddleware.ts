// import { useAuth } from "@/composables/auth";
import { useAuth } from "@/composables/auth";
import { ERouteNames } from "@/router/router.types";
import { useAuthStore } from "@/stores/auth";
import type { RouteLocationNormalized } from "vue-router";

export function accessGuardMiddleware(to: RouteLocationNormalized) {
  console.log("access middleware: ");

  const { accessScopes } = to.meta;
  if (!accessScopes) return;
  console.log("access middleware has scopes: ", accessScopes);

  const { checkHasScope } = useAuth();
  const { getUser } = useAuthStore();

  if (checkHasScope(accessScopes, getUser.permissions)) return;

  return { name: ERouteNames.accessError };
}
