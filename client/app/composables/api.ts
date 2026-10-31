export const useAsyncApi = createUseFetch(() => {
  const config = useRuntimeConfig();

  return {
    baseURL: config.public.apiBase,
  };
});
