import { defineNuxtConfig } from "nuxt";

export default defineNuxtConfig({
  meta: {
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossorigin: true,
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cairo:wght@600&family=Raleway:wght@600;700;800;900&display=swap",
      },
    ],
  },

  css: [
    "~/assets/styles/core/index.scss",
    "~/assets/styles/variables/index.scss",
    "~/assets/styles/base/index.scss",
    "~/assets/styles/utilities/index.scss",
  ],

  buildModules: ["@pinia/nuxt"],
});
