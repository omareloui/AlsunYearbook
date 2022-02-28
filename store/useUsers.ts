import { defineStore, acceptHMRUpdate } from "pinia";
import type { User } from "~~/@types";

export const useUsersStore = defineStore("users", {
  state: () => ({ users: [] as User[] }),

  actions: {
    async getUsers() {
      if (this.users.length) return;

      const { data } = await useFetch("/api/users");
      this.users = data.value;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUsersStore, import.meta.hot));
}
