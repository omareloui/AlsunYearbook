import { fileURLToPath } from "node:url";
import { defineNuxtConfig } from "nuxt";

export default defineNuxtConfig({
  typescript: {
    strict: true,
  },

  alias: {
    types: fileURLToPath(new URL("./@types", import.meta.url)),
    server: fileURLToPath(new URL("./server", import.meta.url)),
    controllers: fileURLToPath(
      new URL("./server/controllers", import.meta.url)
    ),
  },

  runtimeConfig: {
    public: { isProd: process.env.NODE_ENV === "production" },
  },

  meta: {
    title: "Alsun Yearbook | Class of 2017/2021",
    meta: [{ name: "theme-color", content: "#ffee57" }],
    link: [
      { charset: "utf-8" },

      {
        hid: "description",
        name: "description",
        content:
          "A yearbook for University of Ain Shams' Alsun's class of 2017/2021.",
      },

      {
        hid: "apple-touch-icon",
        rel: "apple-touch-icon",
        href: "/icons/logo_x180.png",
      },
      { rel: "apple-mobile-web-app-status-bar", content: "#ffee57" },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },

      { rel: "manifest", href: "/site.webmanifest" },

      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossorigin: true,
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cairo:wght@600&family=Noto+Emoji&family=Raleway:wght@600;700;800;900&display=swap",
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
