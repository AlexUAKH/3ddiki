import { ERouteNames } from "@/router/router.types";

export default function guest({ store }: { store: any }) {
  console.log(
    "guest middleware: ",
    "loggedin: ",
    store.loggedIn ? "true" : "false",
  );

  if (store.loggedIn) {
    return {
      name: ERouteNames.homePage,
    };
  }
}
