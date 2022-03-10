import { useAuthStore } from "~~/store/useAuth";

export default defineNuxtRouteMiddleware(to => {
  const authStore = useAuthStore();

  const routesRegExpToGuard = /^\/(sent-messages|inbox)/i;
  const isRouteToGuard = !!to.fullPath.match(routesRegExpToGuard);

  if (isRouteToGuard && (!authStore.isSigned || !authStore.isInYearbook))
    return navigateTo("/");
});
