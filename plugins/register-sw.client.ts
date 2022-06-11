export default defineNuxtPlugin(() => {
  if (!("serviceWorker" in navigator)) return;
  if (useRuntimeConfig().public.isProd)
    navigator.serviceWorker.register("/sw.js");
});
