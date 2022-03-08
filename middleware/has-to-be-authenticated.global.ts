import { useAuthStore } from "~~/store/useAuth";

export default defineNuxtRouteMiddleware(to => {
  const authStore = useAuthStore();

  const routesRegExpToGuard = /^\/(yearbook|dashboard)/i;
  const isRouteToGuard = !!to.fullPath.match(routesRegExpToGuard);

  if (isRouteToGuard && !authStore.isSigned) return navigateTo("/");
});
