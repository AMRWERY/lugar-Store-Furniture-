<template>
  <div>
    <!--breadcrumb component -->
    <breadcrumb />
    
    <div class="min-h-screen py-8 bg-gradient-to-e from-blue-50 to-purple-50">
      <div class="max-w-6xl px-4 mx-auto">
        <h1 class="mb-12 text-4xl font-extrabold text-center text-gray-800">
          {{ $t('products.exclusive_special_offers') }}
        </h1>

        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <nuxt-link v-for="product in hotDeals.products" :key="product.id"
            :to="{ path: `/all-products/${product.id}`, query: { id: product.id } }"
            class="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl">
            <div class="relative">
              <img :src="product.imgOne" alt="product img" class="object-cover w-full h-56" />
              <div class="absolute top-0 px-3 py-1 text-xs font-semibold text-white uppercase bg-red-500 start-0">
                {{ $t('products.special_offer') }}
              </div>
            </div>
            <div class="p-4">
              <h2 class="text-xl font-bold text-gray-700">{{ $i18n.locale === 'ar' ? product.titleAr : product.title }}
              </h2>
              <p class="mt-2">
                <span class="text-gray-500 line-through me-2" v-if="product.originalPrice">
                  {{ product.originalPrice }} {{ $t('products.le') }}
                </span>
                <span class="text-lg font-bold text-green-600">
                  {{ product.discountedPrice }} {{ $t('products.le') }}
                </span>
              </p>
              <button type="button" @click.stop.prevent="handleAddToCart(product)"
                class="w-full py-2 mt-4 text-white transition-colors duration-300 bg-green-600 rounded hover:bg-green-700">
                <div class="flex items-center justify-center" v-if="loadingProductId[product.id]">
                  <span class="text-center me-2">
                    {{ $t('loading_btn.adding_to_cart') }}...
                  </span>
                  <i class="fa-solid fa-spinner fa-spin-pulse"></i>
                </div>
                <span v-else>{{ $t('btn.add_to_cart') }}</span>
              </button>
            </div>
          </nuxt-link>
        </div>
      </div>
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
const hotDeals = useHotDealsProductsStore()
const cartStore = useCartStore();
const { t } = useI18n();
const loadingProductId = ref({});

onMounted(() => {
  hotDeals.fetchHotDealsProducts()
});

const { showToast, toastTitle, toastMessage, toastType, toastIcon, triggerToast } = useToast();

const handleAddToCart = async (product) => {
  if (!product) return;
  try {
    loadingProductId.value[product.id] = true;
    await new Promise(resolve => setTimeout(resolve, 1000));
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

useHead({
  titleTemplate: () => t('head.hot_deals'),
});
</script>