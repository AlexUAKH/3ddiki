import { ERouteNames } from "@/router/router.types";

export default function guest({ store }: { store: any }) {
  if (store.loggedIn) {
    return {
      name: ERouteNames.homePage,
    };
  }
}
