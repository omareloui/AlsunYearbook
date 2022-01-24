import Cookie from "cookie-universal";
import { defineStore, acceptHMRUpdate } from "pinia";

import { Theme } from "~~/@types";

const THEME_COOKIE_NAME = "theme";

export const useThemeStore = defineStore("theme", {
  state: () => ({
    currentTheme: "default" as Theme,
  }),

  getters: {
    htmlAttr: state => (state.currentTheme === "dark" ? "dark" : false),
  },

  actions: {
    load() {
      const cookie = this.getThemeFromCookie() as Theme;
      this.changeTheme(cookie);
    },

    changeTheme(theme: Theme) {
      this.currentTheme = theme;
      this.setThemeToCookie(theme);
      this.updateHtmlAttrs();
    },

    toggleTheme() {
      this.changeTheme(this.currentTheme === "dark" ? "light" : "dark");
    },

    updateHtmlAttrs() {
      useMeta({
        htmlAttrs: {
          theme: this.htmlAttr,
        },
      });
    },

    setThemeToCookie(theme: Theme) {
      const cookies = Cookie();
      cookies.set(THEME_COOKIE_NAME, theme, {
        path: "/",
        sameSite: "lax",
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });
    },

    getThemeFromCookie() {
      const cookies = Cookie();
      const cookie = cookies.get(THEME_COOKIE_NAME);
      if (!cookie) this.setThemeToCookie("default");
      return cookie as Theme;
    },

    loadMediaQuery() {
      this.setFromMediaQueryIfNeeded();
      this.listenForDefaultChange();
    },

    setFromMediaQueryIfNeeded() {
      if (this.currentTheme === "default") {
        const theme = this.getThemeFromMediaQuery();
        this.changeTheme(theme);
      }
    },

    getThemeFromMediaQuery() {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      )
        return "dark";
      return "light";
    },

    listenForDefaultChange() {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", e => {
          this.changeTheme(e.matches ? "dark" : "light");
        });
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useThemeStore, import.meta.hot));
}
