import { useAuth } from "@/composables/auth";
import { EUserRoles } from "@/composables/auth.types";
import Cookies from "js-cookie";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export interface User {
  id: string;
  email: string;
  permissions: string[];
  roles: string[];
}

export const useAuthStore = defineStore(
  "auth",
  () => {
    const { logout: logoutApi, login: loginApi, getUserInfo } = useAuth();

    const accessToken = ref<string>(Cookies.get("3ddiki_access_token") || "");
    const user = ref<User>({} as User);
    const error = ref("");

    const loggedIn = computed(() => {
      return !!accessToken.value;
    });

    const getUser = computed(() => {
      return user.value;
    });

    const isAdmin = computed(() => {
      if (user.value?.roles) {
        return user.value?.roles.includes(EUserRoles.ADMIN); // remoove !
      }
      return false;
    });

    const login = async (loginData: {
      email?: string;
      passport?: string;
      password: string;
    }) => {
      error.value = "";
      try {
        const res = await loginApi(loginData);

        accessToken.value = res.access_token;
        Cookies.set("3ddiki_access_token", res.access_token, {
          expires: Number(res.expire_at),
        });
        const info = await getUserInfo();

        user.value = {
          id: res.id,
          email: res.email,
          permissions: res.permissions,
          roles: [...info.roles],
        };

        return user.value;
      } catch (e: any) {
        userReset();
        const message =
          e.response.data?.result?.message ||
          e.response.data?.message ||
          "Check your login and password";
        error.value = message;
        throw message;
      }
    };

    const logout = async () => {
      if (user.value) {
        await logoutApi(user.value.email).catch(() => {});
        userReset();
        // localStorage.removeItem("auth");
      }
    };

    const userReset = () => {
      Cookies.remove("3ddiki_access_token");
      accessToken.value = "";
      user.value = {} as User;
    };

    const canDo = (action: string): boolean => {
      return user.value.permissions.includes(action);
    };

    return {
      accessToken,
      user,
      error,
      loggedIn,
      isAdmin,
      getUser,
      login,
      logout,
      canDo,
    };
  },
  {
    persist: {
      // afterRestore: (ctx) => {
      afterHydrate: (ctx) => {
        if (ctx.store.accessToken)
          Cookies.set("3ddiki_access_token", ctx.store.accessToken, {
            expires: 365,
          });
      },
    },
  },
);
