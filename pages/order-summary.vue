<template>
  <div>
    <div class="max-w-4xl p-6 mx-auto my-10 bg-white rounded-lg shadow-lg">
      <!-- Order Number -->
      <div class="flex items-center justify-between mb-12">
        <div>
          <h2 class="text-2xl font-semibold text-gray-900">{{ $t('order_summary.order_summary') }}</h2>
          <ClientOnly>
            <p class="mt-1 text-sm text-gray-500">
              {{ $t('order_summary.order_number') }} <span class="font-semibold text-gray-900">{{ orderId }}</span>
            </p>
          </ClientOnly>
        </div>
      </div>

      <!-- Product Details -->
      <div class="grid grid-cols-12 gap-6 pb-6 mb-6 border-b" v-for="item in checkoutStore.orders[0]?.cart || []"
        :key="item.productId">
        <div class="col-span-2">
          <img :src="item.imgOne" class="w-full h-auto rounded-lg shadow-md" />
        </div>
        <div class="col-span-10">
          <p class="text-lg font-semibold text-gray-900">{{ $i18n.locale === 'ar' ? item.titleAr : item.title }}</p>
          <p class="text-sm font-semibold text-gray-700"><span class="me-1">{{ $t('order_summary.category') }} </span>{{
           $i18n.locale === 'ar' ? item.categoryTitleAr : item.categoryTitle}}</p>
        </div>
      </div>

      <!-- Subtotal Section -->
      <div class="grid grid-cols-12 gap-6 pb-6 mb-6 border-b">
        <div class="col-span-8">
          <dt class="text-sm font-medium text-gray-500">{{ $t('order_summary.subtotal') }}</dt>
        </div>
        <div class="col-span-4 text-end">
          <dd class="text-sm font-medium text-gray-900">{{ subTotalAmount }}  {{ $t('products.le') }}</dd>
        </div>
      </div>

      <!-- Savings Section -->
      <div class="grid grid-cols-12 gap-6 pb-6 mb-6 border-b">
        <div class="col-span-8">
          <dt class="text-sm font-medium text-gray-500">{{ $t('order_summary.savings') }}</dt>
        </div>
        <div class="col-span-4 text-end">
          <dd class="text-sm font-medium text-green-500">%{{ averageDiscount }}</dd>
        </div>
      </div>

      <!-- Total Section -->
      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-8 font-semibold text-gray-900">
          <dt class="text-xl">{{ $t('order_summary.total') }}</dt>
        </div>
        <div class="col-span-4 text-end">
          <dd class="text-xl font-semibold text-gray-900">{{ totalAmount }}  {{ $t('products.le') }}</dd>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCheckoutStore } from '@/stores/checkoutStore';

const checkoutStore = useCheckoutStore();

const orderId = checkoutStore.generateOrderId();

const subTotalAmount = computed(() => {
  return checkoutStore.orders[0]?.cart.reduce((total, item) => {
    return total + (parseFloat(item.discountedPrice) * item.quantity);
  }, 0).toFixed(2) || 0;
});

const totalDiscount = computed(() => {
  return checkoutStore.orders[0]?.cart.reduce((total, item) => {
    const discount = parseFloat(item.discount);
    const quantity = item.quantity;
    if (isNaN(discount) || isNaN(quantity)) {
      return total;
    }
    return total + (discount * quantity);
  }, 0) || 0;
});

const averageDiscount = computed(() => {
  const totalItems = checkoutStore.orders[0]?.cart.reduce((total, item) => total + item.quantity, 0) || 0;
  if (totalItems > 0) {
    return (totalDiscount.value / totalItems).toFixed(2);
  } else {
    return 0;
  }
});

const totalAmount = computed(() => {
  const subtotal = parseFloat(subTotalAmount.value);
  const discount = parseFloat(averageDiscount.value) || 0;
  const savingsAmount = (subtotal * (discount / 100));
  const total = subtotal - savingsAmount;
  return total.toFixed(2);
});

onMounted(async () => {
  await checkoutStore.fetchOrders();
});

const { t } = useI18n()

useHead({
  titleTemplate: () => t("head.order_summary"),
});
</script>