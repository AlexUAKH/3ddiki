export type User = {
  name: string;
};

export const useUserStore = defineStore("auth", () => {
  const user = ref<User>({} as User);

  const isLoggedIn = computed(() => user.value.name);

  return { user, isLoggedIn };
});
