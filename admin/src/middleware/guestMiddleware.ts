import { ERouteNames } from "@/router/router.types";

export default function guest({ token }: { token: string }) {
  if (token) {
    return {
      name: ERouteNames.homePage,
    };
  }
}
