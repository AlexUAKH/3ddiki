// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  modules: [
    "@nuxtjs/color-mode",
    "@nuxtjs/color-mode",
    "@nuxt/icon",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/i18n",
  ],
  app: {
    head: {
      charset: "utf-16",
      viewport: "width=device-width, initial-scale=1, maximum-scale=1",
    },
    pageTransition: { name: "page", mode: "out-in" },
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["~/assets/css/main.css"],
  devServer: {
    port: 3001,
  },
  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: "123",
    // Keys within public are also exposed client-side
    public: {
      apiBase: "/api",
    },
  },
  $production: {
    routeRules: {
      "/**": { isr: true },
    },
  },
  routeRules: {
    // Set layout for specific route
    "/profile": { appLayout: "profile" },
    "/profile/wishList": { appLayout: "profile" },
    "/profile/ordersList": { appLayout: "profile" },
  },
  icon: {
    mode: "css",
    cssLayer: "base",
  },
  colorMode: {
    preference: "system",
    fallback: "light", // fallback value if not system preference found
    globalName: "__NUXT_COLOR_MODE__",
    componentName: "ColorScheme",
    classPrefix: "",
    classSuffix: "",
    storage: "localStorage", // or 'sessionStorage' or 'cookie'
    storageKey: "3ddiki-color-mode",
    cookieAttrs: { maxAge: 31536000, path: "/" },
  },
  pinia: {
    /**
     * Automatically add stores dirs to the auto imports. This is the same as
     * directly adding the dirs to the `imports.dirs` option. If you want to
     * also import nested stores, you can use the glob pattern `./stores/**`
     * (on Nuxt 3) or `app/stores/**` (on Nuxt 4+)
     *
     * @default ['stores']
     */
    storesDirs: ["stores"],
  },
  i18n: {
    defaultLocale: "uk",
    strategy: "no_prefix",
    locales: [
      { code: "en", name: "English", file: "en.ts" },
      { code: "uk", name: "Ukrainian", file: "uk.ts" },
    ],
    // detectBrowserLanguage:false
  },
});
