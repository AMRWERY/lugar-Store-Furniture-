export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [],
    categories: [],
    subCategories: [],
    image1Url: "",
    image2Url: "",
  }),

  actions: {
    async fetchCategories() {
      try {
        const config = useRuntimeConfig();
        const endpoint =
          config.public.categoriesApiEndpoint + "get_categories.php";
        const response = await $fetch(endpoint, { responseType: "json" });
        this.categories = response.data || response;
        console.log("Fetched categories:", this.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },

    async fetchSubCategories() {
      try {
        const config = useRuntimeConfig();
        const endpoint =
          config.public.subCategoriesApiEndpoint + "get_subcategories.php";
        const response = await $fetch(endpoint, { responseType: "json" });
        this.subCategories = response;
        // console.log("Fetched sub categories:", this.subCategories);
      } catch (error) {
        console.error("Error fetching sub categories:", error);
      }
    },

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
          console.log("Product updated successfully");
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
        const endpoint = config.public.productsApiEndpoint + "delete_product.php";
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
          console.log("Product deleted successfully");
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
    }
  },
});
