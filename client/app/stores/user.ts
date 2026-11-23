export type User = {
  id: string;
  email: string;
  name: string;
  lastName?: string;
  role?: string;
  isEmailVerified?: boolean;
};

export const useUserStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const isLoading = ref(false);
  const { request } = useApiClient();

  const isLoggedIn = computed(() => user.value !== null);

  const login = async (email: string, password: string) => {
    isLoading.value = true;
    try {
      const result = await request<{ user: User }>("/auth/client/login", {
        method: "POST",
        body: { email, password },
      });
      user.value = result.user;
      return true;
    } finally {
      isLoading.value = false;
    }
  };

  const loadSession = async () => {
    try {
      user.value = await request<User>("/auth/client/me");
    } catch {
      user.value = null;
    }
  };

  const logout = async () => {
    try {
      await request("/auth/client/logout", { method: "POST" });
    } catch {
      // Clear local auth state even if the API is unavailable.
    } finally {
      user.value = null;
    }
  };

  return { user, isLoggedIn, isLoading, login, loadSession, logout };
});
