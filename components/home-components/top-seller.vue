<template>
  <div>
    <div class="mx-auto max-w-7xl">
      <div class="flex items-center justify-center mt-8 mb-3">
        <div class="w-1/12 h-1 border-t-2 border-gray-700"></div>
        <span class="mx-4 text-2xl font-bold leading-10 capitalize">top seller</span>
        <div class="w-1/12 h-1 border-t-2 border-gray-700"></div>
      </div>

      <ClientOnly>
        <Carousel v-bind="config">
          <Slide v-for="card in cards.filter(product => product.subCategoryTitle === 'Top Seller')" :key="card.id">
            <div class="carousel__item">
              <div class="relative flex flex-col w-[300px] max-w-xs overflow-hidden bg-white group">
                <nuxt-link class="relative flex mx-3 mt-3 overflow-hidden h-60 rounded-xl" to="">
                  <div class="relative w-full h-full">
                    <img class="absolute top-0 object-cover w-full h-full transition-all duration-500 ease-in-out end-0"
                      :src="card.imgOne" />
                    <img
                      class="absolute top-0 object-cover w-full h-full transition-all duration-500 ease-in-out opacity-0 end-0 group-hover:opacity-100"
                      :src="card.imgTwo" />
                  </div>
                </nuxt-link>

                <div class="px-5 pb-5 mt-4">
                  <nuxt-link to="" class="capitalize">
                    <h5 class="font-bold tracking-tight truncate text-md text-slate-900">
                      {{ card.title }}
                    </h5>
                  </nuxt-link>
                  <div class="flex flex-col items-center justify-between mt-2 mb-5 font-semibold text-center ms-1">
                    <p class="flex items-center space-s-1">
                      <span class="text-gray-900 me-1">{{
                        card.discountedPrice }} LE</span>
                      <span class="text-sm text-gray-500 line-through">{{
                        card.originalPrice }} LE</span>
                    </p>
                  </div>
                </div>
              </div>
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
const config = {
  itemsToShow: 4,
  wrapAround: true,
  gap: 5,
  snapAlign: "center",
  autoplay: 4000,
  pauseAutoplayOnHover: true,
  breakpoints: {
    200: {
      itemsToShow: 1.5,
      snapAlign: "center",
    },
    400: {
      itemsToShow: 2,
      snapAlign: "start",
    },
    700: {
      itemsToShow: 3,
      snapAlign: "center",
    },
    1024: {
      itemsToShow: 4,
      snapAlign: "start",
    },
  },
};

const store = useNewProductsStoreStore();
const cards = ref([]);

onMounted(async () => {
  await store.fetchProducts();
  cards.value = store.products;
});
</script>