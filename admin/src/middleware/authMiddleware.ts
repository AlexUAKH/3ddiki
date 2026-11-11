import { ERouteNames } from "@/router/router.types";

export default function auth({ to, token }: { to: any; token: string }) {
  if (!token && to.name !== ERouteNames.login) {
    return { name: ERouteNames.login };
  }
}
