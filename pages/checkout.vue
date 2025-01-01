<template>
  <div>
    <breadcrumb />

    <section class="py-8 mx-auto bg-white dark:bg-gray-900 md:py-16 max-w-7xl">
      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 md:col-span-8">
          <ol
            class="flex items-center w-full max-w-2xl text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
            <li :class="step === 1 ? 'text-blue-600' : 'text-gray-400'"
              class="after:border-1 flex items-center after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
              <span
                class="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                <icon name="material-symbols:check-circle-outline-rounded" class="w-4 h-4 me-2 sm:h-5 sm:w-5"
                  aria-hidden="true" />
                {{ $t('checkout.checkout') }}
              </span>
            </li>
            <li class="flex items-center shrink-0 " :class="step === 2 ? 'text-blue-600' : 'text-gray-400'">
              <span
                class="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                <icon name="material-symbols:check-circle-outline-rounded" class="w-4 h-4 me-2 sm:h-5 sm:w-5"
                  aria-hidden="true" />
              </span>
              {{ $t('checkout.payment') }}
            </li>
          </ol>

          <!-- Stepper Content -->
          <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
            <div v-if="step === 1">
              <!-- Checkout Form -->
              <div class="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                <div class="flex-1 min-w-0 space-y-8">
                  <div class="space-y-4">
                    <h2 class="text-xl font-semibold text-gray-900 dark:text-white">{{ $t('checkout.delivery_details')
                      }}</h2>
                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <dynamic-inputs :label="t('form.name')" :placeholder="t('form.enter_your_name')" type="text"
                        :validation="('required|contains_alpha|length:3,10')" :required="true"
                        v-model="checkoutStore.deliveryDetails.name" />

                      <dynamic-inputs :label="t('form.email')" :placeholder="t('form.enter_your_email')" type="email"
                        :validation="('required|email|ends_with:cospora.com')" :required="true"
                        v-model="checkoutStore.deliveryDetails.email" />

                      <div>
                        <div class="flex items-center gap-2 mb-1">
                          <label for="country" class="block text-sm font-medium text-gray-900 dark:text-white">{{
                            $t('form.country') }}</label>
                        </div>
                        <select id="country" name="country" autocomplete="country-name" v-model="selectedCountry"
                          class="w-full py-2 text-gray-800 transition duration-100 border rounded outline-none ring-indigo-300 focus:ring bg-gray-50">
                          <option v-for=" country in countriesData" :key="country.country" :value="country.country">
                            {{ country.country }}</option>
                        </select>
                      </div>

                      <div>
                        <div class="flex items-center gap-2 mb-1">
                          <label for="province" class="block text-sm font-medium text-gray-900 dark:text-white">{{
                            $t('form.province') }}</label>
                        </div>
                        <select id="province" name="province" autocomplete="province-name"
                          v-model="checkoutStore.deliveryDetails.province"
                          class="w-full py-2 text-gray-800 transition duration-100 border rounded outline-none ring-indigo-300 focus:ring bg-gray-50">
                          <option v-for="city in getCitiesForSelectedCountry" :key="city" :value="city">
                            {{ city }}</option>
                        </select>
                      </div>

                      <div>
                        <label for="phone-input-3" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                          {{ $t('form.phone_number') }} <span class="text-red-500">*</span>
                        </label>
                        <div class="flex items-center">
                          <button id="dropdown-phone-button-3"
                            class="z-10 inline-flex shrink-0 items-center rounded-s-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                            type="button">
                            <img v-if="selectedCountryFlag" :src="selectedCountryFlag"
                              class="w-[19.5px] h-[14px] me-2" />
                            <span v-if="selectedCallingCode">+{{ selectedCallingCode }}</span>
                            <icon name="material-symbols:keyboard-arrow-down-rounded" class="-me-0.5 ms-2 h-5 w-5" />
                          </button>
                          <div class="relative w-full">
                            <input type="text" id="phone-input" v-model="checkoutStore.deliveryDetails.phoneNumber"
                              class="z-20 block w-full rounded-e-lg border border-s-0 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:border-s-gray-700 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500"
                              placeholder="123-456-7890" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label for="voucher" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{
                      $t('checkout.enter_a_gift_card_voucher_or_promotional_code') }} </label>
                    <div class="flex items-center max-w-md gap-4">
                      <input type="text" id="voucher"
                        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                        :placeholder="$t('checkout.enter_a_gift_card_voucher_or_promotional_code')" />
                      <button type="button"
                        class="flex items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{{
                          $t('btn.apply') }}</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex items-center justify-end mt-6 gap-x-6">
                <button type="button" @click="goToPaymentForm"
                  class="items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{{
                    $t('btn.next') }}</button>
              </div>
            </div>
          </transition>

          <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
            <div v-if="step === 2">
              <!-- Payment Form -->
              <div class="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                <div class="flex-1 min-w-0 space-y-8">
                  <div class="space-y-4">
                    <h2 class="text-xl font-semibold text-gray-900 dark:text-white">{{ $t('checkout.payment_details') }}
                    </h2>
                    <div class="grid grid-cols-2 gap-4 mb-6">
                      <dynamic-inputs :label="t('form.full_name_as_displayed_on_card')"
                        :placeholder="t('form.enter_full_name_as_displayed_on_card')" type="text"
                        :validation="('required|alpha')" :required="true"
                        v-model="checkoutStore.paymentDetails.fullNameOnCard" />

                      <dynamic-inputs :label="t('form.card_number')" placeholder="xxxx-xxxx-xxxx-xxxx" type="text"
                        :validation="[['required'], ['matches', /^\d{4}-\d{4}-\d{4}-\d{4}$/]]" :required="true"
                        v-model="checkoutStore.paymentDetails.cardNumber" />

                      <dynamic-inputs :label="t('form.card_expiration')" :placeholder="t('form.choose_card_expiration')"
                        type="date" :validation="('required')" :required="true"
                        v-model="checkoutStore.paymentDetails.cardExpiration" />

                      <dynamic-inputs :label="t('form.cvv')" :placeholder="t('form.enter_cvv')" type="text"
                        :validation="('required|length:3,3')" :required="true"
                        v-model="checkoutStore.paymentDetails.cvv" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex justify-end mt-6 space-s-3">
                <button @click="goBackToCheckout" type="button" class="px-4 py-2 text-white bg-gray-500 rounded-md">{{
                  $t('btn.back') }}</button>
                <button type="submit" :disabled="loading" @click="submitCheckoutForm"
                  class="items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  <div class="flex items-center justify-center" v-if="loading">
                    <span class="text-center me-2">{{ $t('loading_btn.please_wait') }}...</span>
                    <icon name="svg-spinners:270-ring-with-bg" />
                  </div>
                  <span v-else>{{ $t('btn.pay_now') }}</span>
                </button>
              </div>
            </div>
          </transition>
        </div>

        <div class="col-span-12 md:col-span-4">
          <div class="w-full mt-6 space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
            <div class="flow-root">
              <div class="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                <dl class="flex items-center justify-between gap-4 py-3">
                  <dt class="text-base font-normal text-gray-500 dark:text-gray-400">{{ $t('checkout.subtotal') }}</dt>
                  <dd class="text-base font-medium text-gray-900 dark:text-white">${{ subTotalAmount }}</dd>
                </dl>
                <dl class="flex items-center justify-between gap-4 py-3">
                  <dt class="text-base font-normal text-gray-500 dark:text-gray-400">{{ $t('checkout.savings') }}</dt>
                  <dd class="text-base font-medium text-green-500">%{{ averageDiscount }}</dd>
                </dl>
                <dl class="flex items-center justify-between gap-4 py-3">
                  <dt class="text-base font-normal text-gray-500 dark:text-gray-400">{{ $t('checkout.store_pickup') }}
                  </dt>
                  <dd class="text-base font-medium text-gray-900 dark:text-white">$25.00</dd>
                </dl>
                <dl class="flex items-center justify-between gap-4 py-3">
                  <dt class="text-base font-normal text-gray-500 dark:text-gray-400">{{ $t('checkout.tax') }}</dt>
                  <dd class="text-base font-medium text-gray-900 dark:text-white">$18.00</dd>
                </dl>
                <dl class="flex items-center justify-between gap-4 py-3">
                  <dt class="text-base font-bold text-gray-900 dark:text-white">{{ $t('checkout.total') }}</dt>
                  <dd class="text-base font-bold text-gray-900 dark:text-white">${{ totalAmount }}</dd>
                </dl>
              </div>
            </div>

            <div class="space-y-3">
              <nuxt-link to="/order-summary"
                class="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{{
                  $t('btn.order_summary') }}</nuxt-link>
            </div>
          </div>
          <div class="flex items-center justify-center gap-8 mt-6">
            <img class="w-auto h-8 dark:hidden"
              src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg" />
            <img class="hidden w-auto h-8 dark:flex"
              src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal-dark.svg" />
            <img class="w-auto h-8 dark:hidden"
              src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg" />
            <img class="hidden w-auto h-8 dark:flex"
              src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg" />
            <img class="w-auto h-8 dark:hidden"
              src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg" />
            <img class="hidden w-auto h-8 dark:flex"
              src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg" />
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

const cartStore = useCartStore();

const subTotalAmount = computed(() => {
  return cartStore.cart.reduce((total, item) => {
    return total + (parseFloat(item.price) * item.quantity);
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
  const storePickup = 25;
  const tax = 18;
  const total = subtotal - savingsAmount + storePickup + tax;
  return total.toFixed(2);
});

onMounted(async () => {
  await cartStore.fetchCart();
});

const { t } = useI18n()

const step = ref(1);
const loading = ref(false);

const checkoutStore = useCheckoutStore();

const goToPaymentForm = () => {
  step.value = 2;
};

const goBackToCheckout = () => {
  step.value = 1;
};

const submitCheckoutForm = async () => {
  loading.value = true;
  try {
    await new Promise(resolve => setTimeout(resolve, 3000));
    await checkoutStore.saveCheckoutData();
    showToast.value = true;
    toastTitle.value = t('toast.payment_successful');
    toastMessage.value = t('toast.your_payment_was_processed_successfully_thank_you_for_your_purchase');
    toastType.value = 'success';
    toastIcon.value = 'mdi:check-circle'
  } catch (error) {
    console.error("Error during checkout:", error);
  } finally {
    loading.value = false;
  }
};

const showToast = ref(false);
const toastTitle = ref('');
const toastMessage = ref('');
const toastType = ref('');
const toastIcon = ref('')

function beforeEnter(el) {
  el.style.opacity = 0;
}

function enter(el, done) {
  el.offsetHeight;
  el.style.transition = 'opacity 0.5s ease';
  el.style.opacity = 1;
  done();
}

function leave(el, done) {
  el.style.transition = 'opacity 0.5s ease';
  el.style.opacity = 0;
  done();
}

useHead({
  titleTemplate: () => t("head.checkout"),
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>