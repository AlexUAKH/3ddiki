import type { User } from "@/composables/auth.types";
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "@/constants/cookies";
import router from "@/router";
import { ERouteNames } from "@/router/router.types";
import { useAuthStore } from "@/stores/auth";
import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import Cookies from "js-cookie";

const getAccessTokenExpireIn = () =>
  Number(import.meta.env.VITE_JWT_EXPIRES_IN_MINUTES || 15) * 60;

const getRefreshTokenExpireIn = () =>
  Number(import.meta.env.VITE_JWT_REFRESH_DAYS || 7) * 24 * 60 * 60;

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

const token = Cookies.get(ACCESS_TOKEN_COOKIE);

// Set token when defined
if (token) {
  $http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

$http.interceptors.request.use(function (config) {
  const token = Cookies.get(ACCESS_TOKEN_COOKIE);

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
    .post("/auth/refresh", {
      refresh_token: Cookies.get(REFRESH_TOKEN_COOKIE) || "",
    })
    .then(async (tokenRefreshResponse: any) => {
      const auth = useAuthStore();
      const accessToken = tokenRefreshResponse.data.data.access_token;
      const refreshToken = tokenRefreshResponse.data.data.refresh_token;

      auth.accessToken = accessToken;
      Cookies.set(ACCESS_TOKEN_COOKIE, accessToken, {
        expires: getAccessTokenExpireIn(),
      });
      Cookies.set(REFRESH_TOKEN_COOKIE, refreshToken, {
        expires: getRefreshTokenExpireIn(),
      });

      failedRequest.response.config.headers["Authorization"] =
        "Bearer " + token;
      return Promise.resolve();
    })
    .catch(() => {
      const auth = useAuthStore();

      Cookies.remove(ACCESS_TOKEN_COOKIE);
      Cookies.remove(REFRESH_TOKEN_COOKIE);
      auth.accessToken = "";
      auth.user = {} as User;
      router.push({ name: ERouteNames.login });
    });
}

export default $http;
