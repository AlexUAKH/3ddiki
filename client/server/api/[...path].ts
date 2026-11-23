import { createError, getRequestURL, proxyRequest } from "h3";

export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event);
  const apiBase = config.apiBaseUrl.replace(/\/+$/, "");

  if (!apiBase) {
    throw createError({
      statusCode: 503,
      statusMessage: "API base URL is not configured",
    });
  }

  const requestUrl = getRequestURL(event);
  const apiPath = requestUrl.pathname.replace(/^\/api\/?/, "");
  const target = new URL(apiPath, `${apiBase}/`);
  target.search = requestUrl.search;

  return proxyRequest(event, target.toString());
});
