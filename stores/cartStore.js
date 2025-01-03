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

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: [],
    isLoading: false,
  }),

  actions: {
    async fetchCart() {
      this.isLoading = true;
      try {
        const cartRef = collection(db, "cart");
        const querySnapshot = await getDocs(cartRef);
        this.cart = querySnapshot.docs.map((doc) => ({
          docId: doc.id,
          ...doc.data(),
          quantity: doc.data().quantity || 1,
        }));
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        this.isLoading = false;
      }
    },

    async addToCart(
      id,
      title,
      titleAr,
      discountedPrice,
      originalPrice,
      imgOne,
      categoryTitle,
      subCategoryTitle,
      discount,
      quantity
    ) {
      if (this.cart.length === 0) {
        await this.fetchCart();
      }
      const existingProduct = this.cart.find((item) => item.productId === id);
      if (existingProduct) {
        try {
          const docRef = doc(db, "cart", existingProduct.docId);
          const newQuantity = (existingProduct.quantity || 0) + quantity;
          await updateDoc(docRef, { quantity: newQuantity });
          existingProduct.quantity = newQuantity; // Update local cart state
        } catch (error) {
          console.error("Error updating product quantity in Firestore:", error);
        }
      } else {
        const product = {
          productId: id,
          title,
          titleAr,
          discountedPrice,
          originalPrice,
          imgOne,
          categoryTitle,
          subCategoryTitle,
          discount,
          quantity,
        };
        try {
          const docRef = await addDoc(collection(db, "cart"), product);
          this.cart.push({
            docId: docRef.id,
            ...product,
          });
        } catch (error) {
          console.error("Error adding new product to Firestore:", error);
        }
      }
    },

    async removeFromCart(docId) {
      if (!docId) {
        //   console.error("No docId provided to remove from cart.");
        return;
      }
      try {
        const docRef = doc(db, "cart", docId);
        await deleteDoc(docRef);
        if (Array.isArray(this.cart)) {
          this.cart = this.cart.filter((item) => item.docId !== docId);
        } else {
          console.error("Cart is not an array:", this.cart);
        }
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    },

    async updateQuantityInCart(productId, newQuantity) {
      const product = this.cart.find((item) => item.productId === productId);
      if (product) {
        try {
          const docRef = doc(db, "cart", product.docId);
          await updateDoc(docRef, { quantity: newQuantity });
          product.quantity = newQuantity;
        } catch (error) {
          console.error("Error updating product quantity in Firestore:", error);
        }
      }
    },

    async clearCart() {
      try {
        const cartRef = collection(db, "cart");
        const querySnapshot = await getDocs(cartRef);
        const deletePromises = querySnapshot.docs.map((doc) => {
          return deleteDoc(doc.ref);
        });
        await Promise.all(deletePromises);
        this.cart = [];
      } catch (error) {
        console.error("Error clearing cart from Firestore:", error);
      }
    },
  },

  getters: {
    isInCart: (state) => (productId) => {
      return state.cart.some((item) => item.productId === productId);
    },
  },
});
