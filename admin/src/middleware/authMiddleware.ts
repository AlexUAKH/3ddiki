import { ERouteNames } from "@/router/router.types";

export default function auth({ to, token }: { to: any; token: string }) {
  console.log("auth middleware: ");
  console.log("store.accessToken: ", token || "no access token");

  if (!token && to.name !== ERouteNames.login) {
    console.log("return to login: ");

    return { name: ERouteNames.login };
  }
}
