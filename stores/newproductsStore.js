import { defineStore } from "pinia";
import { getDocs, collection, query, getDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/config";

export const useNewProductsStoreStore = defineStore("new-products", {
  state: () => ({
    products: [],
    selectedProduct: null,
  }),

  actions: {
    async fetchProducts() {
      try {
        const querySnap = await getDocs(query(collection(db, "products")));
        const allProducts = querySnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // this.products = allProducts.filter(
        //   (product) =>
        //     product.subCategoryTitle === "Top Seller" ||
        //     product.subCategoryTitle === "Customer Choice" ||
        //     product.subCategoryTitle === "New Products"
        // );
        this.products = allProducts;
        // console.log(this.products)
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },

    async fetchProductDetail(productId) {
      if (!productId) {
        // console.error("Product ID is missing or invalid");
        return null;
      }
      try {
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const product = { ...docSnap.data(), id: productId };
          this.selectedProduct = product;
          return product;
        } else {
          // console.error("No product found for ID:", productId);
          this.selectedProduct = null;
          return null;
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
        return null;
      }
    },
  },

  getters: {
    inStockProducts() {
      return this.products.filter(
        (product) => product.availability === "In stock"
      ).length;
    },
  },
});
