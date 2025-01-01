<template>
  <div>
    <section class="py-20 overflow-hidden bg-white font-poppins dark:bg-gray-800">
      <div class="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
        <div class="flex flex-wrap -mx-4">
          <div class="w-full px-4 md:w-1/2">
            <div class="sticky top-0 z-50 overflow-hidden">
              <div class="relative mb-6 lg:mb-10" style="height: 450px">
                <img :src="selectedImage" class="object-contain w-full h-full" />
              </div>
              <div class="flex-wrap hidden md:flex">
                <ClientOnly>
                  <Carousel v-bind="config">
                    <Slide v-for="(image, index) in imageList" :key="index">
                      <div class="carousel__item">
                        <button @click="setSelectedImage(image)" type="button" class="block">
                          <img :src="image" class="object-cover w-full h-32" />
                        </button>
                      </div>
                    </Slide>
                    <template #addons>
                      <Navigation />
                    </template>
                  </Carousel>
                </ClientOnly>
              </div>
            </div>
          </div>
          <div class="w-full px-4 md:w-1/2">
            <div class="lg:ps-20">
              <div class="pb-6 mb-8 border-b border-gray-200 dark:border-gray-700">
                <h2 class="max-w-xl mt-2 mb-6 text-xl font-bold dark:text-gray-300 md:text-4xl">
                  {{ selectedProduct?.title }}
                </h2>
                <p class="max-w-md mb-8 text-gray-700 dark:text-gray-400">
                  {{ selectedProduct?.description }}
                </p>
                <p class="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400">
                  <span>LE {{ selectedProduct?.discountedPrice }}</span>
                  <span class="text-xl font-normal text-gray-500 line-through me-3 dark:text-gray-400">LE {{
                    selectedProduct?.originalPrice }}</span>
                </p>
              </div>
              <div class="mb-8 me-4">
                <div class="w-28">
                  <div class="relative flex flex-row w-full h-10 bg-transparent rounded-lg">
                    <button
                      class="w-20 h-full text-gray-600 bg-gray-100 border-r rounded-l outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-300">
                      <icon name="clarity:minus-line" size="20px" class="m-auto" />
                    </button>
                    <input type="number"
                      class="flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-100 outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-900 focus:outline-none text-md hover:text-black"
                      placeholder="1" />
                    <button
                      class="w-20 h-full text-gray-600 bg-gray-100 border-l rounded-r outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-900 hover:text-gray-700 hover:bg-gray-300">
                      <icon name="clarity:plus-line" size="20px" class="m-auto" />
                    </button>
                  </div>
                </div>
              </div>
              <div class="flex flex-wrap items-center">
                <div class="mb-4 me-4 lg:mb-0">
                  <button
                    class="w-[300px] h-10 p-2 bg-blue-500 me-4 dark:text-gray-200 text-gray-50 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 flex items-center justify-center">
                    Buy Now
                    <icon name="clarity:shopping-cart-line" class="ms-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const config = {
  itemsToShow: 4,
  wrapAround: true,
  breakpoints: {
    200: {
      itemsToShow: 1.5,
      snapAlign: 'center',
    },
    400: {
      itemsToShow: 2,
      snapAlign: 'start',
    },
    700: {
      itemsToShow: 3.5,
      snapAlign: 'center',
    },
    1024: {
      itemsToShow: 4,
      snapAlign: 'start',
    },
  },
};

const store = useNewProductsStoreStore()
const route = useRoute()
const selectedImage = ref('');

const selectedProduct = computed(() =>
  store.products.find((product) => product.id === route.params.id)
);

onMounted(() => {
  if (!store.products.length) {
    store.fetchProducts();
  }
});

const productDetails = ref(null);

watch(() => store.selectedProduct, (newProduct) => {
  if (newProduct) {
    productDetails.value = newProduct;
  }
});

watch(
  () => selectedProduct.value,
  (newProduct) => {
    if (newProduct) {
      selectedImage.value = newProduct.imgOne || "";
    }
  },
  { immediate: true }
);

const imageList = computed(() => {
  if (selectedProduct.value) {
    return [
      selectedProduct.value.imgOne,
      selectedProduct.value.imgTwo,
      selectedProduct.value.imgThree,
      selectedProduct.value.imgFour,
    ].filter(Boolean);
  }
  return [];
});

const setSelectedImage = (image) => {
  selectedImage.value = image;
};
</script>