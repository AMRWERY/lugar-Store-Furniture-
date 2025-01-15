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
    paginatedBanners: [],
    currentPage: 1,
    bannersPerPage: 4,
  }),

  actions: {
    async fetchBanners() {
      try {
        const bannerRef = collection(db, "banners");
        const bannerSnapshot = await getDocs(bannerRef);
        const bannerList = bannerSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        this.banners = bannerList;
        this.updatePagination();
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    },

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
          // debugger;
          // console.log("type of:", typeof createBanner);
          let response = JSON.parse(createBanner);
          if (response && response?.success && response?.file_url) {
            this.banners.push(response?.file_url);
            const bannerRef = collection(db, "banners");
            // console.log("Preparing to add to Firestore...");
            return addDoc(bannerRef, {
              fileUrl: response?.file_url,
              timestamp: new Date(),
            });
          }
        })
        // .then((docRef) => {
        //   console.log("Banner saved to Firestore with ID:", docRef.id);
        // })
        .catch((error) => {
          console.error("Error during upload or saving:", error);
        });
    },

    updatePagination() {
      this.paginatedBanners = this.banners.slice(
        (this.currentPage - 1) * this.bannersPerPage,
        this.currentPage * this.bannersPerPage
      );
    },

    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
        this.updatePagination();
      }
    },
  },

  getters: {
    totalPages() {
      return Math.ceil(this.banners.length / this.bannersPerPage);
    },
  },
});
