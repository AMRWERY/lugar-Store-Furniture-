import { defineStore } from "pinia";
import { db } from "@/firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";

export const useBannersStore = defineStore("banners", {
  state: () => ({
    banners: [],
    paginatedBanners: [],
    currentPage: 1,
    bannersPerPage: 4,
  }),

  actions: {
    fetchBanners() {
      const bannerRef = collection(db, "banners");
      const q = query(bannerRef, orderBy("timestamp", "desc"));
      return getDocs(q)
        .then((bannerSnapshot) => {
          const bannerList = bannerSnapshot.docs.map((doc) => ({
            id: doc.id,
            fileUrl: doc.data().fileUrl,
            visible: doc.data().visible ?? false,
            selected: doc.data().selected ?? false,
          }));
          this.banners = bannerList;
          this.updatePagination();
        })
        .catch((error) => {
          console.error("Error fetching banners:", error);
        });
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
      return $fetch("https://lugarstore.com/upload.php", {
        method: "POST",
        body: formData,
      });
    },

    uploadImageToBannerCollection(file) {
      // this.banners.push(file);
      const bannerRef = collection(db, "banners");
      return addDoc(bannerRef, {
        fileUrl: file,
        timestamp: new Date(),
        visible: false,
        selected: false,
      });
    },

    toggleVisibility(bannerId) {
      const banner = this.banners.find((banner) => banner.id === bannerId);
      if (banner) {
        banner.visible = !banner.visible;
        banner.selected = !banner.selected;
        const bannerRef = doc(db, "banners", bannerId);
        updateDoc(bannerRef, {
          visible: banner.visible,
          selected: banner.selected,
        }).catch((error) => {
          console.error("Error updating visibility:", error);
          banner.visible = !banner.visible;
          banner.selected = !banner.selected;
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
