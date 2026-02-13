// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  app: {
    baseURL: "/",
    head: {
      charset: "utf-8",
      title: "ВЛЮБИСЬ",
      viewport: "width=device-width, initial-scale=1, maximum-scale=1",
      htmlAttrs: {
        lang: "ru",
      },
    },
    pageTransition: { name: "page", mode: "out-in" },
  },

  css: ["@/assets/scss/bundle.scss"],

  modules: ["@nuxt/image"],

  nitro: {
    experimental: {
      websocket: true,
    },
    replace: {
      "import * as process": "import * as processUnused",
    },
    publicAssets: [
      {
        dir: "public",
        maxAge: 60,
      },
    ],
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/scss/mixins.scss";`,
        },
      },
    },
    optimizeDeps: {
      exclude: ["vue-countup-v3"],
    },
  },
});
