import { defineStore } from "pinia";
import {
  getDocs,
  collection,
  query,
  getDoc,
  doc,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/config";

export const useNewProductsStoreStore = defineStore("new-products", {
  state: () => ({
    products: [],
    selectedProduct: null,
  }),

  actions: {
    async fetchProducts() {
      try {
        const config = useRuntimeConfig();
        const endpoint = config.public.productsApiEndpoint + "get_products.php";
        const response = await $fetch(endpoint, { responseType: "json" });
        this.products = response;
        // console.log("Fetched products:", this.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },

    async fetchProductsByCategory(categoryId) {
      if (!categoryId) {
        console.error("Category ID is required to fetch products by category");
        return;
      }
      try {
        const querySnap = await getDocs(
          query(
            collection(db, "products"),
            where("categoryId", "==", categoryId)
          )
        );
        const filteredProducts = querySnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        this.products = filteredProducts;
      } catch (error) {
        console.error("Error fetching products by category:", error);
      }
    },

    async fetchProductDetail(productId) {
      if (!productId) {
        // console.error("Product ID is missing or invalid");
        return null;
      }
      try {
        const config = useRuntimeConfig();
        const endpoint =
          config.public.productsApiEndpoint +
          "get_product.php?id=" +
          encodeURIComponent(productId);
        const response = await $fetch(endpoint, { responseType: "json" });
        if (response) {
          this.selectedProduct = response;
          console.log("Fetched product details:", response);
        } else {
          console.error(`product with ID ${productId} not found.`);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
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
