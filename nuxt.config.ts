import Aura from "@primevue/themes/aura";

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  modules: ["@primevue/nuxt-module", "@nuxtjs/tailwindcss"],
  primevue: {
    options: {
      theme: {
        preset: Aura,
      },
    },
  },
});
