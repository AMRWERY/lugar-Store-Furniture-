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
    addNewBanner(file) {
      const formData = new FormData();
      const timestamp = Date.now();
      const fileExtension = file.name.split(".").pop();
      const newFileName = `${file.name.replace(
        `.${fileExtension}`,
        ""
      )}_${timestamp}.${fileExtension}`;
      formData.append("fileToUpload", file, newFileName);
      $fetch("https://lugarstore.com/upload.php", {
        method: "POST",
        body: formData,
      })
        .then((createBanner) => {
          console.log("Full server response:", createBanner);
          const fileUrl = createBanner.file_url.replace(/\\/g, "");
          console.log("Clean File URL:", fileUrl);
          if (createBanner && createBanner.success && createBanner.file_url) {
            this.banners.push(fileUrl);
            const bannerRef = collection(db, "banners");
            console.log("Preparing to add to Firestore...");
            return addDoc(bannerRef, {
              fileUrl: fileUrl,
              timestamp: new Date(),
            });
          } else {
            console.error("Unexpected server response:", createBanner);
            throw new Error(
              createBanner.message || "Invalid response from server."
            );
          }
        })
        .then((docRef) => {
          console.log("Banner saved to Firestore with ID:", docRef.id);
        })
        .catch((error) => {
          console.error("Error during upload or saving:", error);
        });
    },
  },

  getters: {},
});
