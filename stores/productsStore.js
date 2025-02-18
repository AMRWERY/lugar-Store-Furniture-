export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [],
    selectedProduct: null,
    categories: [],
    subCategories: [],
    image1Url: "",
    image2Url: "",
  }),

  actions: {
    async createProduct(productData) {
      try {
        const config = useRuntimeConfig();
        const endpoint =
          config.public.productsApiEndpoint + "create_product.php";
        // Call $fetch and then use .then() to process the response.
        $fetch(endpoint, {
          method: "POST",
          body: productData,
          responseType: "json",
        })
          .then((response) => {
            const newProduct = { id: response.id, productData };
            this.products.push(newProduct);
            // console.log("response:", response);
            // console.log("Product added:", newProduct);
          })
          .catch((error) => {
            console.error("Error adding product:", error);
          });
      } catch (error) {
        console.error("Error adding product:", error);
      }
    },

    async updateProduct(productId, updatedData) {
      try {
        const config = useRuntimeConfig();
        const endpoint =
          config.public.productsApiEndpoint + "update_product.php";
        const response = await $fetch(endpoint, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: productId, ...updatedData }),
          responseType: "json",
        });
        if (response.success) {
          const index = this.products.findIndex(
            (product) => product.id === productId
          );
          if (index !== -1) {
            this.products[index] = {
              ...this.products[index],
              ...updatedData,
            };
          }
          // console.log("Product updated successfully");
        } else {
          console.error(
            "API error during update:",
            response.error || response.message || response
          );
        }
      } catch (error) {
        console.error("Error updating product:", error);
        throw error;
      }
    },

    async deleteProduct(productId) {
      try {
        const config = useRuntimeConfig();
        const endpoint =
          config.public.productsApiEndpoint + "delete_product.php";
        const response = await $fetch(endpoint, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: productId }),
          responseType: "json",
        });
        if (response.success) {
          this.products = this.products.filter(
            (product) => product.id !== productId
          );
          // console.log("Product deleted successfully");
          return response;
        } else {
          console.error(
            "API error during deletion:",
            response.error || response.message || response
          );
          throw new Error(response.message || "Deletion failed");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
      }
    },

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
        // console.error("Category ID is required to fetch products by category");
        return;
      }
      try {
        const config = useRuntimeConfig();
        const endpoint = config.public.productsApiEndpoint + "get_products.php";
        const response = await $fetch(endpoint, { responseType: "json" });
        this.products = response.filter(
          (product) => String(product.categoryId) === String(categoryId)
        );
        // console.log("Filtered products:", this.products);
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
          // console.log("Fetched product details:", response);
          return response;
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
