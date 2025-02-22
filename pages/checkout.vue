<template>
  <div>
    <!--breadcrumb component -->
    <breadcrumb />
    
    <section class="mx-auto bg-white dark:bg-gray-900 md:py-16 max-w-7xl">
      <form @submit.prevent="submitCheckoutForm">
        <div class="grid grid-cols-12 gap-6">
          <div class="col-span-12 md:col-span-8">
            <div class="lg:flex lg:items-start lg:gap-12 xl:gap-16">
              <div class="flex-1 min-w-0">
                <h2 class="mb-6 text-xl font-semibold text-gray-900 dark:text-white">{{ $t('checkout.delivery_details')
                }}</h2>
                <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div class="sm:col-span-3">
                    <label for="your-name" class="block font-medium text-gray-900 text-sm/6">{{ $t('form.name')
                    }}</label>
                    <div class="mt-1">
                      <input type="text" name="your-name" id="your-name" :placeholder="t('form.enter_your_name')"
                        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        v-model="checkoutStore.name" />
                    </div>
                    <p v-if="nameError" class="mt-1 text-sm font-semibold text-red-500">{{ nameError }}</p>
                  </div>

                  <div class="sm:col-span-3">
                    <label for="your-email" class="block font-medium text-gray-900 text-sm/6">{{ $t('form.email')
                    }}</label>
                    <div class="mt-1">
                      <input type="email" name="your-email" id="your-email" :placeholder="t('form.enter_your_email')"
                        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        v-model="checkoutStore.email" />
                    </div>
                    <p v-if="emailError" class="mt-1 text-sm font-semibold text-red-500">{{ emailError }}</p>
                  </div>

                  <div class="sm:col-span-3">
                    <label for="your-phone" class="block font-medium text-gray-900 text-sm/6">{{ $t('form.phone_number')
                    }}</label>
                    <div class="mt-1">
                      <input type="tel" name="your-phone" id="your-phone" :placeholder="t('form.enter_your_phone')"
                        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        v-model="checkoutStore.phoneNumber" />
                    </div>
                    <p v-if="phoneError" class="mt-1 text-sm font-semibold text-red-500">{{ phoneError }}</p>
                  </div>

                  <div class="sm:col-span-3">
                    <label for="governorate" class="block font-medium text-gray-900 text-sm/6">{{
                      $t('form.the_governorate') }}</label>
                    <div class="grid grid-cols-1 mt-1">
                      <select id="governorate" name="governorate" autocomplete="governorate-name"
                        class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        v-model="checkoutStore.state">
                        <option disabled>{{ $t('form.select_the_governorate') }}</option>
                        <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
                      </select>
                    </div>
                    <p v-if="governorateError" class="mt-1 text-sm font-semibold text-red-500">{{ governorateError }}
                    </p>
                  </div>

                  <div class="col-span-full">
                    <label for="about" class="block font-medium text-gray-900 text-sm/6">{{ $t('form.address')
                    }}</label>
                    <div class="mt-1">
                      <textarea name="about" id="about" rows="3" :placeholder="t('form.enter_your_address')"
                        type="textarea"
                        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        v-model="checkoutStore.address" />
                    </div>
                    <p v-if="addressError" class="mt-1 text-sm font-semibold text-red-500">{{ addressError }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-span-12 mt-0 md:col-span-4 lg:mt-12">
            <div class="w-full mt-6 space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
              <div class="flow-root">
                <div class="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                  <dl class="flex items-center justify-between gap-4 py-3">
                    <dt class="text-base font-normal text-gray-500 dark:text-gray-400">{{ $t('checkout.subtotal') }}
                    </dt>
                    <dd class="text-base font-medium text-gray-900 dark:text-white">{{ subTotalAmount }} {{
                      $t('products.le') }}</dd>
                  </dl>
                  <dl class="flex items-center justify-between gap-4 py-3">
                    <dt class="text-base font-normal text-gray-500 dark:text-gray-400">{{ $t('checkout.savings') }}</dt>
                    <dd class="text-base font-medium text-green-500">%{{ averageDiscount }}</dd>
                  </dl>
                  <dl class="flex items-center justify-between gap-4 py-3">
                    <dt class="text-base font-bold text-gray-900 dark:text-white">{{ $t('checkout.total') }}</dt>
                    <dd class="text-base font-bold text-gray-900 dark:text-white">{{ totalAmount }} {{ $t('products.le')
                    }}</dd>
                  </dl>
                </div>
              </div>

              <div class="space-y-3">
                <button role="button" type="submit"
                  class="flex items-center justify-center w-full btn-style px-5 py-2.5">
                  <div class="flex items-center justify-center" v-if="loading">
                    <span class="text-center me-2">{{ $t('loading_btn.please_wait') }}...</span>
                    <i class="fa-solid fa-spinner fa-spin-pulse"></i>
                  </div>
                  <span v-else>{{
                    $t('btn.place_order') }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>

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
import citiesData from "@/assets/country.json";

const cities = computed(() => {
  const egypt = citiesData.find(country => country.country === "Egypt");
  return locale.value === 'ar' ? egypt.citiesAr : egypt.cities;
});

const cartStore = useCartStore();
const checkoutStore = useCheckoutStore();
const { t, locale } = useI18n()
const loading = ref(false);

const subTotalAmount = computed(() => {
  return cartStore.cart.reduce((total, item) => {
    return total + (parseFloat(item.discountedPrice) * item.quantity);
  }, 0).toFixed(2);
});

const totalDiscount = computed(() => {
  return cartStore.cart.reduce((total, item) => {
    return total + (parseFloat(item.discount) * item.quantity);
  }, 0);
});

const averageDiscount = computed(() => {
  const totalItems = cartStore.cart.reduce((total, item) => total + item.quantity, 0);
  return totalItems > 0 ? (totalDiscount.value / totalItems).toFixed(2) : 0;
});

const totalAmount = computed(() => {
  const subtotal = parseFloat(subTotalAmount.value);
  const savingsAmount = (subtotal * (parseFloat(averageDiscount.value) / 100));
  const total = subtotal - savingsAmount;
  return total.toFixed(2);
});

onMounted(() => {
  cartStore.fetchCart();
});

const { showToast, toastTitle, toastMessage, toastType, toastIcon, triggerToast } = useToast();

const nameError = ref('');
const emailError = ref('');
const phoneError = ref('');
const governorateError = ref('');
const addressError = ref('');

const validateForm = () => {
  nameError.value = '';
  emailError.value = '';
  phoneError.value = '';
  governorateError.value = '';
  addressError.value = '';
  if (!checkoutStore.name) {
    nameError.value = t('form.your_name_is_required');
  }
  if (!checkoutStore.email) {
    emailError.value = t('form.email_is_required');
  }
  if (!checkoutStore.phoneNumber) {
    phoneError.value = t('form.your_phone_number_is_required');
  }
  if (!checkoutStore.state) {
    governorateError.value = t('form.your_governorate_is_required');
  }
  if (!checkoutStore.address) {
    addressError.value = t('form.your_address_is_required');
  }
  return !nameError.value && !emailError.value && !phoneError.value && !governorateError.value && !addressError.value;
};

const submitCheckoutForm = () => {
  if (!validateForm()) {
    return;
  }
  loading.value = true;
  const cartData = [...cartStore.cart];
  if (!cartData || cartData.length === 0) {
    loading.value = false;
    return;
  }
  new Promise((resolve) => setTimeout(resolve, 3000))
    .then(() => {
      return checkoutStore.saveCheckoutData(cartData);
    })
    .then((orderResponse) => {
      localStorage.setItem("order-summary", JSON.stringify({
        orderId: orderResponse.orderId,
        products: cartData
      }))
      // console.log(orderResponse)
      return cartStore.clearCart();
    })
    .then(() => {
      triggerToast({
        title: t('toast.order_successful'),
        message: t('toast.your_order_was_processed_successfully_thank_you'),
        type: 'success',
        icon: 'fa-solid fa-circle-check',
      });
    })
    .catch((error) => {
      console.error("Error during checkout:", error);
      triggerToast({
        title: t('toast.error'),
        message: t('toast.order_submission_failed'),
        type: 'error',
        icon: 'fa-solid fa-triangle-exclamation',
      });
    })
    .finally(() => {
      loading.value = false;
      navigateTo('/order-summary');
    });
};

useHead({
  titleTemplate: () => t("head.checkout"),
});
</script>