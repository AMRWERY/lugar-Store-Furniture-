import { defineStore } from "pinia";
import { db } from "@/firebase/config";
import {
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

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
        console.log("Full server response:", createBanner);
        if (createBanner.success && createBanner.file_url) {
          const fileUrl = createBanner.file_url;
          console.log("File URL:", fileUrl);
          this.banners.push(fileUrl);
          debugger;
          const bannerRef = collection(db, "banners");
          const docRef = await addDoc(bannerRef, {
            fileUrl: fileUrl,
            timestamp: new Date(),
          });
          console.log("Banner saved to Firestore with ID:", docRef.id);
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
