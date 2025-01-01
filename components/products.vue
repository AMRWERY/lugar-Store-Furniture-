<template>
  <div>
    <div class="mx-auto max-w-7xl">
      <div class="max-w-2xl py-8 mx-auto lg:max-w-none">
        <div class="space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
          <div v-for="card in store.products" :key="card" class="relative group">
            <img :src="card.imgOne"
              class="w-full rounded-lg bg-white object-cover group-hover:opacity-75 max-sm:h-80 sm:aspect-[2/1] lg:aspect-square" />
            <h3 class="mt-6 text-lg font-semibold text-gray-700">
              <nuxt-link to="">
                <span class="absolute inset-0" />
                {{ card.title }}
              </nuxt-link>
            </h3>
            <div class="flex items-center mt-2 space-s-1">
              <p class="text-lg font-semibold text-gray-900">{{ card.discountedPrice }} LE</p>
              <p class="text-sm font-semibold text-gray-500 line-through">{{ card.originalPrice }} LE</p>
            </div>
          </div>
        </div>
      </div>

      <!-- pagination component -->
      <pagination />
    </div>
  </div>
</template>

<script setup>
const store = useNewProductsStoreStore()

onMounted(() => {
  store.fetchProducts();
});
</script>