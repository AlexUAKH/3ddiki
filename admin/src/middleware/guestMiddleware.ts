import { ERouteNames } from "@/router/router.types";

export default function guest({ token }: { token: string }) {
  console.log("guest middleware: ", "loggedin: ", token ? "true" : "false");

  if (token) {
    return {
      name: ERouteNames.homePage,
    };
  }
}
