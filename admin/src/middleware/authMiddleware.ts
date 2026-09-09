import { ERouteNames } from "@/router/router.types";

export default function auth({ store }: { store: any }) {
  if (!store.accessToken) {
    return { name: ERouteNames.login };
  }
}
