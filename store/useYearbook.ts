import { defineStore, acceptHMRUpdate } from "pinia";
import type { User, YearbookSection } from "~~/@types";

export const useYearbookStore = defineStore("yearbook", {
  state: () => ({
    students: [] as User[],
    professors: [] as User[],

    previewedUser: null as null | User,
    section: "students" as YearbookSection,
  }),

  getters: {
    previewedUserIndex() {
      const currentUsers = this[this.section] as User[];
      return currentUsers.findIndex(
        u => u.socialMedia.fb === this.socialMedia.fb
      );
    },
    nextPreviewedUser() {
      const index = this.previewedUserIndex();
      const currentUsers = this[this.section] as User[];
      return index === currentUsers.length - 1
        ? currentUsers[0]
        : currentUsers[index + 1];
    },
    prevPreviewedUser() {
      const index = this.previewedUserIndex();
      const currentUsers = this[this.section] as User[];
      return index === 0
        ? currentUsers[currentUsers.length - 1]
        : currentUsers[index - 1];
    },
  },

  actions: {
    getCurrentSection() {
      this.getYearbook(this.section);
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

    setPreviewedUser(user: User) {
      this.previewedUser = user;
    },

    async setCurrentPreviewedUser(fbId: string) {
      const currentUsers = [...this.students, ...this.professors];

      if (!currentUsers.length) {
        // TODO: call only what is needed
        await this.getStudents();
        await this.getProfessors();
      }

      this.previewedUser = currentUsers.find(u => u.socialMedia.fb === fbId);

      // console.log(currentUsers);
      // console.log("============================================");
      // console.log(this.previewedUser);

      if (this.previewedUser)
        this.section = `${this.previewedUser.role.toLowerCase()}s`;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useYearbookStore, import.meta.hot));
}
