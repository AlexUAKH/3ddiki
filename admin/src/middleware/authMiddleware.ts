import { ERouteNames } from "@/router/router.types";

export default function auth({ store }: { store: any }) {
  console.log("auth middleware: ");

  if (!store.accessToken) {
    return { name: ERouteNames.login };
  }
}
