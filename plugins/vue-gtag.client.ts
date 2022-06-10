import VueGtag from "vue-gtag-next";

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: "G-4FW3ZNP50P",
    },
  });

  return {
    provide: {
      gtag: (window as unknown as { gtag: GTagFunction }).gtag,
    },
  };
});
