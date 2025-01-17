<template>
  <div>
    <div class="mx-auto max-w-7xl">

      <!-- <div v-if="loading" class="flex justify-center py-8">
        <icon name="svg-spinners:blocks-scale" class="w-24 h-24 text-gray-600" />
      </div> -->

      <div v-if="paginatedProducts.length === 0">
        <!-- skeleton-loader component -->
        <skeleton-loader />
      </div>

      <div class="max-w-2xl py-8 mx-auto lg:max-w-none" v-else>
        <div
          class="grid space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 sm:grid-cols-1 md:grid-cols-2 sm:gap-4 lg:space-y-0">
          <nuxt-link to="" v-for="product in paginatedProducts" :key="product.id"
            class="relative flex flex-col w-full max-w-xs overflow-hidden bg-white border border-gray-100 rounded-lg shadow-md">
            <nuxt-link class="relative flex mx-3 mt-3 overflow-hidden h-60 rounded-xl"
              :to="`/all-products/${product.id}`">
              <img class="absolute top-0 object-cover w-full h-full end-0 peer" :src="product.imgOne" />
              <img
                class="absolute top-0 object-cover w-full h-full transition-all duration-1000 delay-100 peer -end-96 hover:end-0 peer-hover:end-0"
                :src="product.imgTwo" />
              <span
                class="absolute top-0 px-2 m-2 text-sm font-medium text-center text-white bg-black rounded-full start-0"
                v-if="product.discount">{{
                  product.discount }}%
                {{ $t('products.off') }}</span>
            </nuxt-link>
            <div class="px-5 pb-5 mt-4">
              <nuxt-link to="">
                <h5 class="text-xl tracking-tight text-slate-900">
                  {{ $i18n.locale === 'ar' ? product.titleAr :
                    product.title }}
                </h5>
              </nuxt-link>
              <div class="flex items-center justify-between mt-2 mb-5">
                <p class="space-s-2">
                  <span class="text-lg font-bold text-slate-900">{{ product.discountedPrice }} {{ $t('products.le')
                    }}</span>
                  <span class="text-sm line-through text-slate-900" v-if="product.originalPrice">{{
                    product.originalPrice }} {{ $t('products.le')
                    }}</span>
                </p>
              </div>
              <button type="button" @click="handleAddToCart(product)"
                class="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 w-full">
                <div class="flex items-center justify-center" v-if="loadingProductId === product.id">
                  <span class="text-center me-2">{{ $t('loading_btn.adding_to_cart') }}...</span>
                  <icon name="svg-spinners:270-ring-with-bg" />
                </div>
                <div class="flex items-center" v-else>
                  <icon name="clarity:shopping-cart-line" class="w-6 h-6 me-2" />
                  <span>{{ $t('btn.add_to_cart') }}</span>
                </div>
              </button>
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
import { useCartStore } from '@/stores/cartStore';

const store = useNewProductsStoreStore()
const cartStore = useCartStore();
const route = useRoute();
const loading = ref(true);

onMounted(async () => {
  const categoryId = route.query.categoryId;
  loading.value = true;
  try {
    if (categoryId) {
      await store.fetchProductsByCategory(categoryId);
    } else {
      await store.fetchProducts();
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  } finally {
    loading.value = false;
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
const loadingProductId = ref(null);

const { showToast, toastTitle, toastMessage, toastType, toastIcon, triggerToast } = useToast();

const handleAddToCart = async (product) => {
  if (!product) return;
  try {
    loadingProductId.value = product.id;
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
      icon: 'clarity:shopping-cart-line',
    });
  } catch (error) {
    console.error("Error adding product to cart:", error);
  } finally {
    loadingProductId.value = null;
  }
};
</script>