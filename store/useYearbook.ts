import { defineStore, acceptHMRUpdate } from "pinia";
import type { User, YearbookSection } from "~~/@types";

export const useYearbookStore = defineStore("yearbook", {
  state: () => ({
    students: [] as User[],
    professors: [] as User[],

    section: "students" as YearbookSection,
    currentUser: null as null | User,
  }),

  getters: {
    currentUserIndex() {
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
  },

  actions: {
    async getCurrentSectionUsers() {
      return await this.getYearbook(this.section);
    },

    async getYearbook(section: YearbookSection) {
      if (section === "students") return await this.getStudents();
      if (section === "professors") return await this.getProfessors();
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
      this.section = `${user.role.toLowerCase()}s` as YearbookSection;
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
