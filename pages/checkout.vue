<template>
  <div>
    <section class="py-8 mx-auto bg-white dark:bg-gray-900 md:py-16 max-w-7xl">
      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 md:col-span-8">
          <div class="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
            <div class="flex-1 min-w-0 space-y-8">
              <div class="space-y-4">
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white">{{ $t('checkout.delivery_details')
                  }}</h2>
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <ClientOnly>
                    <dynamic-inputs :label="t('form.name')" :placeholder="t('form.enter_your_name')" type="text"
                    :validation="('required|contains_alpha|length:3,10')" :required="true"
                    v-model="checkoutStore.name" />

                  <dynamic-inputs :label="t('form.email')" :placeholder="t('form.enter_your_email')" type="email"
                    :validation="('required|email')" :required="true" v-model="checkoutStore.email" />
                  </ClientOnly>

                  <div>
                    <label for="phone-input-3" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                      {{ $t('form.phone_number') }} <span class="text-red-500">*</span>
                    </label>
                    <div class="flex items-center">
                      <div class="relative w-full">
                        <input type="text" id="phone-input" v-model="checkoutStore.phoneNumber"
                          class="z-20 block w-full rounded-e-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:border-s-gray-700 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500"
                          placeholder="123-456-7890" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div class="flex items-center gap-2 mb-1">
                      <label for="province" class="block text-sm font-medium text-gray-900 dark:text-white">{{
                        $t('form.province') }}</label>
                    </div>
                    <select id="province" name="province" autocomplete="province-name"
                      v-model="checkoutStore.province"
                      class="w-full py-2 text-gray-800 transition duration-100 border rounded outline-none ring-indigo-300 focus:ring bg-gray-50">
                      <option v-for="city in cities" :key="city" :value="city">
                        {{ city }}</option>
                    </select>
                  </div>

                  <div class="col-span-full">
                    <label for="about" class="block font-medium text-gray-900 text-sm/6">Address</label>
                    <div class="mt-2">
                      <textarea name="about" id="about" rows="3" v-model="checkoutStore.address"
                        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                  </div>
                </div>

                <div class="flex justify-end mt-6 space-s-3">
                  <button type="submit" :disabled="loading" @click="submitCheckoutForm"
                    class="items-center justify-center btn-style px-5 py-2.5">
                    <div class="flex items-center justify-center" v-if="loading">
                      <span class="text-center me-2">{{ $t('loading_btn.please_wait') }}...</span>
                      <icon name="svg-spinners:270-ring-with-bg" />
                    </div>
                    <span v-else>Submit</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
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
                  <dt class="text-base font-bold text-gray-900 dark:text-white">{{ $t('checkout.total') }}</dt>
                  <dd class="text-base font-bold text-gray-900 dark:text-white">${{ totalAmount }}</dd>
                </dl>
              </div>
            </div>

            <div class="space-y-3">
              <nuxt-link to="/order-summary" class="flex items-center justify-center w-full btn-style px-5 py-2.5">{{
                $t('btn.order_summary') }}</nuxt-link>
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

useHead({
  titleTemplate: () => t("head.checkout"),
});
</script>