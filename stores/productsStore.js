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

export const useProductsStore = defineStore("products", {
  state: () => ({
    categories: [],
    subCategories: [],
    image1Url: "",
    image2Url: "",
  }),

  actions: {
    async fetchCategories() {
      try {
        const querySnapshot = await getDocs(collection(db, "categories"));
        this.categories = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
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
        // console.log("Fetched subcategories:", this.subCategories);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    },

    async createProduct(productData) {
      try {
        const productRef = collection(db, "products");
        await addDoc(productRef, productData);
      } catch (error) {
        console.error("Error adding product:", error);
      }
    },

    async updateProduct(productId, updatedData) {
      try {
        const productRef = doc(db, "products", productId);
        await updateDoc(productRef, updatedData);
        // console.log("Product updated successfully!");
      } catch (error) {
        console.error("Error updating product:", error);
      }
    },

    async deleteProduct(productId) {
      try {
        const productRef = doc(db, "products", productId);
        await deleteDoc(productRef);
        if (this.products && Array.isArray(this.products)) {
          this.products = this.products.filter(
            (product) => product.id !== productId
          );
        } else {
          // console.warn("Products array is not properly initialized");
        }
        console.log("Product deleted successfully");
      } catch (error) {
        console.error("Error deleting product:", error);
        throw new Error("Failed to delete the product. Please try again.");
      }
    },
  },
});
