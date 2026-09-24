export type User = {};

export const useUserStore = defineStore("auth", () => {
  const user = ref<User>({} as User);

  const isLoggedIn = computed(() => true);

  return { user, isLoggedIn };
});
