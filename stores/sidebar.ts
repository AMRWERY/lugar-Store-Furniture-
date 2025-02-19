import { useStorage } from "@vueuse/core";

export const useSidebarStore = defineStore("sidebar", () => {
  const isSidebarOpen = ref(false);
  const selected = useStorage("selected", ref("eCommerce"));
  const page = useStorage("page", ref("Dashboard"));

  function toggleSidebar() {
    isSidebarOpen.value = !isSidebarOpen.value;
  }

  return { isSidebarOpen, toggleSidebar, selected, page };
});
