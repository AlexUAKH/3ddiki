type ApiRequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: Record<string, unknown>;
  query?: Record<string, string | number | boolean | undefined>;
};

type AsyncApiOptions<T> = ApiRequestOptions & {
  key?: string;
  default?: () => T;
};

export const useApiClient = () => {
  const ssrHeaders = import.meta.server ? useRequestHeaders(["cookie"]) : {};

  const request = async <T>(url: string, options: ApiRequestOptions = {}) => {
    const fetchOptions = {
      ...options,
      baseURL: "/api",
      credentials: "include" as const,
      headers: { ...ssrHeaders },
    };

    try {
      return await $fetch<T>(url, fetchOptions);
    } catch (error: any) {
      console.log("in catch : ");

      const status = error?.response?.status ?? error?.statusCode;
      console.log("in catch status: ", status);
      const isAuthRequest =
        url.startsWith("/auth/client/") && !url.endsWith("/me");

      console.log("in catch isAuthRequest: ", isAuthRequest);
      console.log("in catch server: ", import.meta.server);
      // if (status !== 401 || import.meta.server) throw error;
      if (status !== 401 || isAuthRequest || import.meta.server) throw error;

      await $fetch("/auth/client/refresh", {
        baseURL: "/api",
        method: "POST",
        credentials: "include",
        headers: { ...ssrHeaders },
      });

      return $fetch<T>(url, fetchOptions);
    }
  };

  return { request };
};

export const useAsyncApi = <T>(
  url: string,
  options: AsyncApiOptions<T> = {},
) => {
  const { key, default: defaultValue, ...requestOptions } = options;
  const { request } = useApiClient();

  return useAsyncData<T>(key ?? url, () => request<T>(url, requestOptions), {
    default: defaultValue,
  });
};
