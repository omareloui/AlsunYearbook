import { useNotificationStore } from "~~/store/useNotification";

export function useNotify() {
  const notificationStore = useNotificationStore();

  return {
    error(message: string, options: { duration?: number } = {}) {
      notificationStore.error({ message, ...options });
    },

    warn(message: string, options: { duration?: number } = {}) {
      notificationStore.warn({ message, ...options });
    },

    info(message: string, options: { duration?: number } = {}) {
      notificationStore.info({ message, ...options });
    },

    success(message: string, options: { duration?: number } = {}) {
      notificationStore.success({ message, ...options });
    },
  };
}
