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
    fetchCategories() {
      return getDocs(collection(db, "categories"))
        .then((querySnapshot) => {
          this.categories = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          // console.log("Fetched categories:", this.categories);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    },

    fetchSubCategories() {
      return getDocs(collection(db, "subCategories"))
        .then((querySnapshot) => {
          this.subCategories = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          // console.log("Fetched subcategories:", this.subCategories);
        })
        .catch((error) => {
          console.error("Error fetching subcategories:", error);
        });
    },

    createProduct(productData) {
      const productRef = collection(db, "products");
      return addDoc(productRef, productData).catch((error) => {
        console.error("Error adding product:", error);
        throw error;
      });
    },

    updateProduct(productId, updatedData) {
      const productRef = doc(db, "products", productId);
      return updateDoc(productRef, updatedData)
        .then(() => {
          if (this.products && Array.isArray(this.products)) {
            const index = this.products.findIndex(
              (product) => product.id === productId
            );
            if (index !== -1) {
              this.products[index] = {
                ...this.products[index],
                ...updatedData,
              };
            }
          }
          // console.log("Product updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating product:", error);
          throw error;
        });
    },

    deleteProduct(productId) {
      const productRef = doc(db, "products", productId);
      return deleteDoc(productRef)
        .then(() => {
          if (this.products && Array.isArray(this.products)) {
            this.products = this.products.filter(
              (product) => product.id !== productId
            );
          }
          // console.log("Product deleted successfully");
        })
        .catch((error) => {
          // console.error("Error deleting product:", error);
          throw new Error(
            "Failed to delete the product. Please try again.",
            error
          );
        });
    },
  },
});
