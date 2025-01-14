import { defineStore } from "pinia";

export const useBannersStore = defineStore("banners", {
  state: () => ({
    banners: [],
  }),

  actions: {
    async addNewBanner(file) {
      try {
        const formData = new FormData();
        const timestamp = Date.now();
        const fileExtension = file.name.split(".").pop();
        const newFileName = `${file.name.replace(
          `.${fileExtension}`,
          ""
        )}_${timestamp}.${fileExtension}`;
        formData.append("fileToUpload", file, newFileName);
        const createBanner = await $fetch("https://lugarstore.com/upload.php", {
          method: "POST",
          body: formData,
        });
        // console.log("Full server response:", createBanner);
        if (createBanner.success) {
          this.banners.push(createBanner.file_url);
          // console.log("banners", this.banners);
        } else {
          console.error(
            "Upload failed:",
            createBanner.message || "Unknown error."
          );
        }
      } catch (error) {
        console.error("Error during upload:", error);
      }
    },
  },

  getters: {},
});
