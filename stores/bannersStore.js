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
          fileUrl: doc.data().fileUrl,
          // ...doc.data(),
          // visible: false,
          visible: doc.data().visible ?? false,
          selected: doc.data().selected ?? false,
          // selected: false,
        }));
        this.banners = bannerList;
        console.log("banners store", this.banners);
        this.updatePagination();
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    },

   async addNewBanner(file) {
      const formData = new FormData();
      const timestamp = Date.now();
      const fileExtension = file.name.split(".").pop();
      const newFileName = `${file.name.replace(
        `.${fileExtension}`,
        ""
      )}_${timestamp}.${fileExtension}`;
      formData.append("fileToUpload", file, newFileName);
        return  $fetch("https://lugarstore.com/upload.php", {
        method: "POST",
        body: formData,
      })
        
    },
 

  async uploadImageToBannerCollection(file) {
      this.banners.push(file);
      const bannerRef = collection(db, "banners");
      // console.log("Preparing to add to Firestore...");
      return addDoc(bannerRef, {
        fileUrl: file,
        timestamp: new Date(),
        visible: false,
        selected: false,
      });
    },

    toggleVisibility(bannerId) {
      debugger
      const banner = this.banners.find((banner) => banner.id === bannerId);
      if (banner) {
        banner.visible = !banner.visible;
        const bannerRef = doc(db, "banners", banner.id);
        updateDoc(bannerRef, { visible: banner.visible }).then(() => {

        });
      }
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
