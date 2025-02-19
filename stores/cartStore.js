import { db } from "@/firebase/config";
import {
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: [],
    isLoading: false,
  }),

  actions: {
    fetchCart() {
      this.isLoading = true;
      const cartRef = collection(db, "cart");
      getDocs(cartRef)
        .then((querySnapshot) => {
          this.cart = querySnapshot.docs.map((doc) => ({
            docId: doc.id,
            ...doc.data(),
            quantity: doc.data().quantity || 1,
          }));
          // console.log('cart data', this.cart)
        })
        .catch((error) => {
          console.error("Error fetching cart:", error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    addToCart(
      id,
      title,
      titleAr,
      discountedPrice,
      originalPrice,
      imgOne,
      categoryId,
      subCategoryId,
      discount,
      quantity
    ) {
      if (this.cart.length === 0) {
        this.fetchCart();
      }
      const existingProduct = this.cart.find((item) => item.productId === id);
      if (existingProduct) {
        const docRef = doc(db, "cart", existingProduct.docId);
        const newQuantity = (existingProduct.quantity || 0) + quantity;
        updateDoc(docRef, { quantity: newQuantity })
          .then(() => {
            existingProduct.quantity = newQuantity;
          })
          .catch((error) => {
            console.error(
              "Error updating product quantity in Firestore:",
              error
            );
          });
      } else {
        const product = {
          productId: id,
          title,
          titleAr,
          discountedPrice,
          originalPrice,
          imgOne,
          categoryId,
          subCategoryId,
          discount,
          quantity,
        };
        addDoc(collection(db, "cart"), product)
          .then((docRef) => {
            this.cart.push({
              docId: docRef.id,
              ...product,
            });
          })
          .catch((error) => {
            console.error("Error adding new product to Firestore:", error);
          });
      }
    },

    removeFromCart(docId) {
      if (!docId) {
        return;
      }
      const docRef = doc(db, "cart", docId);
      deleteDoc(docRef)
        .then(() => {
          if (Array.isArray(this.cart)) {
            this.cart = this.cart.filter((item) => item.docId !== docId);
          } else {
            console.error("Cart is not an array:", this.cart);
          }
        })
        .catch((error) => {
          console.error("Error removing from cart:", error);
        });
    },

    updateQuantityInCart(productId, newQuantity) {
      const product = this.cart.find((item) => item.productId === productId);
      if (product) {
        const docRef = doc(db, "cart", product.docId);
        updateDoc(docRef, { quantity: newQuantity })
          .then(() => {
            product.quantity = newQuantity;
          })
          .catch((error) => {
            console.error(
              "Error updating product quantity in Firestore:",
              error
            );
          });
      }
    },

    clearCart() {
      const cartRef = collection(db, "cart");
      getDocs(cartRef)
        .then((querySnapshot) => {
          const deletePromises = querySnapshot.docs.map((doc) =>
            deleteDoc(doc.ref)
          );
          Promise.all(deletePromises)
            .then(() => {
              this.cart = [];
            })
            .catch((error) => {
              console.error("Error clearing cart from Firestore:", error);
            });
        })
        .catch((error) => {
          console.error("Error fetching cart for clearing:", error);
        });
    },
  },

  getters: {
    isInCart: (state) => (productId) => {
      return state.cart.some((item) => item.productId === productId);
    },
  },
});
