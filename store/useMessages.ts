import { defineStore, acceptHMRUpdate } from "pinia";

import { Message, SendMessage } from "types";

import { useTokenedFetch } from "~~/composables/useTokenedFetch";

export const useMessagesStore = defineStore("messages", {
  state: () => ({
    inbox: [] as Message[],
    sent: [] as Message[],
    unread: [] as Message[],

    fetchedInbox: false,
    fetchedSent: false,
    fetchedUnread: false,
  }),

  actions: {
    async fetchUnread() {
      if (this.fetchedUnread) return;
      const messages = await useTokenedFetch("/api/messages/unread");
      this.unread = messages;
      this.fetchedUnread = true;
    },

    async fetchInbox() {
      if (this.fetchedInbox) return;
      const messages = await useTokenedFetch("/api/messages/inbox");
      this.inbox = messages;
      this.fetchedInbox = true;
    },

    async fetchSent() {
      if (this.fetchedSent) return;
      const messages = await useTokenedFetch("/api/messages/sent");
      this.sent = messages;
      this.fetchedSent = true;
    },

    async send(data: SendMessage) {
      const message = await useTokenedFetch("/api/messages/send", {
        method: "POST",
        body: data,
      });
      this.sent.unshift(message);
    },

    readAll() {
      this.unread = [];
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMessagesStore, import.meta.hot));
}
