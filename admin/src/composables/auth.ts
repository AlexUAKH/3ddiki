import $axios from "@/plugins/axios";
import { type LoginResponse } from "./auth.types";

const API = "/api/auth";

export const useAuth = () => {
  const login = async (data: {
    email?: string;
    passport?: string;
    password: string;
  }): Promise<LoginResponse> => {
    try {
      await $axios.get("/sanctum/csrf-cookie");
      return (await $axios.post(`${API}/login`, data)).data.data;
    } catch (e) {
      throw e;
    }
  };

  const loginAsUther = async (userId: string): Promise<any> => {
    try {
      // await $axios.get("/sanctum/csrf-cookie");
      return (await $axios.post(`${API}/loginAsUser`, userId)).data.data;
    } catch (e) {
      throw e;
    }
  };

  const logout = (email: string) => {
    return $axios.post(`${API}/logout`, { email });
  };

  const getUserInfo = async () => {
    return (await $axios.get("/api/users/info")).data.data;
  };

  const forgotPassword = async (data: {
    email?: string;
    passport?: string;
  }) => {
    try {
      return (await $axios.post(`api/forgot`, data)).data.data;
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
        await $axios.post("api/change", {
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

  const changeCRPassword = async (
    crId: string,
    password: string,
    confirmPassword: string,
  ) => {
    try {
      return (
        await $axios.post(
          `api/company-representatives/${crId}/change-password`,
          {
            password,
            password_confirmation: confirmPassword,
          },
        )
      ).data.data;
    } catch (e: any) {
      throw e.response.data;
    }
  };

  const changeDelegatePassword = async (
    delegateId: string,
    password: string,
    confirmPassword: string,
  ) => {
    try {
      return (
        await $axios.post(`api/delegates/${delegateId}/change-password`, {
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
    loginAsUther,
    logout,
    forgotPassword,
    changePassword,
    getUserInfo,
    checkHasScope,
    changeDelegatePassword,
    changeCRPassword,
  };
};
