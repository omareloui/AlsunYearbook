import VueGtag from "vue-gtag-next";

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: "G-MD040L0DB2",
    },
  });

  return {
    provide: {
      gtag: (window as unknown as { gtag: GTagFunction }).gtag,
    },
  };
});
