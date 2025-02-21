// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  ssr: false,
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-headlessui",
    "@pinia/nuxt",
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
  i18n: {
    vueI18n: "./i18n.config.js",
  },
  carousel: {
    prefix: "MyPrefix",
  },
  css: [
    "~/assets/css/main.css",
    "~/assets/css/carousel-style.css",
    "vue3-carousel/dist/carousel.css",
  ],
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  router: {
    options: {
      // scrollBehaviorType: 'smooth'
  //     scrollBehavior() {
  //   return { top: 0, left: 0, behavior: "instant" };
  // },
    }
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
