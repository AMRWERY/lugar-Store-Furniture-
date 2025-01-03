import { defineStore } from "pinia";
import { db } from "@/firebase/config";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export const useCategoriesStore = defineStore("categoriesStore", {
  state: () => ({
    categories: [],
    subCategories: [],
    paginatedCategories: [],
    paginatedSubcategories: [],
    currentPage: 1,
    categoriesPerPage: 4,
    subcategoriesPerPage: 4,
    currentCategory: null,
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

    async fetchCategoryDetails(categoryId) {
      try {
        const querySnapshot = await getDocs(collection(db, "categories"));
        const category = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .find((cat) => cat.id === categoryId);
        if (category) {
          this.currentCategory = category;
        } else {
          console.error(`Category with ID ${categoryId} not found.`);
        }
      } catch (error) {
        console.error("Error fetching category details:", error);
      }
    },

    async updateCategory(categoryId, updatedData) {
      try {
        const categoryDoc = doc(db, "categories", categoryId);
        await updateDoc(categoryDoc, updatedData);
      } catch (error) {
        // console.error("Error updating category:", error);
        throw error;
      }
    },

    async addCategory(title, imgOne) {
      try {
        const docRef = await addDoc(collection(db, "categories"), {
          title,
          imgOne,
        });
        const newCategory = { id: docRef.id, title, imgOne };
        this.categories.push(newCategory);
        // console.log("Category added:", newCategory);
      } catch (error) {
        console.error("Error adding category:", error);
      }
    },

    async deleteCategory(categoryId) {
      try {
        const categoryDoc = doc(db, "categories", categoryId);
        await deleteDoc(categoryDoc);
        this.categories = this.categories.filter(
          (category) => category.id !== categoryId
        );
        this.updatePagination();
      } catch (error) {
        console.error("Error deleting category:", error);
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
