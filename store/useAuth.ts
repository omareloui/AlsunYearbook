import Cookie from "cookie-universal";
import { defineStore, acceptHMRUpdate } from "pinia";

import { useConstants } from "~~/composables/useConstants";
import { useGetSecondsFromString } from "~~/composables/useGetSecondsFromString";

import type { SignType, Authentication, User, Token } from "types";

const { JWT_NAME, REFRESH_TOKEN_NAME } = useConstants();
const getSecondsFromString = useGetSecondsFromString();

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as null | User,
  }),

  getters: {
    isSigned: state => !!state.user,
    isInYearbook: state => state.user && useUserIsInYearbook(state.user),
    hasAuthority: state => state.user && useUserHasAuthority(state.user),
  },

  actions: {
    setUser(user?: User | null) {
      this.user = user ? user : null;
    },

    removeCookies() {
      const cookies = Cookie();
      [JWT_NAME, REFRESH_TOKEN_NAME].forEach(x => cookies.remove(x));
    },

    async sign(
      formData: { fbId?: string; username: string; password: string },
      type: SignType
    ) {
      const { user, token, refreshToken } = await $fetch(
        `/api/auth/sign${type}`,
        {
          method: "POST",
          body: formData,
        }
      );

      this.user = user;
      this.setTokens(token, refreshToken);

      navigateTo("/yearbook");
    },

    async refreshTokens() {
      return await $fetch("/api/auth/refresh-tokens", {
        headers: { "x-refresh-token": useAuthHeaders()()["x-refresh-token"] },
      });
    },

    setTokens(accessToken: Token, refreshToken: Token) {
      const cookies = Cookie();
      cookies.set(JWT_NAME, accessToken.body, {
        maxAge: getSecondsFromString(accessToken.expiration as string),
      });
      cookies.set(REFRESH_TOKEN_NAME, refreshToken.body, {
        maxAge: getSecondsFromString(refreshToken.expiration as string),
      });
    },

    setTokensOnServer(accessToken: Token, refreshToken: Token) {
      useCookie(JWT_NAME, {
        maxAge: getSecondsFromString(accessToken.expiration as string),
      }).value = accessToken.body;

      useCookie(REFRESH_TOKEN_NAME, {
        maxAge: getSecondsFromString(refreshToken.expiration as string),
      }).value = refreshToken.body;
    },

    async signout() {
      navigateTo("/");
      await nextTick();
      this.removeCookies();
      this.setUser(null);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
