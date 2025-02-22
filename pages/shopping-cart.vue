<template>
  <div>
    <!--breadcrumb component -->
    <breadcrumb />

    <section class="py-8 dark:bg-gray-900 md:py-7">
      <div class="p-4 space-y-4" v-if="cartStore.cart.length === 0">
        <p class="text-lg font-semibold text-center text-gray-800">{{ $t('cart.your_cart_is_currently_empty') }}</p>
      </div>

      <div class="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div class="flex items-center justify-between">
          <nuxt-link to="/all-products" class="inline-flex items-center text-sm cursor-pointer hover:underline ms-auto">
            {{ $t('cart.continue_shopping') }}
            <i class="fa-solid fa-arrow-right mt-0.5 rtl:rotate-180"></i>
          </nuxt-link>
        </div>

        <div class="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div class="flex-none w-full mx-auto lg:max-w-2xl xl:max-w-4xl">
            <div class="space-y-6">
              <div
                class="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
                v-if="cartStore.cart.length > 0" v-for="item in cartStore.cart" :key="item.id">
                <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-4">
                  <nuxt-link to="" class="shrink-0 md:order-1">
                    <img class="w-20 h-20 dark:hidden" :src="item.imgOne" />
                  </nuxt-link>
                  <div class="flex-1 w-full min-w-0 space-y-4 md:order-2">
                    <div class="flex">
                      <nuxt-link to="" class="text-base font-medium text-gray-900 hover:underline dark:text-white">{{
                        $i18n.locale === 'ar' ? item.titleAr : item.title }}</nuxt-link>
                      <div class="flex justify-center text-end md:order-4 md:w-44 space-s-2 ms-auto">
                        <p class="text-base font-bold text-gray-900 dark:text-white">{{ item.discountedPrice }} {{
                          $t('products.le') }}</p>
                        <p class="mt-0.5 text-sm text-gray-400 line-through dark:text-white" v-if="item.originalPrice">
                          {{ item.originalPrice }} {{ $t('products.le') }}</p>
                      </div>
                    </div>

                    <div class="flex space-s-2">
                      <p class="text-[13px] italic text-gray-600" v-if="item.categoryTitle">{{ item.categoryTitle }}</p>
                      <span class="text-[13px] italic text-gray-600" v-if="item.subCategoryTitle">/</span>
                      <p class="text-[13px] italic text-gray-600" v-if="item.subCategoryTitle">{{ item.subCategoryTitle
                      }}</p>
                    </div>
                    <div class="flex items-center gap-4">
                      <button type="button" @click="removeItem(item.productId)"
                        class="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                        <i class="fa-solid fa-spinner fa-spin-pulse text-red-50"
                          v-if="removingItem === item.productId"></i>
                        <i class="fa-solid fa-xmark me-0.5" v-else></i>
                        {{ $t('btn.remove') }}
                      </button>
                      <label for="counter-input" class="sr-only">Choose quantity:</label>
                      <div class="flex items-center justify-between md:order-3 md:justify-end ms-auto">
                        <div class="flex flex-col items-start md:order-3 md:justify-end">
                          <p class="text-lg font-normal ms-2">{{ $t('cart.quantity') }} <span
                              class="font-semibold text-blue-600">{{
                                item.quantity }}</span></p>
                          <div class="flex items-center mt-2 space-x-2">
                            <button type="button" @click="decrementQuantity(item)"
                              class="inline-flex items-center justify-center w-5 h-5 bg-gray-100 border border-gray-300 rounded-md shrink-0 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                              <i class="text-gray-900 fa-solid fa-minus dark:text-white" aria-hidden="true"></i>
                            </button>
                            <input type="number" v-model="quantity"
                              @change="updateQuantityInStore(item.id, item.quantity)"
                              class="text-sm font-medium text-center text-gray-900 bg-transparent border-0 w-14 shrink-0 focus:outline-none focus:ring-0 dark:text-white"
                              placeholder="1" />
                            <button type="button" @click="incrementQuantity(item)"
                              class="inline-flex items-center justify-center w-5 h-5 bg-gray-100 border border-gray-300 rounded-md shrink-0 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                              <i class="text-gray-900 fa-solid fa-plus dark:text-white" aria-hidden="true"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex-1 max-w-4xl mx-auto mt-6 space-y-6 lg:mt-0 lg:w-full">
            <div
              class="p-4 space-y-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <div class="text-center">
                <p class="text-xl font-semibold text-gray-900 dark:text-white">{{ $t('cart.subtotal') }}</p>
                <span class="text-xl font-semibold text-gray-900 dark:text-white">{{ totalAmount }} {{ $t('products.le')
                }}</span>
              </div>
              <nuxt-link to="/checkout" type="button" class="block w-full px-5 py-2 text-center btn-style">{{
                $t('btn.proceed_to_checkout') }}</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const cartStore = useCartStore();
const { t } = useI18n();
const removingItem = ref(null);

const removeItem = async (productId) => {
  if (!productId) {
    console.error("No productId provided for removal.");
    return;
  }
  try {
    removingItem.value = productId;
    await cartStore.removeFromCart(productId);
    setTimeout(() => {
      removingItem.value = null;
    }, 3000);
  } catch (error) {
    console.error("Error removing item:", error);
  }
};

onMounted(() => {
  cartStore.fetchCart();
});

const totalAmount = computed(() => {
  return cartStore.cart.reduce((total, item) => {
    return total + (parseFloat(item.discountedPrice) * item.quantity);
  }, 0).toFixed(2);
});

const quantity = ref(1);

const incrementQuantity = (item) => {
  item.quantity++;
  updateQuantityInStore(item.productId, item.quantity);
};

const decrementQuantity = (item) => {
  if (item.quantity > 1) {
    item.quantity--;
    updateQuantityInStore(item.productId, item.quantity);
  }
};

const updateQuantityInStore = (productId, newQuantity) => {
  if (productId) {
    cartStore.updateQuantityInCart(productId, newQuantity);
  }
};

useHead({
  titleTemplate: () => t('head.shopping_cart'),
});
</script>