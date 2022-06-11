import Cookie from "cookie-universal";
import { defineStore, acceptHMRUpdate } from "pinia";

import { useConstants } from "~~/composables/useConstants";
import { useGetSecondsFromString } from "~~/composables/useGetSecondsFromString";
import { useTokenedFetch } from "~~/composables/useTokenedFetch";

import type { SignType, User, Token } from "types";

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
      const { user, token, refreshToken } = await useTokenedFetch(
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

    setTokens(accessToken: Token, refreshToken: Token) {
      const cookies = Cookie();
      cookies.set(JWT_NAME, accessToken.body, {
        path: "/",
        maxAge: getSecondsFromString(accessToken.expiration as string),
      });
      cookies.set(REFRESH_TOKEN_NAME, refreshToken.body, {
        path: "/",
        maxAge: getSecondsFromString(refreshToken.expiration as string),
      });
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
