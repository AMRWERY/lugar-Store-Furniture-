<template>
  <div>
    <div class="min-h-screen py-8 bg-gradient-to-e from-blue-50 to-purple-50">
      <div class="max-w-6xl px-4 mx-auto">
        <h1 class="mb-12 text-4xl font-extrabold text-center text-gray-800">
          {{ $t('products.exclusive_special_offers') }}
        </h1>

        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <nuxt-link v-for="product in hotDeals.products" :key="product.id" to=""
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
              <button
                class="w-full py-2 mt-4 text-white transition-colors duration-300 bg-green-600 rounded hover:bg-green-700">
                {{ $t('btn.add_to_cart') }}
              </button>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const hotDeals = useHotDealsProductsStore()

onMounted(() => {
  hotDeals.fetchHotDealsProducts()
});
</script>