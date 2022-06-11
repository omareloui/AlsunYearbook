import { useAuthStore } from "~~/store/useAuth";

export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore();

  const { user } = await useTokenedFetch("/api/me");
  if (!user) return;
  authStore.setUser(user);
});
