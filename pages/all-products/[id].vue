<template>
  <div>
    <!--breadcrumb component -->
    <breadcrumb />

    <div class="font-[sans-serif] p-4">
      <div class="max-w-xl mx-auto xl:max-w-screen-xl lg:max-w-screen-lg">
        <div class="grid items-start grid-cols-1 gap-8 lg:grid-cols-5 max-lg:gap-12 max-sm:gap-8">
          <div class="top-0 w-full lg:sticky lg:col-span-3">
            <div class="flex flex-row gap-2">
              <div class="flex flex-col w-16 gap-2 space-y-4 max-sm:w-10 shrink-0">
                <img v-for="(image, index) in imageList" :key="index" @click="setSelectedImage(image)" :src="image"
                  alt="Product1"
                  class="aspect-[64/85] object-cover object-top w-full cursor-pointer border-b-2 border-black" />
              </div>
              <div class="relative flex-1">
                <img :src="selectedImage" alt="Product" class="w-full aspect-[750/800] object-top object-cover" />
                <span
                  class="absolute start-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm tracking-wider text-white"
                  v-if="Number(selectedProduct?.discount) > 0">{{
                    selectedProduct?.discount }}% {{ $t('products.off') }}</span>
              </div>
            </div>
          </div>

          <div class="w-full lg:col-span-2">
            <div>
              <h3 class="text-lg font-bold text-gray-800">{{ $i18n.locale === 'ar' ?
                selectedProduct?.titleAr
                :
                selectedProduct?.title }}</h3>
              <div class="flex items-center mt-2 space-s-1">
                <p class="text-sm text-gray-800 !ml-3">{{ selectedProduct?.categoryTitle }}</p>
              </div>
              <div class="flex flex-wrap items-center gap-4 mt-6">
                <h4 class="text-2xl font-bold text-gray-800">{{ selectedProduct?.discountedPrice }}
                  {{ $t('products.le') }}</h4>
                <p class="text-lg text-gray-500 line-through">{{
                  selectedProduct?.originalPrice }} {{ $t('products.le') }}</p>
              </div>
            </div>

            <hr class="my-6 border-gray-300" />

            <div>
              <div>
                <h3 class="text-xl font-bold text-gray-800">{{ $t('products.quantity') }}</h3>
                <div class="flex mt-4 overflow-hidden border divide-x rounded w-max">
                  <button type="button" class="w-12 h-10 font-semibold bg-gray-100" @click="decrementQuantity">
                    <i class="inline m-auto fa-solid fa-minus"></i>
                  </button>
                  <input type="number" v-model="quantity"
                    class="flex items-center justify-center w-12 h-10 text-lg font-semibold text-gray-800 bg-transparent"
                    placeholder="1" />
                  <button type="button" class="w-12 h-10 font-semibold text-white bg-gray-800"
                    @click="incrementQuantity">
                    <i class="inline m-auto fa-solid fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>

            <hr class="my-6 border-gray-300" />

            <div class="flex flex-wrap gap-4 mt-6">
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
          </div>
        </div>
      </div>

      <div class="px-6 py-12 mt-12 bg-gray-100">
        <div class="max-w-screen-lg mx-auto xl:max-w-screen-xl">
          <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div class="space-y-6">
              <h3 class="text-lg font-bold text-gray-800">PRODUCT INFORMATION</h3>
              <div>
                <h3 class="text-sm font-bold text-gray-800">{{ $i18n.locale === 'ar' ?
                  selectedProduct?.descriptionAr
                  :
                  selectedProduct?.description }}</h3>
              </div>
            </div>
          </div>
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
const { t, locale } = useI18n()
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

const productName = computed(() => {
  return selectedProduct.value
    ? locale.value === 'ar'
      ? selectedProduct.value.titleAr
      : selectedProduct.value.title
    : '';
});

useHead({
  title: productName,
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk}`
      : 'Lugar Store';
  }
});
</script>