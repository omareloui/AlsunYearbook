import { useAuthStore } from "~~/store/useAuth";

export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore();
  let shouldRemoveTokens = false;

  try {
    const { user } = await useTokenedFetch("/api/me");
    if (!user) return;
    authStore.setUser(user);
    if (useRoute().fullPath === "/") {
      await nextTick();
      navigateTo("/yearbook");
    }
  } catch (e) {
    shouldRemoveTokens = true;
  }

  if (process.client && shouldRemoveTokens) {
    authStore.signout();
  }
});
