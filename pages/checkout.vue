<template>
  <div>
    <section class="mx-auto bg-white dark:bg-gray-900 md:py-16 max-w-7xl">
      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 md:col-span-8">
          <div class="lg:flex lg:items-start lg:gap-12 xl:gap-16">
            <div class="flex-1 min-w-0">
              <h2 class="mb-6 text-xl font-semibold text-gray-900 dark:text-white">{{ $t('checkout.delivery_details')
                }}</h2>
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <ClientOnly>
                  <dynamic-inputs :label="t('form.name')" :placeholder="t('form.enter_your_name')" type="text"
                    :validation="('required|contains_alpha')" :required="true" v-model="checkoutStore.name" />

                  <dynamic-inputs :label="t('form.email')" :placeholder="t('form.enter_your_email')" type="email"
                    :validation="('required|email')" :required="true" v-model="checkoutStore.email" />

                  <dynamic-inputs :label="t('form.phone_number')" :placeholder="t('form.enter_your_phone')" type="tel"
                    :validation="('required')" :required="true" v-model="checkoutStore.phoneNumber" />

                  <dynamic-inputs :label="t('form.the_governorate')" :placeholder="t('form.select_the_governorate')"
                    type="select" :validation="'required'" :required="true" v-model="checkoutStore.state"
                    :options="cities" />

                  <dynamic-inputs :label="t('form.address')" :placeholder="t('form.enter_your_address')" type="textarea"
                    :validation="'required|length:10,500'" :required="true" v-model="checkoutStore.address" />
                </ClientOnly>
              </div>
            </div>
          </div>
        </div>

        <div class="col-span-12 mt-0 md:col-span-4 lg:mt-12">
          <div class="w-full mt-6 space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
            <div class="flow-root">
              <div class="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                <dl class="flex items-center justify-between gap-4 py-3">
                  <dt class="text-base font-normal text-gray-500 dark:text-gray-400">{{ $t('checkout.subtotal') }}</dt>
                  <dd class="text-base font-medium text-gray-900 dark:text-white">{{ subTotalAmount }} LE</dd>
                </dl>
                <dl class="flex items-center justify-between gap-4 py-3">
                  <dt class="text-base font-normal text-gray-500 dark:text-gray-400">{{ $t('checkout.savings') }}</dt>
                  <dd class="text-base font-medium text-green-500">%{{ averageDiscount }}</dd>
                </dl>
                <dl class="flex items-center justify-between gap-4 py-3">
                  <dt class="text-base font-bold text-gray-900 dark:text-white">{{ $t('checkout.total') }}</dt>
                  <dd class="text-base font-bold text-gray-900 dark:text-white">{{ totalAmount }} LE</dd>
                </dl>
              </div>
            </div>

            <div class="space-y-3">
              <nuxt-link to="" role="button" @click="submitCheckoutForm"
                class="flex items-center justify-center w-full btn-style px-5 py-2.5">
                <div class="flex items-center justify-center" v-if="loading">
                  <span class="text-center me-2">{{ $t('loading_btn.please_wait') }}...</span>
                  <icon name="svg-spinners:270-ring-with-bg" />
                </div>
                <span v-else>{{
                  $t('btn.place_order') }}</span>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
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
import { useCartStore } from '@/stores/cartStore';
import { useCheckoutStore } from '@/stores/checkoutStore';
import citiesData from "@/assets/country.json";

const cities = citiesData.find((country) => country.country === "Egypt")?.cities || [];

const cartStore = useCartStore();

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

onMounted(async () => {
  await cartStore.fetchCart();
});

const { t } = useI18n()

const loading = ref(false);

const checkoutStore = useCheckoutStore();
const showToast = ref(false);
const toastTitle = ref('');
const toastMessage = ref('');
const toastType = ref('');
const toastIcon = ref('')

const submitCheckoutForm = async () => {
  loading.value = true;
  try {
    await new Promise(resolve => setTimeout(resolve, 3000));
    await checkoutStore.saveCheckoutData();
    await cartStore.clearCart();
    showToast.value = true;
    toastTitle.value = t('toast.order_successful');
    toastMessage.value = t('toast.your_order_was_processed_successfully_thank_you');
    toastType.value = 'success';
    toastIcon.value = 'mdi:check-circle'
  } catch (error) {
    console.error("Error during checkout:", error);
  } finally {
    loading.value = false;
    navigateTo('/order-summary');
  }
};

useHead({
  titleTemplate: () => t("head.checkout"),
});
</script>