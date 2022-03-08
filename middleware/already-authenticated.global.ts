import { useAuthStore } from "~~/store/useAuth";

export default defineNuxtRouteMiddleware((_from, to) => {
  const authStore = useAuthStore();

  const routesRegExpToGuard = /^\/sign(in|up)/i;
  const isRouteToGuard = !!to.fullPath.match(routesRegExpToGuard);

  if (isRouteToGuard && authStore.isSigned) return navigateTo("/");
});
