export const useLocaleStore = defineStore("locales", {
  state: () => ({
    locale: "en",
    isOverlayVisible: false,
  }),

  actions: {
    updateLocale(value) {
      this.isOverlayVisible = true;
      this.locale = value;
      if (process.client) {
        localStorage.setItem("locale", value);
      }
      setTimeout(() => {
        this.isOverlayVisible = false;
      }, 3000);
    },

    loadLocale() {
      if (process.client) {
        this.locale = localStorage.getItem("locale") || "en";
      }
    },
  },

  getters: {
    isRTL(state) {
      return state.locale === "ar";
    },
  },
});
