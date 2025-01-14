// import { defineStore } from "pinia";

// export const useBannersStore = defineStore("banners", {
//   state: () => ({
//     banners: [],
//   }),

//   actions: {
//     async addNewBanner(file) {
//       try {
//         const formData = new FormData();
//         formData.append("file", file);
//         console.log(formData)
//         // console.log("Uploading file:", file.name);
//         const response = await $fetch("https://lugarstore.com/upload.php", {
//           method: "POST",
//           body: formData,
//         });
//         const createBanner = await response.json();
//         // console.log("Server response:", createBanner);
//         if (response.ok && createBanner.success) {
//           this.banners.push(createBanner.file_url);
//         } else {
//           console.error("Upload failed:", createBanner.message);
//         }
//       } catch (error) {
//         console.error("Error uploading banner:", error);
//       }
//     },
//   },

//   getters: {},
// });

import { defineStore } from "pinia";

export const useBannersStore = defineStore("banners", {
  state: () => ({
    banners: [],
  }),

  actions: {
    async addNewBanner(file) {
      try {
        const formData = new FormData();
        formData.append("fileToUpload", file);
        // console.log("Uploading file:", file.name);
        const createBanner = await $fetch("https://lugarstore.com/upload.php", {
          method: "POST",
          body: formData,
        });
        console.log("Full server response:", createBanner);
        if (createBanner.success) {
          this.banners.push(createBanner.file_url);
          // console.log(createBanner.file_url);
          console("banners", this.banners);
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
