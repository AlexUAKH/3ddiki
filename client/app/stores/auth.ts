export type User = {};

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User>({} as User);

  const isLoggedIn = computed(() => false);

  return { user, isLoggedIn };
});
