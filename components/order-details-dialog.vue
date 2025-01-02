<template>
  <div>
    <!-- Dialog Overlay -->
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <!-- Dialog Content -->
      <div class="flex flex-col w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg">
        <!-- Check if orders exist -->
        <div v-if="orders?.length" class="flex-1">
          <div v-for="order in orders[0]?.cart || []" :key="order.productId"
            class="grid grid-cols-12 gap-6 pb-6 mb-6 border-b">
            <!-- Product Image -->
            <div class="col-span-2">
              <img :src="order.imgOne" alt="Product Image" class="w-full h-auto rounded-lg shadow-md" />
            </div>

            <!-- Product Details -->
            <div class="col-span-10">
              <p class="text-lg font-semibold text-gray-900">
                {{ $i18n.locale === 'ar' ? order.titleAr : order.title }}
              </p>
              <p class="text-sm font-semibold text-gray-700">
                <span class="me-1">{{ $t('order_summary.category') }}</span>
                {{ order.categoryTitle }}
              </p>
            </div>
          </div>
        </div>

        <!-- Close Button -->
        <div class="flex justify-end mt-4">
          <button class="px-6 py-2.5 btn-style" @click="closeDialog">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['checkoutStore']);
const emit = defineEmits(['close']);

const checkoutStore = useCheckoutStore();
const orders = computed(() => checkoutStore?.orders || []);

const closeDialog = () => {
  emit('close');
};
</script>