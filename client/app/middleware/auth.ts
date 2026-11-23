export default defineNuxtRouteMiddleware(async () => {
  const authStore = useUserStore();
  const { user } = storeToRefs(authStore);

  if (!user.value) {
    await authStore.loadSession();
  }

  if (!user.value) {
    useAppStore().setShowAuth(true);
    return navigateTo("/", { replace: true });
  }
});
