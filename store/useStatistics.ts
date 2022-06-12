import { defineStore, acceptHMRUpdate } from "pinia";

import type { Statistics } from "types";

import { useTokenedFetch } from "~~/composables/useTokenedFetch";

export const useStatisticsStore = defineStore("statistics", {
  state: () => ({
    statistics: null as null | Statistics,
    fetchedStatistics: false,
  }),

  actions: {
    async fetchStatistics() {
      if (this.fetchedStatistics) return;
      const statistics = await useTokenedFetch("/api/statistics");
      this.statistics = statistics;
      this.fetchedStatistics = true;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStatisticsStore, import.meta.hot));
}
