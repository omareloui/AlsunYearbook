import { defineStore, acceptHMRUpdate } from "pinia";
import type { User, YearbookSection } from "~~/@types";

import { useYearbookSections } from "~~/composables/useYearbookSections";

export const useYearbookStore = defineStore("yearbook", {
  state: () => ({
    students: [] as User[],
    professors: [] as User[],

    shown: [] as User[],
    searchQuery: "",

    section: "students" as YearbookSection,
    currentUser: null as null | User,
  }),

  getters: {
    currentUserIndex() {
      if (!this.currentUser) return null;
      const currentUsers = this[this.section] as User[];
      return currentUsers.findIndex(
        u => u.socialMedia.fb === this.currentUser.socialMedia.fb
      );
    },

    nextUser() {
      const index = this.currentUserIndex;
      const currentUsers = this[this.section] as User[];
      return index === currentUsers.length - 1
        ? currentUsers[0]
        : currentUsers[index + 1];
    },

    prevUser() {
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
      this.shown = usersToShow || this[this.section];
    },

    async changeSection(section: YearbookSection) {
      this.searchQuery = "";
      this.setSectionAndRoute(section);
      await this.fetchCurrentSection();
      await this.setShown();
    },

    async fetchCurrentSection() {
      await this.fetchSection(this.section);
    },

    async fetchSection(section: YearbookSection) {
      if (this[section].length) return;
      this[section] = await useCustomFetch(`/api/yearbook?section=${section}`);
    },

    search() {
      const result = useSearchUsers(this[this.section], this.searchQuery);
      this.setShown(result);
    },

    async getPrevAndNext(user: User) {
      this.setSection(`${user.role.toLowerCase()}s` as YearbookSection);
      let currentUsers = this[this.section] as User[];

      if (!currentUsers.length) await this.getCurrentSectionUsers();

      currentUsers = this[this.section];

      this.currentUser = currentUsers.find(
        u => u.socialMedia.fb === user.socialMedia.fb
      );

      return { next: this.nextUser as User, prev: this.prevUser as User };
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useYearbookStore, import.meta.hot));
}
