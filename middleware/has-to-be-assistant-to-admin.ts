import { useAuthStore } from "~~/store/useAuth";
import { useAuthorityHelper } from "~~/composables/useAuthorityHelper";

export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore();
  const authorityHelper = useAuthorityHelper();

  if (
    !authStore.user ||
    !authorityHelper.hasAccess(
      "ASSISTANT_TO_ADMIN",
      authStore.user.authorityRole
    )
  )
    return navigateTo("/");
});
