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
                <span class="text-lg font-medium text-rose-500 dark:text-rose-200">{{ selectedProduct?.categoryTitle
                  }}</span>
                <h2 class="max-w-xl mt-2 mb-6 text-xl font-bold dark:text-gray-300 md:text-4xl">
                  {{ $i18n.locale === 'ar' ? selectedProduct?.titleAr : selectedProduct?.title }}
                </h2>
                <p class="max-w-md mb-8 text-gray-700 dark:text-gray-400">
                  {{ $i18n.locale === 'ar' ? selectedProduct?.descriptionAr : selectedProduct?.description }}
                </p>
                <p class="items-center inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400">
                  <span>LE {{ selectedProduct?.discountedPrice }}</span>
                  <span class="text-lg font-normal text-gray-500 line-through me-3 dark:text-gray-400">LE {{
                    selectedProduct?.originalPrice }}</span>
                </p>
              </div>
              <div class="flex flex-wrap items-center">
                <div class="mb-8 me-4">
                  <div class="w-28">
                    <div class="relative flex flex-row w-full h-10 bg-transparent rounded-lg">
                      <button @click="decrementQuantity"
                        class="flex items-center justify-center w-20 h-full text-gray-600 bg-gray-100 border-r rounded-l outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-300">
                        <icon name="system-uicons:minus" />
                      </button>
                      <input type="number" v-model="quantity"
                        class="flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-100 outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-900 focus:outline-none text-md hover:text-black"
                        placeholder="1" />
                      <button @click="incrementQuantity"
                        class="flex items-center justify-center w-20 h-full text-gray-600 bg-gray-100 border-r rounded-l outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-300">
                        <icon name="system-uicons:plus" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex flex-wrap items-center">
                <div class="mb-4 me-4 lg:mb-0">
                  <button @click="handleAddToCart"
                    class="w-[300px] h-10 p-2 bg-blue-500 me-4 dark:text-gray-200 text-gray-50 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 flex items-center justify-center">
                    <div class="flex items-center justify-center" v-if="loading">
                      <span class="text-center me-2">{{ $t('loading_btn.adding_to_cart') }}...</span>
                      <icon name="svg-spinners:270-ring-with-bg" />
                    </div>
                    <div class="flex items-center" v-else>
                      <span>Buy Now</span>
                      <icon name="clarity:shopping-cart-line" class="ms-2" />
                    </div>
                  </button>
                </div>

                <p v-if="itemAdded" class="mt-2 mb-3 text-sm text-center text-green-500">{{ itemAdded }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore';

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

const selectedProduct = computed(() => {
  return store.products.find((product) => product.id === route.params.id);
});

onMounted(async () => {
  if (!store.products.length) {
    await store.fetchProducts();
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

const showToast = ref(false);
const toastTitle = ref('');
const toastMessage = ref('');
const toastType = ref('');
const toastIcon = ref('')

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
      product.discountedPrice,
      product.originalPrice,
      product.imgOne,
      product.categoryTitle,
      product.subCategoryTitle,
      product.discount,
      quantity.value,
    );
    itemAdded.value = "Product added to cart!";
    setTimeout(() => (itemAdded.value = ""), 3000);
    showToast.value = true;
    toastTitle.value = t('toast.great');
    toastMessage.value = t('toast.item_added_to_your_cart');
    toastType.value = 'success';
    toastIcon.value = 'clarity:shopping-cart-line'
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

const updateQuantityInStore = async (newQuantity) => {
  const productId = store.selectedProduct?.id;
  if (productId) {
    await cartStore.updateQuantityInCart(productId, newQuantity);
  }
};
</script>