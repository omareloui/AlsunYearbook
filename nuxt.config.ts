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

    meta: [
      { charset: "utf-8" },

      { name: "theme-color", content: "#ffee57" },

      {
        name: "description",
        content:
          "A yearbook for University of Ain Shams' Alsun's class of 2017/2021.",
      },

      { property: "og:url", content: "https://alsun.herokuapp.com" },
      { property: "og:title", content: "Alsun Yearbook" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Alsun Yearbook" },
      {
        property: "og:description",
        content:
          "A yearbook for University of Ain Shams' Alsun's class of 2017/2021.",
      },

      {
        property: "og:image",
        content: "https://alsun.herokuapp.com/images/heading.png?v=2",
      },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1280" },
      { property: "og:image:height", content: "640" },

      { property: "og:update_time", content: "1655071039" },

      { name: "twitter:card", content: "summary_large_image" },
      { property: "twitter:domain", content: "alsun.herokuapp.com" },
      { property: "twitter:url", content: "https://alsun.herokuapp.com" },
      { name: "twitter:title", content: "Alsun Yearbook" },
      {
        name: "twitter:description",
        content:
          "A yearbook for University of Ain Shams' Alsun's class of 2017/2021.",
      },
      {
        name: "twitter:image",
        content: "https://alsun.herokuapp.com/images/heading.png?v=2",
      },
    ],

    link: [
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
