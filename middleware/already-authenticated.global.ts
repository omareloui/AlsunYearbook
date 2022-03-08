export default defineNuxtRouteMiddleware(to => {
  const routesRegExpToGuard = /^\/sign(in|up)/i;
  const isRouteToGuard = !!to.fullPath.match(routesRegExpToGuard);

  if (isRouteToGuard) return navigateTo("/");
});
