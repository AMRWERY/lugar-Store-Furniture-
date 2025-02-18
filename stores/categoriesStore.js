export const useCategoriesStore = defineStore("categoriesStore", {
  state: () => ({
    categories: [],
    subCategories: [],
    paginatedCategories: [],
    paginatedSubcategories: [],
    currentPage: 1,
    categoriesPerPage: 5,
    subcategoriesPerPage: 6,
    currentCategory: null,
    currentMarketCategory: null,
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
        this.updatePagination();
        // console.log("Fetched categories:", this.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },

    async fetchCategoryDetails(categoryId) {
      try {
        const config = useRuntimeConfig();
        const endpoint =
          config.public.categoriesApiEndpoint +
          "get_category.php?id=" +
          encodeURIComponent(categoryId);
        const response = await $fetch(endpoint, { responseType: "json" });
        if (response) {
          // Assuming the API returns the category object
          this.currentCategory = response;
          // console.log("Fetched category details:", response);
        } else {
          console.error(`Category with ID ${categoryId} not found.`);
        }
      } catch (error) {
        console.error("Error fetching category details:", error);
      }
    },

    async updateCategory(categoryId, updatedData) {
      try {
        const config = useRuntimeConfig();
        const endpoint =
          config.public.categoriesApiEndpoint + "update_category.php";
        const response = await $fetch(endpoint, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: categoryId, ...updatedData }),
          responseType: "json",
        });
        if (response.success) {
          const index = this.categories.findIndex(
            (category) => category.id === categoryId
          );
          if (index !== -1) {
            this.categories[index] = {
              ...this.categories[index],
              ...updatedData,
            };
          }
          // console.log("Category updated successfully");
        } else {
          console.error(
            "API error during update:",
            response.error || response.message || response
          );
        }
      } catch (error) {
        console.error("Error updating category:", error);
        throw error;
      }
    },

    async addCategory(title, titleAr, imgOne) {
      try {
        const config = useRuntimeConfig();
        const endpoint =
          config.public.categoriesApiEndpoint + "add_category.php";
        const response = await $fetch(endpoint, {
          method: "POST",
          body: { title, titleAr, imgOne },
          responseType: "json",
        });
        const newCategory = { id: response.id, title, titleAr, imgOne };
        this.categories.push(newCategory);
        this.updatePagination();
        // console.log("Category added:", newCategory);
      } catch (error) {
        console.error("Error adding category:", error);
      }
    },

    async deleteCategory(categoryId) {
      try {
        const config = useRuntimeConfig();
        const endpoint =
          config.public.categoriesApiEndpoint + "delete_category.php";
        const response = await $fetch(endpoint, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: categoryId }),
          responseType: "json",
        });
        if (response.success) {
          this.categories = this.categories.filter(
            (category) => category.id !== categoryId
          );
          this.updatePagination();
          // console.log("Category deleted successfully");
        } else {
          console.error(
            "API error during deletion:",
            response.error || response.message || response
          );
        }
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    },

    async fetchSubCategories() {
      try {
        const config = useRuntimeConfig();
        const endpoint =
          config.public.subCategoriesApiEndpoint + "get_subcategories.php";
        const response = await $fetch(endpoint, { responseType: "json" });
        this.subCategories = response;
        this.updatePagination();
        // console.log("Fetched sub categories:", this.subCategories);
      } catch (error) {
        console.error("Error fetching sub categories:", error);
      }
    },

    async updateMarketCategory(categoryId, updatedData) {
      try {
        const config = useRuntimeConfig();
        const endpoint =
          config.public.subCategoriesApiEndpoint + "update_subcategory.php";
        const response = await $fetch(endpoint, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: categoryId, ...updatedData }),
          responseType: "json",
        });
        if (response.success) {
          const index = this.categories.findIndex(
            (category) => category.id === categoryId
          );
          if (index !== -1) {
            this.subCategories[index] = {
              ...this.subCategories[index],
              ...updatedData,
            };
          }
          // console.log("sub Category updated successfully");
        } else {
          console.error(
            "API error during update:",
            response.error || response.message || response
          );
        }
      } catch (error) {
        console.error("Error updating category:", error);
        throw error;
      }
    },

    async fetchCMarketCategoryDetails(marketCategoryId) {
      try {
        const config = useRuntimeConfig();
        const endpoint =
          config.public.subCategoriesApiEndpoint +
          "get_subcategory.php?id=" +
          encodeURIComponent(marketCategoryId);
        const response = await $fetch(endpoint, { responseType: "json" });
        if (Array.isArray(response) && response.length > 0) {
          this.currentMarketCategory = response[0];
        } else {
          this.currentMarketCategory = response;
        }
        // console.log(
        //   "Fetched sub category details:",
        //   this.currentMarketCategory
        // );
      } catch (error) {
        console.error("Error fetching sub category details:", error);
      }
    },

    async deleteMarketCategory(marketCategoryId) {
      try {
        const config = useRuntimeConfig();
        const endpoint =
          config.public.subCategoriesApiEndpoint + "delete_subcategory.php";
        const response = await $fetch(endpoint, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: marketCategoryId }),
          responseType: "json",
        });
        if (response.success) {
          this.subCategories = this.subCategories.filter(
            (marketCategory) => marketCategory.id !== marketCategoryId
          );
          this.updatePagination();
          // console.log("sub Category deleted successfully");
        } else {
          console.error(
            "API error during deletion:",
            response.error || response.message || response
          );
        }
      } catch (error) {
        console.error("Error deleting sub category:", error);
      }
    },

    async addSubCategory(title, titleAr) {
      try {
        const config = useRuntimeConfig();
        const endpoint =
          config.public.subCategoriesApiEndpoint + "create_subcategory.php";
        const response = await $fetch(endpoint, {
          method: "POST",
          body: { title, titleAr },
          responseType: "json",
        });
        const newSubCategory = { id: response.id, title, titleAr };
        this.subCategories.push(newSubCategory);
        this.updatePagination();
        // console.log("sub Category added:", newSubCategory);
      } catch (error) {
        console.error("Error adding sub category:", error);
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
