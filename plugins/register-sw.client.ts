export default defineNuxtPlugin(async () => {
  if (!("serviceWorker" in navigator)) return;

  if (useRuntimeConfig().public.isProd)
    navigator.serviceWorker.register("/sw.js");
  else {
    const registrations = await navigator.serviceWorker.getRegistrations();
    registrations.forEach(x => x.unregister());
  }
});
