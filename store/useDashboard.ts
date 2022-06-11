import { defineStore, acceptHMRUpdate } from "pinia";
import { Action } from "types";

import { useTokenedFetch } from "~~/composables/useTokenedFetch";

export const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    actions: [] as Action[],
    fetchedActions: false,
  }),

  actions: {
    async fetchActions() {
      if (this.fetchedActions) return;
      this.actions = await useTokenedFetch("/api/actions");
      this.fetchedActions = true;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDashboardStore, import.meta.hot));
}
