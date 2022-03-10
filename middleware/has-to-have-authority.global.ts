import { useAuthStore } from "~~/store/useAuth";

export default defineNuxtRouteMiddleware(to => {
  // const authStore = useAuthStore();
  // const routesRegExpToGuard = /^\/dashboard/i;
  // const isRouteToGuard = !!to.fullPath.match(routesRegExpToGuard);
  // if (isRouteToGuard && (!authStore.isSigned || !authStore.hasAuthority))
  //   return navigateTo("/");
});
