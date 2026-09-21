import { useAuth } from "@/composables/auth";
import { EUserRoles, type User } from "@/composables/auth.types";
import { useHelpers } from "@/composables/helpers";
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "@/constants/cookies";
import Cookies from "js-cookie";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const { logout: logoutApi, login: loginApi, getUserInfo } = useAuth();
    const { errorMessage } = useHelpers();

    const accessToken = ref<string>(Cookies.get(ACCESS_TOKEN_COOKIE) || "");
    const user = ref<User>({} as User);

    const loggedIn = computed(() => {
      return !!accessToken.value;
    });

    const isAdmin = computed(() => {
      return user.value?.role === EUserRoles.ADMIN; // remoove !
    });

    const login = async (loginData: { email: string; password: string }) => {
      try {
        const res = (await loginApi(loginData)).data;

        accessToken.value = res.access_token;

        Cookies.set(ACCESS_TOKEN_COOKIE, res.access_token, {
          expires: Number(res.expire_at),
        });
        Cookies.set(REFRESH_TOKEN_COOKIE, res.refresh_token, {
          expires: Number(res.expire_at),
        });

        user.value = res.user;

        return user.value;
      } catch (e: any) {
        userReset();
        const message = errorMessage(e, "Check your login and password");
        const field = e.response.data?.field || "";

        throw { message, field };
      }
    };

    const logout = async () => {
      if (user.value) {
        try {
          await logoutApi(
            user.value.email,
            Cookies.get(REFRESH_TOKEN_COOKIE) || "",
          );
          userReset();
        } catch {}
        // localStorage.removeItem("auth");
      }
    };

    const userReset = () => {
      Cookies.remove(ACCESS_TOKEN_COOKIE);
      Cookies.remove(REFRESH_TOKEN_COOKIE);
      accessToken.value = "";
      user.value = {} as User;
    };

    // const canDo = (action: string): boolean => {
    //   return user.value.permissions.includes(action);
    // };

    return {
      accessToken,
      user,
      loggedIn,
      isAdmin,
      login,
      logout,
      // canDo,
    };
  },
  {
    persist: {
      // afterRestore: (ctx) => {
      afterHydrate: (ctx) => {
        console.log("Restored store: ", ctx.store);
        if (ctx.store.accessToken)
          Cookies.set(ACCESS_TOKEN_COOKIE, ctx.store.accessToken, {
            expires: 365,
          });
      },
    },
  },
);
