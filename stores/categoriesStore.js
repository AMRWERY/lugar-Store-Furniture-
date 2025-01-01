import { defineStore } from "pinia";
import { db } from "@/firebase/config";
import { collection, getDocs, addDoc } from "firebase/firestore";

export const useCategoriesStore = defineStore("categoriesStore", {
  state: () => ({
    categories: [],
    subCategories: [],
    paginatedCategories: [],
    paginatedSubcategories: [],
    currentPage: 1,
    categoriesPerPage: 4,
    subcategoriesPerPage: 4,
  }),

  actions: {
    async fetchCategories() {
      try {
        const querySnapshot = await getDocs(collection(db, "categories"));
        this.categories = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        this.updatePagination();
        // console.log("Fetched categories:", this.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },

    async fetchSubCategories() {
      try {
        const querySnapshot = await getDocs(collection(db, "subCategories"));
        this.subCategories = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        this.updatePagination();
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    },

    async addCategory(title) {
      try {
        const docRef = await addDoc(collection(db, "categories"), { title });
        const newCategory = { id: docRef.id, title };
        this.categories.push(newCategory);
        // console.log("Category added:", newCategory);
      } catch (error) {
        console.error("Error adding category:", error);
      }
    },

    async addSubCategory(title, imgOne) {
      try {
        const docRef = await addDoc(collection(db, "subCategories"), {
          title,
          imgOne,
        });
        const newSubCategory = { id: docRef.id, title };
        this.subCategories.push(newSubCategory);
        // console.log("Subcategory added:", newSubCategory);
      } catch (error) {
        console.error("Error adding subcategory:", error);
      }
    },

    updatePagination() {
      this.paginatedCategories = this.categories.slice(
        (this.currentPage - 1) * this.categoriesPerPage,
        this.currentPage * this.categoriesPerPage
      );
      this.paginatedSubcategories = this.subCategories.slice(
        (this.currentPage - 1) * this.subcategoriesPerPage,
        this.currentPage * this.subcategoriesPerPage
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
    getSubCategoriesByCategory: (state) => (categoryId) => {
      return state.subCategories.filter(
        (subCategory) => subCategory.categoryId === categoryId
      );
    },

    totalPages() {
      return Math.ceil(this.categories.length / this.categoriesPerPage);
    },

    totalPagesSubcategory() {
      return Math.ceil(this.categories.length / this.subcategoriesPerPage);
    },
  },
});
