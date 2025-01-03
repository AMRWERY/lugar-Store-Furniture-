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
              <p class="text-sm font-normal text-gray-600">Change order status</p>
              <div class="flex mt-4 space-s-4">
                <button type="button"
                  :disabled="order.status === 'Pending' || order.status === 'Delivered' || order.status === 'Confirmed'"
                  @click="updateOrderStatus(order.id, 'Pending')"
                  class="text-green-700 border border-green-700 hover:bg-green-700 hover:text-white focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:text-green-600 dark:border-green-600 dark:hover:bg-green-600 dark:hover:text-white dark:focus:ring-green-800 disabled:opacity-50 disabled:cursor-not-allowed">
                  <icon name="svg-spinners:90-ring" v-if="order.loading && order.targetStatus === 'Pending'" />
                  <span v-else>Pending</span>
                </button>
                <button type="button" :disabled="order.status === 'Confirmed' || order.status === 'Delivered'"
                  @click="updateOrderStatus(order.id, 'Confirmed')"
                  class="text-red-700 border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:text-red-600 dark:border-red-600 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 disabled:opacity-50 disabled:cursor-not-allowed">
                  <icon name="svg-spinners:90-ring" v-if="order.loading && order.targetStatus === 'Confirmed'" />
                  <span v-else>Confirmed</span>
                </button>
                <button type="button" :disabled="order.status === 'Delivered'"
                  @click="updateOrderStatus(order.id, 'Delivered')"
                  class="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:text-blue-600 dark:border-blue-600 dark:hover:bg-blue-600 dark:hover:text-white dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed">
                  <icon name="svg-spinners:90-ring" v-if="order.loading && order.targetStatus === 'Delivered'" />
                  <span v-else>Delivered</span>
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
const props = defineProps({
  order: Object
});

const emit = defineEmits(['close']);

const checkoutStore = useCheckoutStore();
const orders = computed(() => checkoutStore?.orders || []);

const closeDialog = () => {
  emit('close');
};

const showToast = ref(false);
const toastTitle = ref('');
const toastMessage = ref('');
const toastType = ref('');
const toastIcon = ref('')
const { t } = useI18n()

const updateOrderStatus = async (orderId, newStatus) => {
  const order = checkoutStore.paginatedOrders.find((o) => o.id === orderId);
  if (!order) return;
  order.loading = true;
  order.targetStatus = newStatus;
  try {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    await checkoutStore.updateOrderStatus(orderId, newStatus);
    await checkoutStore.fetchOrders();
    showToast.value = true;
    toastTitle.value = t('toast.great');
    toastMessage.value = t('tooltip.order_status_updated');
    toastType.value = 'success';
    toastIcon.value = 'mdi:check-circle';
  } catch (error) {
    console.error(error);
    showToast.value = true;
    toastTitle.value = t('toast.error');
    toastMessage.value = t('tooltip.failed_to_update_order');
    toastType.value = 'error';
    toastIcon.value = 'mdi:alert-circle';
  } finally {
    const order = checkoutStore.paginatedOrders.find((o) => o.id === orderId);
    if (order) {
      order.loading = false;
      order.targetStatus = null;
    }
  }
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