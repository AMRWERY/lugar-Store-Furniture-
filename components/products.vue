<template>
  <div>
    <div class="mx-auto max-w-7xl">
      <div v-if="paginatedProducts.length === 0">
        <!-- skeleton-loader component -->
        <skeleton-loader />
      </div>

      <div class="max-w-2xl py-8 mx-auto lg:max-w-none" v-else>
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          <!-- Loop over products -->
          <nuxt-link v-for="product in paginatedProducts" :key="product.id" :to="`/all-products/${product.id}`"
            class="relative w-full max-w-xs m-10 overflow-hidden bg-white rounded-lg shadow-md">
            <!-- Fixed-height image container -->
            <div class="relative w-full overflow-hidden h-60">
              <img class="object-cover w-full h-full rounded-t-lg" :src="product.imgOne" alt="product image" />
              <span
                class="absolute top-0 left-0 text-sm text-center text-white -rotate-45 -translate-x-6 translate-y-4 bg-black w-28"
                v-if="Number(product.discount) > 0">
                {{ product.discount }}% {{ $t('products.off') }}
              </span>
            </div>

            <!-- Product details -->
            <div class="px-5 pb-5 mt-4">
              <h5 class="text-xl font-semibold tracking-tight truncate text-slate-900">
                {{ $i18n.locale === 'ar' ? product.titleAr : product.title }}
              </h5>
              <div class="flex items-center justify-between mt-4">
                <p>
                  <span class="text-xl font-bold text-slate-900">
                    {{ product.discountedPrice }} {{ $t('products.le') }}
                  </span>
                  <span class="text-sm line-through text-slate-900" v-if="product.originalPrice">
                    {{ product.originalPrice }} {{ $t('products.le') }}
                  </span>
                </p>
                <button type="button" @click.stop.prevent="handleAddToCart(product)"
                  class="flex items-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                  <div class="flex items-center justify-center" v-if="loadingProductId[product.id]">
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
          </nuxt-link>
        </div>
      </div>

      <!-- pagination component -->
      <pagination :total-pages="totalPages" :current-page="currentPage" @page-changed="onPageChanged" />
    </div>

    <!-- dynamic-toast component -->
    <div class="fixed z-50 pointer-events-none bottom-5 start-5 w-96">
      <div class="pointer-events-auto">
        <dynamic-toast v-if="showToast" :title="toastTitle" :message="toastMessage" :toastType="toastType"
          :duration="5000" :toastIcon="toastIcon" @toastClosed="showToast = false" />
      </div>
    </div>
  </div>
</template>

<script setup>
const store = useProductsStore()
const cartStore = useCartStore();
const route = useRoute();
const loading = ref(true);

onMounted(() => {
  const categoryId = route.query.categoryId;
  loading.value = true;
  if (categoryId) {
    store.fetchProductsByCategory(categoryId)
      .then(() => {
        loading.value = false;
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        loading.value = false;
      });
  } else {
    store.fetchProducts()
      .then(() => {
        loading.value = false;
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        loading.value = false;
      });
  }
});

const currentPage = ref(1);
const perPage = 10;

const filteredProducts = computed(() => {
  return store.products;
});

const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / perPage);
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  const end = start + perPage;
  return filteredProducts.value.slice(start, end);
});

const onPageChanged = (pageNumber) => {
  currentPage.value = pageNumber;
};

const { t } = useI18n();
const loadingProductId = ref({});

const { showToast, toastTitle, toastMessage, toastType, toastIcon, triggerToast } = useToast();

const handleAddToCart = async (product) => {
  if (!product) return;
  try {
    loadingProductId.value[product.id] = true;
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
      1 // Default quantity
    );
    triggerToast({
      title: t('toast.great'),
      message: t('toast.item_added_to_your_cart'),
      type: 'success',
      icon: 'fa-solid fa-cart-shopping',
    });
  } catch (error) {
    console.error("Error adding product to cart:", error);
  } finally {
    loadingProductId.value[product.id] = false;
  }
};
</script>