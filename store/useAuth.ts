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

    async setFromCookie() {
      await useAsyncData("users", async () => {
        const { data } = await useTokenedFetch("/api/me");
        this.setUser(data.value.user);
      });
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

    // async updateMe(
    //   { dispatch },
    //   { oldPassword, email, firstName, lastName, password }: UpdateMeOptions
    // ) {
    //   const options: UpdateMeOptions = {}
    //   if (firstName) options.firstName = firstName
    //   if (lastName) options.lastName = lastName
    //   if (email) options.email = email
    //   if (password && oldPassword) {
    //     options.password = password
    //     options.oldPassword = oldPassword
    //   }
    //   const { data: result } = await this.$axios.put("/me", options)
    //   dispatch("setSignData", result)
    //   this.$notify.success("Update profile")
    //   this.$router.push("/")
    // },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
