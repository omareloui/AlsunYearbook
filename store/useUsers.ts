import { defineStore, acceptHMRUpdate } from "pinia";
import type { User } from "~~/@types";

export const useUsersStore = defineStore("users", {
  state: () => ({ users: [] as User[], currentUser: null as null | User }),

  getters: {
    currentUserIndex() {
      if (!this.currentUser) return null;
      return this.users.findIndex(
        u => u.socialMedia.fb === this.currentUser.socialMedia.fb
      );
    },

    nextUser() {
      const index = this.currentUserIndex;
      return index === this.users.length - 1
        ? this.users[0]
        : this.users[index + 1];
    },

    prevUser() {
      const index = this.currentUserIndex;
      return index === 0
        ? this.users[this.users.length - 1]
        : this.users[index - 1];
    },
  },

  actions: {
    async getUsers() {
      if (this.users.length) return;

      const { data } = await useFetch("/api/users");
      this.users = data.value;
    },

    async getUser(userId: string) {
      const user: User = this.getById(userId);
      if (user) return user;

      const { data } = await useFetch(`/api/users/user?id=${userId}`);
      return data.value as User;
    },

    getById(userId: string) {
      return (this.users as User[]).find(u => userId === u.socialMedia.fb);
    },

    async getPrevAndNext(user: User) {
      if (!this.users.length) await this.getUsers();

      this.currentUser = this.users.find(
        u => u.socialMedia.fb === user.socialMedia.fb
      );

      return { next: this.nextUser as User, prev: this.prevUser as User };
    },

    async toggleShow(userId: string) {
      const requestOptions = { method: "POST", body: { id: userId } };

      const { data } = await useFetch(
        `/api/users/edit/toggle-show`,
        requestOptions
      );

      const user = data.value as User;
      useNotify().success(
        `Updated ${useCapitalize(user.name.first)}'s show state.`
      );
      this.updateUser(user);
      return user;
    },

    updateUser(newUserData: User) {
      this.users = this.users.map(u => {
        if (u.socialMedia.fb !== newUserData.socialMedia.fb) return u;
        return newUserData;
      });
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUsersStore, import.meta.hot));
}
