import {
  AUTH_CHANGE_PASSWORD,
  AUTH_FORGOT,
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_RESEND_EMAIL,
  AUTH_USER_INFO,
  AUTH_VERIFY_EMAIL,
} from "@/constants/api-const";
import $http from "@/plugins/axios";
import { type LoginResponse } from "./auth.types";

const API = "/auth";

export const useAuth = () => {
  const login = (data: {
    email: string;
    password: string;
  }): Promise<{ data: LoginResponse }> => {
    return $http.post(AUTH_LOGIN, data);
  };

  const logout = (email: string, refresh_token: string) => {
    return $http.post(AUTH_LOGOUT, { email, refresh_token });
  };

  const getUserInfo = async () => {
    return $http.get(AUTH_USER_INFO);
  };

  const resendVerificationEmail = async (email: string) => {
    return $http.post(AUTH_RESEND_EMAIL, {
      email,
    });
  };

  const verifyEmail = async (token: string) => {
    return $http.post(AUTH_VERIFY_EMAIL, { token });
  };

  // generate new token end send it to email
  const forgotPassword = async (email: string) => {
    return $http.post(AUTH_FORGOT, { email });
  };

  // set new password
  const changePassword = async (
    token: string = "",
    email: string = "",
    password: string,
  ) => {
    return $http.post(AUTH_CHANGE_PASSWORD, {
      email,
      token,
      password,
    });
  };

  const checkHasScope = (scopes: string[], userScopes: string[]) => {
    if (!userScopes) return false;

    return scopes.some((scope) => userScopes.includes(scope));
  };

  return {
    login,
    logout,
    forgotPassword,
    changePassword,
    getUserInfo,
    checkHasScope,
    resendVerificationEmail,
    verifyEmail,
  };
};
