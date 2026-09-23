export const useAppStore = defineStore("app", () => {
  const showAuth = ref(false);

  const setShowAuth = (value: boolean) => {
    showAuth.value = value;
  };

  return {
    showAuth,
    setShowAuth,
  };
});
