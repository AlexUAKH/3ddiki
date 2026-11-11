import { ERouteNames } from "@/router/router.types";

export default function auth({ to, token }: { to: any; token: string }) {
  console.log("auth middle to: ", to);
  console.log("auth middle token: ", token);

  if (!token && to.name !== ERouteNames.login) {
    return { name: ERouteNames.login };
  }
}
