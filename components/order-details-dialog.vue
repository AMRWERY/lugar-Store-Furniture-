<template>
  <div>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div class="flex flex-col w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
        <div v-if="orders?.length" class="flex space-x-6">
          <!-- Customer Info Section -->
          <div class="flex-1 p-6 rounded-lg shadow-md bg-gray-50">
            <h3 class="mb-4 text-xl font-semibold text-gray-900">
              {{ order.name }}'s Information
            </h3>
            <div class="space-y-3">
              <p class="text-sm text-gray-700">
                <span class="font-semibold">{{ $t('order_summary.email') }}:</span>
                {{ order.email }}
              </p>
              <p class="text-sm text-gray-700">
                <span class="font-semibold">{{ $t('order_summary.phone_number') }}:</span>
                {{ order.phoneNumber }}
              </p>
              <p class="text-sm text-gray-700">
                <span class="font-semibold">{{ $t('order_summary.state') }}:</span>
                {{ order.state }}
              </p>
              <p class="text-sm text-gray-700">
                <span class="font-semibold">{{ $t('order_summary.address') }}:</span>
                {{ order.address }}
              </p>
            </div>

            <!-- Status Buttons -->
            <div class="mt-12">
              <p>Change order status</p>
              <div class="flex mt-4 space-x-4">
                <button type="button"
                  class="focus:outline-none text-green-700 border border-green-700 hover:bg-green-700 hover:text-white focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:text-green-600 dark:border-green-600 dark:hover:bg-green-600 dark:hover:text-white dark:focus:ring-green-800">
                  Pending
                </button>
                <button type="button"
                  class="focus:outline-none text-red-700 border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:text-red-600 dark:border-red-600 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900">
                  Confirmed
                </button>
                <button type="button"
                  class="focus:outline-none text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:text-blue-600 dark:border-blue-600 dark:hover:bg-blue-600 dark:hover:text-white dark:focus:ring-blue-800">
                  Delivered
                </button>
              </div>
            </div>
          </div>

          <!-- Order Details Section with Hidden Scroll -->
          <div class="flex-1 p-6 bg-white rounded-lg shadow-md">
            <h3 class="mb-4 text-xl font-semibold text-gray-900">
              {{ $t('order_summary.order_details') }}
            </h3>
            <div class="space-y-4 overflow-y-auto max-h-96 custom-scroll">
              <div v-for="(item, index) in order.cart || []" :key="item.productId"
                class="flex items-center pb-4 space-x-4 border-b">
                <span class="text-xl font-semibold text-gray-700">{{ index + 1 }}.</span>
                <img :src="item.imgOne" class="w-16 h-16 rounded-md shadow-sm" />
                <div class="flex-1">
                  <p class="text-lg font-semibold text-gray-900">
                    {{ $i18n.locale === 'ar' ? item.titleAr : item.title }}
                  </p>
                  <p class="text-sm text-gray-700">
                    <span class="font-semibold">{{ $t('order_summary.category') }}:</span>
                    {{ item.categoryTitle }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Close Button -->
        <div class="flex justify-end mt-6">
          <button class="px-6 py-2.5 btn-style" @click="closeDialog">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  order: Object
});

const emit = defineEmits(['close']);

const checkoutStore = useCheckoutStore();
const orders = computed(() => checkoutStore?.orders || []);

const closeDialog = () => {
  emit('close');
};
</script>

<style scoped>
.custom-scroll::-webkit-scrollbar {
  display: none;
}

.custom-scroll {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>