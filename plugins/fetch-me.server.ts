import { useAuthStore } from "~~/store/useAuth";

export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore();

  const headers = useAuthHeaders()();

  const { user, token, refreshToken } = await $fetch("/api/me", { headers });

  if (!user) return;

  authStore.setUser(user);
  authStore.setTokensOnServer(token, refreshToken);
});
