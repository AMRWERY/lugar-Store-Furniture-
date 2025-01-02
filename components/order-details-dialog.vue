<template>
  <div>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div class="flex flex-col w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg">
        <div v-if="orders?.length" class="flex-1">
          <div v-for="order in orders[0]?.cart || []" :key="order.productId"
            class="grid grid-cols-12 gap-6 pb-6 mb-6 border-b">
            <div class="col-span-2">
              <img :src="order.imgOne" class="w-full h-auto rounded-lg shadow-md" />
            </div>
            <div class="col-span-10">
              <p class="mb-2 text-lg font-semibold text-gray-900">
                {{ $i18n.locale === 'ar' ? order.titleAr : order.title }}
              </p>
              <p class="text-sm font-semibold text-gray-700">
                <span class="font-thin me-1">{{ $t('order_summary.category') }}</span>
                {{ order.categoryTitle }}
              </p>
              <p class="text-sm font-semibold text-gray-700">
                <span class="font-thin me-1">Customer Name:</span>
                {{ orders[0].name }}
              </p>
              <p class="text-sm font-semibold text-gray-700">
                <span class="font-thin me-1">Customer Email:</span>
                {{ orders[0].email }}
              </p>
              <p class="text-sm font-semibold text-gray-700">
                <span class="font-thin me-1">Customer Phone Number:</span>
                {{ orders[0].phoneNumber }}
              </p>
              <p class="text-sm font-semibold text-gray-700">
                <span class="font-thin me-1">Customer State:</span>
                {{ orders[0].state }}
              </p>
              <p class="text-sm font-semibold text-gray-700">
                <span class="font-thin me-1">Customer Address:</span>
                {{ orders[0].address }}
              </p>
            </div>
          </div>
        </div>

        <!-- Close Button -->
        <div class="flex justify-end">
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