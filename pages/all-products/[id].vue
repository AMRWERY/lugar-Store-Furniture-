<template>
  <div>
    <div class="py-6 bg-white sm:py-8 lg:py-12">
      <div class="max-w-screen-lg px-4 mx-auto">
        <div class="grid gap-8 md:grid-cols-2">
          <div class="space-y-4">
            <div class="relative overflow-hidden bg-gray-100 rounded-lg">
              <img :src="selectedImage" loading="lazy" class="object-cover object-center w-full h-full" />
              <span class="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm tracking-wider text-white"
                v-if="Number(selectedProduct?.discount) > 0">{{
                  selectedProduct?.discount }}% {{ $t('products.off') }}</span>
            </div>
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

          <div class="md:py-8">
            <div class="mb-2 md:mb-3">
              <span class="mb-0.5 inline-block text-gray-500">{{ selectedProduct?.categoryTitle }}</span>
              <h2 class="text-2xl font-bold text-gray-800 lg:text-3xl">{{ $i18n.locale === 'ar' ?
                selectedProduct?.titleAr
                :
                selectedProduct?.title }}</h2>
            </div>

            <div class="mb-4">
              <div class="flex items-end gap-2">
                <span class="text-xl font-bold text-gray-800 md:text-2xl">{{ selectedProduct?.discountedPrice }}
                  {{ $t('products.le') }}</span>
                <span class="mb-0.5 text-red-500 line-through" v-if="selectedProduct?.originalPrice">{{
                  selectedProduct?.originalPrice }} {{ $t('products.le') }}</span>
              </div>
            </div>

            <div class="my-8 me-4">
              <div class="mb-3 text-lg font-semibold text-gray-800">{{ $t('products.quantity') }}</div>
              <div class="w-32">
                <div class="relative flex flex-row w-full h-10 bg-transparent rounded-lg">
                  <button @click="decrementQuantity"
                    class="w-32 h-full text-gray-600 bg-gray-100 border-r outline-none cursor-pointer rounded-s hover:text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    <i class="m-auto fa-solid fa-minus"></i>
                  </button>
                  <input type="number" v-model="quantity"
                    class="flex items-center w-[70px] font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-100 outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-md hover:text-black"
                    placeholder="1" />
                  <button @click="incrementQuantity"
                    class="w-32 h-full text-gray-600 bg-gray-100 border-r outline-none cursor-pointer rounded-e hover:text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    <i class="m-auto fa-solid fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>

            <div class="flex gap-2.5">
              <button @click="handleAddToCart" class="w-[300px] h-10 btn-style flex items-center justify-center">
                <div class="flex items-center justify-center" v-if="loading">
                  <span class="text-center me-2">{{ $t('loading_btn.adding_to_cart') }}...</span>
                  <i class="fa-solid fa-spinner fa-spin-pulse"></i>
                </div>
                <div class="flex items-center" v-else>
                  <span>{{ $t('btn.add_to_cart') }}</span>
                  <i class="fa-solid fa-cart-plus ms-2"></i>
                </div>
              </button>
            </div>

            <div class="mt-10 md:mt-16 lg:mt-20">
              <div class="mb-3 text-lg font-semibold text-gray-800">{{ $t('products.description') }}</div>
              <p class="text-gray-500">
                {{ $i18n.locale === 'ar' ? selectedProduct?.descriptionAr : selectedProduct?.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- dynamic-toast component  -->
      <div class="fixed z-50 pointer-events-none bottom-5 start-5 w-96">
        <div class="pointer-events-auto">
          <dynamic-toast v-if="showToast" :title="toastTitle" :message="toastMessage" :toastType="toastType"
            :duration="5000" :toastIcon="toastIcon" @toastClosed="showToast = false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const config = {
  itemsToShow: 3,
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
      itemsToShow: 3,
      snapAlign: 'start',
    },
  },
};

const store = useProductsStore()
const route = useRoute()
const selectedImage = ref('');

const selectedProduct = computed(() => {
  return store.products.find((product) => product.id === route.params.id);
});

onMounted(() => {
  const productId = route.query.id;
  if (productId) {
    if (!store.products.length) {
      store.fetchProducts();
    }
    selectedProduct.value = store.products.find((product) => product.id === productId);
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

const cartStore = useCartStore();
const itemAdded = ref('')
const { t } = useI18n()
const loading = ref(false);

const isInCart = computed(() =>
  cartStore.isInCart(store.selectedProduct?.id)
);

const { showToast, toastTitle, toastMessage, toastType, toastIcon, triggerToast } = useToast()

const handleAddToCart = async () => {
  const product = selectedProduct.value;
  if (!product) {
    // console.error("No selected product available.");
    return;
  }
  try {
    loading.value = true;
    await cartStore.addToCart(
      product.id,
      product.title,
      product.titleAr,
      product.discountedPrice,
      product.originalPrice,
      product.imgOne,
      product.categoryId,
      product.subCategoryId,
      // product.categoryTitle,
      // product.subCategoryTitle,
      product.discount,
      quantity.value,
    );
    itemAdded.value = "Product added to cart!";
    setTimeout(() => (itemAdded.value = ""), 3000);
    triggerToast({
      title: t('toast.great'),
      message: t('toast.item_added_to_your_cart'),
      type: 'success',
      icon: 'clarity:shopping-cart-line',
    });
  } catch (error) {
    console.error("Error adding product to cart:", error);
  } finally {
    loading.value = false;
  }
};

const quantity = ref(1);

const incrementQuantity = () => {
  quantity.value++;
  updateQuantityInStore(quantity.value);
};

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
    updateQuantityInStore(quantity.value);
  }
};

const updateQuantityInStore = (newQuantity) => {
  const productId = store.selectedProduct?.id;
  if (productId) {
    cartStore.updateQuantityInCart(productId, newQuantity);
  }
};
</script>