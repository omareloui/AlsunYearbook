import { defineStore, acceptHMRUpdate } from "pinia";

import { Message, SendMessage } from "~~/@types";

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
      const messages = await $fetch("/api/messages/unread", {
        headers: useAuthHeaders()(),
      });
      this.unread = messages;
      this.fetchedUnread = true;
    },

    async fetchInbox() {
      if (this.fetchedInbox) return;
      const messages = await $fetch("/api/messages/inbox", {
        headers: useAuthHeaders()(),
      });
      this.inbox = messages;
      this.fetchedInbox = true;
    },

    async fetchSent() {
      if (this.fetchedSent) return;
      const messages = await $fetch("/api/messages/sent", {
        headers: useAuthHeaders()(),
      });
      this.sent = messages;
      this.fetchedSent = true;
    },

    async send(data: SendMessage) {
      const message = await $fetch("/api/messages/send", {
        method: "POST",
        body: data,
        headers: useAuthHeaders()(),
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
