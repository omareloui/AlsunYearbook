import { defineStore, acceptHMRUpdate } from "pinia";

import { Message, SendMessage } from "~~/@types";

export const useMessagesStore = defineStore("messages", {
  state: () => ({
    inbox: [] as Message[],
    sent: [] as Message[],
    unread: [] as Message[],
  }),

  actions: {
    async fetchUnread() {
      const messages = await useCustomFetch("/api/messages/unread");
      this.unread = messages;
    },

    async fetchInbox() {
      const messages = await useCustomFetch("/api/messages/inbox");
      this.inbox = messages;
    },

    async fetchSent() {
      const messages = await useCustomFetch("/api/messages/sent");
      this.sent = messages;
    },

    async send(data: SendMessage) {
      const message = await useCustomFetch("/api/messages/send", {
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
