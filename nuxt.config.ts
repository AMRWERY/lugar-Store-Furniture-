// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  ssr: false,
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-headlessui",
    "@pinia/nuxt",
    "@formkit/nuxt",
    "@nuxtjs/i18n",
    "vue3-carousel-nuxt",
    "@vueuse/nuxt",
  ],
  tailwindcss: {
    cssPath: ["~/assets/css/tailwind.css", { injectPosition: "first" }],
    configPath: "tailwind.config",
    viewer: true,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  headlessui: {
    prefix: "Headless",
  },
  pinia: {
    storesDirs: ["./stores/**", "./custom-folder/stores/**"],
  },
  formkit: {
    autoImport: true,
    configFile: "./formkit.config.js",
  },
  i18n: {
    vueI18n: "./i18n.config.js",
  },
  carousel: {
    prefix: "MyPrefix",
  },
  css: ["~/assets/css/main.css"],
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  runtimeConfig: {
    // Private variables (server only) go here
    // ...
    public: {
      // Variables available on both client and server
      categoriesApiEndpoint: process.env.NUXT_PUBLIC_CATEGORIES_API_ENDPOINT,
      subCategoriesApiEndpoint:
        process.env.NUXT_PUBLIC_SUB_CATEGORIES_API_ENDPOINT,
      uploadImgApiEndpoint: process.env.NUXT_PUBLIC_UPLOAD_IMG_API_ENDPOINT,
      productsApiEndpoint: process.env.NUXT_PUBLIC_PRODUCTS_API_ENDPOINT,
    },
  },
  app: {
    head: {
      title: "Lugar Store",
      script: [{}],
      noscript: [],
      link: [
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css",
        },
      ],
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          charset: "utf-8",
        },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },
});
