import $http from "@/plugins/axios";
import { type LoginResponse } from "./auth.types";

const API = "/auth";

export const useAuth = () => {
  const login = (data: {
    email: string;
    password: string;
  }): Promise<{ data: LoginResponse }> => {
    return $http.post(`${API}/login`, data);
  };

  const logout = (email: string, refresh_token: string) => {
    return $http.post(`${API}/logout`, { email, refresh_token });
  };

  const getUserInfo = async () => {
    return (await $http.get("/user/info")).data;
  };

  const forgotPassword = async (data: {
    email?: string;
    passport?: string;
  }) => {
    try {
      return (await $http.post(`${API}/forgot`, data)).data.data;
    } catch (e: any) {
      throw e.response.data;
    }
  };

  const changePassword = async (
    token: string = "",
    email: string = "",
    password: string,
    confirmPassword: string,
  ) => {
    try {
      return (
        await $http.post(`${API}/change`, {
          email,
          token,
          password,
          password_confirmation: confirmPassword,
        })
      ).data.data;
    } catch (e: any) {
      throw e.response.data;
    }
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
  };
};
