import { defineStore, acceptHMRUpdate } from "pinia";

import type { User, UserActivities } from "types";

import { useTokenedFetch } from "~~/composables/useTokenedFetch";

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: [] as User[],
    shown: [] as User[],
    activities: [] as { userId: string; activities: UserActivities }[],

    currentUser: null as null | User,

    searchQuery: "",

    fetchedUsers: false,
  }),

  getters: {
    currentUserIndex(): number {
      if (!this.currentUser) return -1;
      return this.users.findIndex(
        u => u.socialMedia.fb === this.currentUser!.socialMedia.fb
      );
    },

    nextUser(): User {
      const index = this.currentUserIndex;
      return index === this.users.length - 1
        ? this.users[0]
        : this.users[index + 1];
    },

    prevUser(): User {
      const index = this.currentUserIndex;
      return index === 0
        ? this.users[this.users.length - 1]
        : this.users[index - 1];
    },
  },

  actions: {
    async fetchUsers() {
      if (this.fetchedUsers) return;
      this.users = await useTokenedFetch("/api/users");
      this.setShown();
      this.fetchedUsers = true;
    },

    fetchUser(userId: string) {
      const user = this.getById(userId);
      if (user) return user;
      return useTokenedFetch(`/api/users/user?id=${userId}`) as Promise<User>;
    },

    getById(userId: string) {
      return (this.users as User[]).find(u => userId === u.socialMedia.fb);
    },

    async getPrevAndNext(user: User) {
      if (!this.users.length) await this.fetchUsers();

      this.currentUser =
        this.users.find(u => u.socialMedia.fb === user.socialMedia.fb) || null;

      return { next: this.nextUser as User, prev: this.prevUser as User };
    },

    async setShown(usersToShow?: User[]) {
      this.shown = [];
      await nextTick();
      this.shown = usersToShow || this.users;
    },

    async search() {
      const result = useSearchUsers(this.users, this.searchQuery);
      this.setShown(result);
    },

    async toggleShow(userId: string) {
      const requestOptions = { method: "POST", body: { id: userId } };

      const notify = useNotify();
      try {
        const user = (await useTokenedFetch(
          `/api/users/edit/toggle-show`,
          requestOptions
        )) as User;

        this.updateUser(user);
        notify.success(
          `Updated ${useUserFullName(user)} show state to ${
            user.isShown ? "shown" : "hidden"
          }.`
        );
        return user;
      } catch (e) {
        notify.error((e as Error).message);
      }
    },

    async resetUser(userId: string) {
      const isConfirmed = await confirm(
        `Are you sure you want to reset ${userId}?`
      );
      if (!isConfirmed) return;

      const requestOptions = { method: "POST", body: { id: userId } };
      const notify = useNotify();

      try {
        const user = (await useTokenedFetch(
          "/api/users/edit/reset",
          requestOptions
        )) as User;

        this.updateUser(user);
        notify.success(`Reset ${user.name.first}.`);
        return user;
      } catch (e) {
        notify.error((e as Error).message);
      }
    },

    async fetchActivities(userId: string): Promise<UserActivities> {
      const activitiesFromCache = this.activities.find(
        a => a.userId === userId
      );
      if (activitiesFromCache) return activitiesFromCache.activities;

      const activities: UserActivities = await useTokenedFetch(
        `/api/users/activities?id=${userId}`
      );

      this.activities.push({ userId, activities });

      return activities;
    },

    updateUser(newUserData: User) {
      const updateUser = (u: User) => {
        if (u._id.toString() !== newUserData._id.toString()) return u;
        return newUserData;
      };
      this.shown = this.shown.map(updateUser);
      this.users = this.users.map(updateUser);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUsersStore, import.meta.hot));
}
