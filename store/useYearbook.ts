import { defineStore, acceptHMRUpdate } from "pinia";
import type { CloseFriend, User, YearbookSection } from "types";
import { useSortUsers } from "~~/composables/useSortUsers";

import { useYearbookSections } from "~~/composables/useYearbookSections";

export const useYearbookStore = defineStore("yearbook", {
  state: () => ({
    students: [] as User[],
    professors: [] as User[],

    shown: [] as User[],
    searchQuery: "",

    section: "students" as YearbookSection,
    currentUser: null as null | User,

    closeFriends: [] as User[],

    fetchedMyCloseFriends: false,
    fetchedStudents: false,
    fetchedProfessors: false,
  }),

  getters: {
    currentUserIndex(): number {
      if (!this.currentUser) return -1;
      const currentUsers = this[this.section] as User[];
      return currentUsers.findIndex(
        u => u.socialMedia.fb === this.currentUser!.socialMedia.fb
      );
    },

    nextUser(): User {
      const index = this.currentUserIndex;
      const currentUsers = this[this.section] as User[];
      return index === currentUsers.length - 1
        ? currentUsers[0]
        : currentUsers[index + 1];
    },

    prevUser(): User {
      const index = this.currentUserIndex;
      const currentUsers = this[this.section] as User[];
      return index === 0
        ? currentUsers[currentUsers.length - 1]
        : currentUsers[index - 1];
    },

    sectionFromRoute() {
      const route = useRoute();
      const sectionFromQuery = route.query.section as
        | undefined
        | YearbookSection;

      if (
        !sectionFromQuery ||
        !useYearbookSections().includes(sectionFromQuery)
      )
        return "students";

      return sectionFromQuery as YearbookSection;
    },
  },

  actions: {
    setSectionOnLoad() {
      this.setSection(this.sectionFromRoute as YearbookSection);
    },

    setSection(section: YearbookSection) {
      this.section =
        section === "students" || section === "professors"
          ? section
          : "students";
    },

    setSectionAndRoute(section: YearbookSection) {
      this.setSection(section);

      navigateTo({ query: { section: this.section } });
    },

    async setShown(usersToShow?: User[]) {
      this.shown = [];
      await nextTick();
      this.shown = usersToShow || this.getDefaultShown();
    },

    getDefaultShown() {
      return this.section === "professors"
        ? this.professors
        : this.getSortedStudentsWithCloseFriends();
    },

    getSortedStudentsWithCloseFriends() {
      return [
        ...useSortUsers(this.closeFriends),
        ...useSortUsers(this.students).filter(
          u => this.closeFriends.findIndex(cf => cf._id === u._id) === -1
        ),
      ];
    },

    async changeSection(section: YearbookSection) {
      this.searchQuery = "";
      this.setSectionAndRoute(section);
      await this.fetchCurrentSection();
      await this.setShown();
    },

    fetchUser(id: string) {
      const user = this.getById(id);
      if (user) return user;
      return $fetch(`/api/yearbook/user?id=${id}`, {
        headers: useAuthHeaders()(),
      }) as Promise<User>;
    },

    async fetchCurrentSection() {
      await this.fetchSection(this.section);
    },

    async fetchSection(section: YearbookSection) {
      if (this[`fetched${useCapitalize(section) as "Students" | "Professors"}`])
        return;
      this[section] = await $fetch(`/api/yearbook?section=${section}`, {
        headers: useAuthHeaders()(),
      });
    },

    getById(id: string) {
      const users = [...this.students, ...this.professors] as User[];
      return users.find(u => u.socialMedia.fb === id);
    },

    search() {
      const result = useSearchUsers(this.getDefaultShown(), this.searchQuery);
      this.setShown(result);
    },

    async getPrevAndNext(user: User) {
      this.setSection(`${user.role.toLowerCase()}s` as YearbookSection);
      let currentUsers = this[this.section];

      currentUsers = this[this.section];

      this.currentUser =
        currentUsers.find(u => u.socialMedia.fb === user.socialMedia.fb) ||
        null;

      return { next: this.nextUser, prev: this.prevUser };
    },

    async fetchMyCloseFriends() {
      if (this.fetchedMyCloseFriends) return;
      this.closeFriends = await $fetch("/api/close-friend/mine", {
        headers: useAuthHeaders()(),
      });
      this.fetchedMyCloseFriends = true;
    },

    checkIfCloseFriend(userId: string) {
      return !!this.closeFriends.find(u => u._id === userId);
    },

    async makeCloseFriend(userId: string) {
      if (this.checkIfCloseFriend(userId)) return;

      const closeFriendRecord = (await useCustomFetch(
        "/api/close-friend/make",
        {
          method: "POST",
          body: { id: userId },
        }
      )) as CloseFriend;

      this.closeFriends.push(closeFriendRecord.closeFriend);
      useNotify().success(
        `Made ${useUserFullName(closeFriendRecord.closeFriend)} a close friend.`
      );
    },

    async removeCloseFriend(userId: string) {
      if (!this.checkIfCloseFriend(userId)) return;

      await useCustomFetch(`/api/close-friend/remove?id=${userId}`, {
        method: "DELETE",
      });

      this.closeFriends = this.closeFriends.filter(u => u._id !== userId);
      useNotify().success("Removed from close friends.");
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useYearbookStore, import.meta.hot));
}
