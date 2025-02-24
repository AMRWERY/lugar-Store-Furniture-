<template>
  <div>
    <div class="mx-auto max-w-7xl">

      <div v-if="products.length === 0">
        <!-- skeleton-loader component -->
        <skeleton-loader />
      </div>

      <ClientOnly v-else>
        <Carousel v-bind="carouselConfig">
          <Slide v-for="card in products" :key="card.id">
            <div class="carousel__item">
              
              
                <nuxt-link :to="{ path: `/all-products/${card.id}`, query: { id: card.id } }"
                  class="relative w-full max-w-xl overflow-hidden rounded-lg shadow-md">
                  <!-- Fixed-height image container -->
                  <div class="relative w-full h-auto overflow-hidden">
                    <img class="object-cover w-full h-full rounded-t-lg" :src="card.imgOne" alt="product image" />
                  </div>

                  <!-- Product details -->
                  <div class="px-5 pb-5 mt-4">
                    <h5 class="text-xl font-semibold tracking-tight truncate text-slate-900">
                      {{ $i18n.locale === 'ar' ? card.titleAr :
                        card.title }}
                    </h5>
                    <div class="flex items-center justify-between mt-4">
                      <div class="flex flex-col">
                        <span class="text-xl font-bold text-slate-900">
                          {{ card.discountedPrice }} {{ $t('home.le') }}
                        </span>
                        <span class="text-sm line-through text-slate-900" v-if="card.originalPrice">
                          {{ card.originalPrice }} {{
                            $t('home.le')
                          }}
                        </span>
                      </div>
                      <div>
                        <button type="button" @click.stop.prevent="handleAddToCart(card)"
                          class="flex items-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                          <div class="flex items-center justify-center" v-if="loadingProduct[card.id]">
                            <span class="text-center me-2">
                              {{ $t('loading_btn.adding_to_cart') }}...
                            </span>
                            <i class="fa-solid fa-spinner fa-spin-pulse"></i>
                          </div>
                          <div class="flex items-center" v-else>
                            <i class="fa-solid fa-cart-arrow-down me-2"></i>
                            <span>{{ $t('btn.add_to_cart') }}</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </nuxt-link>
            </div>
          </Slide>

          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup>
const { carouselConfig } = useCarousel();

const props = defineProps({
  categoryTitle: {
    type: String,
    default: ''
  },
  subCategoryTitle: {
    type: String,
    default: ''
  },
});

const productsStore = useProductsStore()
const cartStore = useCartStore();
const products = ref([])
const categoryStore = useCategoriesStore()
const subCategories = ref([])
const selectedSubCategoryId = ref('')
const categories = ref([])
const selectedCategoryId = ref('')
const loadingProduct = ref({});

onMounted(() => {
  if (props.subCategoryTitle) {
    categoryStore.fetchSubCategories()
      .then(() => {
        subCategories.value = categoryStore.subCategories;
        const found = subCategories.value.find(
          (subCat) => subCat.title === props.subCategoryTitle
        );
        selectedSubCategoryId.value = found ? found.id : "";
        return productsStore.fetchProducts();
      })
      .then(() => {
        products.value = productsStore.products.filter(
          (product) => product.subCategoryId === selectedSubCategoryId.value
        );
      })
      .catch(error => {
        console.error("Error in subcategory flow:", error);
      });
  }

  if (props.categoryTitle) {
    categoryStore.fetchCategories()
      .then(() => {
        categories.value = categoryStore.categories;
        const found = categories.value.find(
          (cat) => cat.title == props.categoryTitle
        );
        selectedCategoryId.value = found ? found.id : "";
        return productsStore.fetchProducts();
      })
      .then(() => {
        products.value = productsStore.products.filter(
          (product) => product.categoryId === selectedCategoryId.value
        );
      })
      .catch(error => {
        console.error("Error in category flow:", error);
      });

  }
  if (!props.categoryTitle && !props.subCategoryTitle) {
    // console.log("No category or subcategory title provided.");
  }
});

const quantity = ref(1)

const handleAddToCart = async (product) => {
  if (!product) {
    return
  }
  try {
    loadingProduct.value[product.id] = true;
    await cartStore.addToCart(
      product.id,
      product.title,
      product.titleAr,
      product.discountedPrice,
      product.originalPrice,
      product.imgOne,
      product.categoryId,
      product.subCategoryId,
      product.discount,
      quantity.value
    )
  } catch (error) {
    console.error("Error adding product to cart:", error)
  } finally {
    loadingProduct.value[product.id] = false;
  }
}
</script>