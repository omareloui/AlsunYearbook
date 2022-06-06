import Cookie from "cookie-universal";
import { defineStore, acceptHMRUpdate } from "pinia";

import { useConstants } from "~~/composables/useConstants";
import type { SignType } from "~~/@types";

const { JWT_NAME, REFRESH_TOKEN_NAME } = useConstants();

import type { Authentication, User } from "~~/@types";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as null | User,
  }),

  getters: {
    isSigned: state => !!state.user,
    isInYearbook: state => useUserIsInYearbook(state.user),
    hasAuthority: state => useUserHasAuthority(state.user),
  },

  actions: {
    removeCookies() {
      const cookies = Cookie();
      [JWT_NAME, REFRESH_TOKEN_NAME].forEach(x => cookies.remove(x));
    },

    setSignData({ user, token }: Authentication) {
      this.user = user;
      this.setCookie(token.body, token.expiration);
    },

    async setFromCookie() {
      // const data = (await useCustomFetch("/api/me")) as Authentication;
      // if (!data?.user) return;
      // this.user = data.user;
    },

    async sign(
      formData: { fbId?: string; username: string; password: string },
      type: SignType
    ) {
      const data = (await useCustomFetch(`/api/auth/sign${type}`, {
        method: "POST",
        body: formData,
      })) as Authentication;

      this.user = data.user;

      navigateTo("/yearbook");
    },

    async signout() {
      navigateTo("/");
      await nextTick();
      this.removeCookies();
      this.user = null;
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

    // async setMe({ commit, dispatch }) {
    //   if (!(await dispatch("getToken"))) return
    //   try {
    //     const { data: me } = await this.$axios.get("/me")
    //     commit("setUser", me)
    //     commit("updateIsSigned", true)
    //   } catch (e) {
    //     // @ts-ignore
    //     if (!e.response || e.response.data.status === 401) {
    //       dispatch("signOut")
    //       this.$router.push("/")
    //     }
    //   }
    // },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
