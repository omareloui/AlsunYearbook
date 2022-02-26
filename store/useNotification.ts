import { defineStore, acceptHMRUpdate } from "pinia";
import type { Notification, NotificationType } from "~~/@types";

export const useNotificationStore = defineStore("notify", {
  state: () => ({
    transitionDuration: 500,
    idCounter: -1,
    defaultDuration: 2000,
    notifications: [] as Notification[],
  }),

  getters: {},

  actions: {
    hide(notificationId: number) {
      const notification = this.notifications.find(
        x => x.id === notificationId
      );
      if (notification) notification.isShown = false;
    },

    show(notificationId: number) {
      const notification = this.notifications.find(
        x => x.id === notificationId
      );
      if (notification) notification.isShown = true;
    },

    push(notification: Notification) {
      this.notifications.push(notification);
    },
    pop(notificationId: number) {
      this.notifications = this.notifications.filter(
        x => x.id !== notificationId
      );
    },

    increaseId() {
      this.idCounter++;
    },

    notify({
      message,
      duration,
      type,
    }: {
      message: string;
      duration?: number;
      type: NotificationType;
    }) {
      const newNotification: Notification = {
        id: this.idCounter,
        isShown: false,
        message,
        duration: duration || this.defaultDuration,
        type,
      };
      this.increaseId();
      this.add(newNotification);

      setTimeout(
        () => this.close(newNotification.id),
        newNotification.duration
      );
    },

    add(notification: Notification) {
      this.push(notification);
      this.show(notification.id);
      // setTimeout(() => this.show(notification.id), 0);
    },

    close(notificationId: number) {
      this.hide(notificationId);
      setTimeout(() => this.pop(notificationId), this.transitionDuration);
    },

    error({ message, duration }: { message: string; duration?: number }) {
      this.notify({ message, duration, type: "error" });
    },
    warn({ message, duration }: { message: string; duration?: number }) {
      this.notify({ message, duration, type: "warn" });
    },
    info({ message, duration }: { message: string; duration?: number }) {
      this.notify({ message, duration, type: "info" });
    },
    success({ message, duration }: { message: string; duration?: number }) {
      this.notify({ message, duration, type: "success" });
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useNotificationStore, import.meta.hot)
  );
}
