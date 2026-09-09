import router from "@/router";
import { ERouteNames } from "@/router/router.types";
import { type User, useAuthStore } from "@/stores/auth";
import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import Cookies from "js-cookie";

const headers = {
  "Content-Type": "application/json",
  "X-Requested-With": "XMLHttpRequest",
  // "Access-Control-Allow-Origin": "*",
};

const $http = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers,
  withCredentials: true,
});
$http.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";

const token = Cookies.get("3ddiki_access_token");

// Set token when defined
if (token) {
  $http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

$http.interceptors.request.use(function (config) {
  const token = Cookies.get("3ddiki_access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// $http.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     // console.log("intercept err: ", error);
//     if (error.response.status === 404) {
//       router.push({ name: "404" });
//     } else {
//       return Promise.reject(error);
//     }
//   }
// );

createAuthRefreshInterceptor($http, refreshAuthLogic);

function refreshAuthLogic(failedRequest: any): Promise<any> {
  return $http
    .post("/api/auth/refresh")
    .then(async (tokenRefreshResponse: any) => {
      const auth = useAuthStore();
      const token = tokenRefreshResponse.data.data.refresh_token;

      auth.accessToken = token;
      auth.error = "";
      Cookies.set("3ddiki_access_token", token, {
        expires: 365,
      });

      failedRequest.response.config.headers["Authorization"] =
        "Bearer " + token;
      return Promise.resolve();
    })
    .catch(() => {
      const auth = useAuthStore();

      Cookies.remove("3ddiki_access_token");
      auth.accessToken = "";
      auth.user = {} as User;
      router.push({ name: ERouteNames.login });
    });
}

export default $http;
