import { defineStore, acceptHMRUpdate } from "pinia";
import { Action } from "types";

export const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    actions: [] as Action[],
    fetchedActions: false,
  }),

  actions: {
    async fetchActions() {
      if (this.fetchedActions) return;
      this.actions = await $fetch("/api/actions", {
        headers: useAuthHeaders()(),
      });
      this.fetchedActions = true;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDashboardStore, import.meta.hot));
}
