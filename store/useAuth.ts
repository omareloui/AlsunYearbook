import Cookie from "cookie-universal";
import { defineStore, acceptHMRUpdate } from "pinia";

import { useConstants } from "~~/composables/useConstants";

import type { SignType, Authentication, User } from "types";

const { JWT_NAME, REFRESH_TOKEN_NAME } = useConstants();

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as null | User,
  }),

  getters: {
    hasRefreshToken: () =>
      !!useCookie(REFRESH_TOKEN_NAME).value || Cookie().get(REFRESH_TOKEN_NAME),
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
      const data = await useCustomFetch<Authentication>(
        `/api/auth/sign${type}`,
        {
          method: "POST",
          body: formData,
        }
      );

      this.user = data.user;

      navigateTo("/yearbook");
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
