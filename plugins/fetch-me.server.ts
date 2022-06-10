import { useAuthStore } from "~~/store/useAuth";

export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore();

  const { user } = await $fetch("/api/me", { headers: useAuthHeaders()() });

  if (!user) return;

  authStore.setUser(user);
});
