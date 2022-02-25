import { defineStore, acceptHMRUpdate } from "pinia";
import type { User, YearbookSection } from "~~/@types";

import { useYearbookSections } from "~~/composables/useYearbookSections";

export const useYearbookStore = defineStore("yearbook", {
  state: () => ({
    students: [] as User[],
    professors: [] as User[],

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

      const router = useRouter();
      router.push({ query: { section: this.section } });
    },

    async changeSection(section: YearbookSection) {
      this.setSectionAndRoute(section);
      await this.getCurrentSectionUsers();
    },

    getCurrentSectionUsers() {
      return this.getYearbook(this.section);
    },

    getYearbook(section: YearbookSection) {
      if (section === "students") return this.getStudents();
      if (section === "professors") return this.getProfessors();
    },

    async getStudents() {
      if (this.students.length) return;

      const { data } = await useFetch("/api/yearbook?section=students");
      this.students = data.value;
    },

    async getProfessors() {
      if (this.professors.length) return;
      const { data } = await useFetch("/api/yearbook?section=professors");
      this.professors = data.value;
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
